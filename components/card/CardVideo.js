import React from 'react';
import {
  VideoControl,
  MediaPlayerState,
  View,
  Video,
} from 'react-vr';

export default class CardVideo extends React.Component {
  static defaultProps = {
    ctrl: false,
    width: 3.0,
    ratio: 1.778,
    borderWidth: 0,
  };

  constructor(props) {
    super();
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: true}), // init with muted, autoPlay
    };
  }

  componentDidMount() {
  }

  render() {
    const height = this.props.width / this.props.ratio;
    const borderRadius = this.props.borderWidth * 2;
    let br = {};
    if( borderRadius>0 ) {
      br = { 
        borderRadius: borderRadius,
        borderColor: '#d6d7da88',
      };
    }
    return (
      <View
        style={{
          marginTop: 0, 
          marginLeft: 0, 
          marginRight: 0,
        }}>
        <Video
          style={{
            height:height, 
            borderWidth: this.props.borderWidth,
            ...br, // While this works, there is an error message, keep out of default
          }}
          loop={true}
          source={this.props.source}
          playerState={this.state.playerState} 
        />
        {this.props.ctrl && 
          <VideoControl
            style={{
              height: 0.2,
              opacity: 0.5,
            }}
            playerState={this.state.playerState}
          />
        }
      </View>
    );
  }
}
