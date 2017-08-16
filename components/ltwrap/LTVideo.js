import React from 'react';
import {
  asset,
  View,
  Video,
  VideoControl,
  MediaPlayerState,
} from 'react-vr';

/* Video to Blend with Pano background */


export default class LTVideo extends React.Component {
  static defaultProps = {
    src: null, // Video source
    rotateY: 0, // Position of icon [degrees around Y axis]

    cmWidth: 1, // Sets the actual size, in cubemap widths. Hence 1 is 1 cubemap width. 0.5 is half a cubemap width.
    imgWidth: 1, // Set to the image size in pixels, only used for width/height ratio calculation
    imgHeight: 1, // Set to the image size in pixels, only used for width/height ratio calculation

    pretransform: [], // Advanced positioning

    withsound: false, // Play with sound. Won't work on mobile if setting to true. Todo: Integrate behavior from LTVideoAuto and from VideoControl to start videos on gaze and touch, if user sent in withsound and views on mobile
  };

  constructor(props) {
    super(props);

    let muted = !this.props.withsound; // If explicit play with sound, muted should be false. Otherwise default is muted.

    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: muted}),
    };
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
        />
      </View>
    );
  }
}

