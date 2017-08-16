import React from 'react';
import {
  asset,
  View,
  VideoPano,
  VideoControl,
  MediaPlayerState,
} from 'react-vr';


export default class LTVideoPano extends React.Component {
  static defaultProps = {
    src: null, // Source file
    onLoadEnd: null, // Function to call upon pano file finished loading
    ctrl: false, // Display default player control (useful for testing, needs something prettier for production)
  };

  constructor(props) {
    super(props);
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: true}), // init with muted, autoPlay
    };
  }

  render() {
    let panosrc = null;
    const layout = {layout: (this.props.layout) || null};

    if (Object.prototype.toString.call(this.props.src) === '[object String]') {
      panosrc = asset(this.props.src, {...layout});
    } else if (Object.prototype.toString.call(this.props.src) === '[object Array]') {
      panosrc = [
        asset(this.props.src[0]),
        asset(this.props.src[1]),
        asset(this.props.src[2]),
        asset(this.props.src[3]),
        asset(this.props.src[4]),
        asset(this.props.src[5]),
      ];
    } 

    return (
      <View 
        style={{
          position:'absolute',
        }}>
        <VideoPano
          source = {panosrc}
          onLoadEnd={this.props.onLoadEnd}
          playerState={this.state.playerState}
          loop={true}
        />
        {this.props.ctrl && 
          <VideoControl
            style={{
              height: 0.2,
              width: 4,
              layoutOrigin: [0.5, 0.5, 0],
              transform: [{translate: [0, 0, -10]}],
            }}
            playerState={this.state.playerState}
          />}
      </View>
    );
  }
}

