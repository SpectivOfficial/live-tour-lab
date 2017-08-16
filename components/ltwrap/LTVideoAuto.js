import React from 'react';
import {
  asset,
  View,
  Video,
  VideoControl,
  MediaPlayerState,
  NativeModules,
} from 'react-vr';

//import ReactNative from 'ReactNative';
import { findNodeHandle } from 'react-native';

/* Experimental component, like LTVideo plus some auto logic to handle gestures and non-mute videos on mobile while still auto-playing with sound on computer */

const COMMAND_SEEK_TO = 1;
const COMMAND_PLAY = 2;
const COMMAND_PAUSE = 3;

export default class LTVideoAuto extends React.Component {
  static defaultProps = {
    src: null, // Video source
    rotateY: 0, // Position of icon [degrees around Y axis]

    cmWidth: 1, // Sets the actual size, in cubemap widths. Hence 1 is 1 cubemap width. 0.5 is half a cubemap width.
    imgWidth: 1, // Set to the image size in pixels, only used for width/height ratio calculation
    imgHeight: 1, // Set to the image size in pixels, only used for width/height ratio calculation

    pretransform: [], // Advanced positioning
  };

  constructor(props) {
    super(props);

    let muted = !this.props.canAutoplaySound; // If can play sound, muted should be false. If cannot play with sound, go muted. If undefined, go muted.

    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: muted}), // init with muted, autoPlay
      registeredUserGesture: false,
    };
  }

  playVideoEvent(event){
    if(event && (event.nativeEvent.inputEvent.eventType === 'touchstart' || event.nativeEvent.inputEvent.eventType === 'touchend' || event.nativeEvent.inputEvent.eventType === 'click' ) ) { 
      console.log('event type is', event.nativeEvent.inputEvent.eventType);
      this.state.playerState.setMuted(false);
      this.state.playerState.play();
      /*
      if( this.state.toggle ) {
        this.state.playerState.pause();
      } else {
        this.state.playerState.play();
      }
      this.setState({toggle: !this.state.toggle});
      */
    }

    if(!this.state.registeredUserGesture) {
      this.state.playerState.registerUserGesture(
        COMMAND_PLAY,
        [],
        //ReactNative.findNodeHandle(this)
        findNodeHandle(this)
      );
      this.setState({registeredUserGesture: true});
    }
  }


  render() {
    // imgWidth = 2048
    // imgHeight = 1152
    // cmWidth = 1
    // roty = 90
    // src = 'hm2h264-blend-2048x1152-ff1.mp4'

    const base = 600;
    const cmWidth = this.props.cmWidth;
    const width = base * cmWidth;
    const height = this.props.imgHeight / this.props.imgWidth * width;
    const tray = height / 2;
    const traz = -base / 2;

    return (
      <View
        style={{
          alignItems: 'center',
          layoutOrigin: [0, 0, 0],
          opacity: 1,
          transform: [
            {rotateY: this.props.rotateY},
            {translate: [0, tray, traz]},
            ...this.props.pretransform
          ],
          position:'absolute',
        }}>
        <Video
          style={{
            layoutOrigin: [0, 0, 0],
            width: width,
            height: height,
            position:'absolute',
          }}
          loop={true}
          source={ asset(this.props.src) }
          playerState={this.state.playerState}
          onInput={ (e) => this.playVideoEvent(e) }
        />
      </View>
    );
  }
}

