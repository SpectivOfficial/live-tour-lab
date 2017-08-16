import React from 'react';
import {
  Image,
  View,
  asset,
  Text,
} from 'react-vr';

import FadeInView from '../ltwrap/FadeInView';

export default class LoadingInVr extends React.Component {
  static defaultProps = {
    width: 1,
    height: 1,
    iconTranslateZ: -4,
    textColor: 'black',
    duration: 100,
  };

  constructor(props) {
    super();
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const txt = (this.props.txt) || 'Swipe to Look Around';
    const txtBgCol = (this.props.txtBgCol) || '#ffffff00'; // Default background is transparent

    return (
      <FadeInView
        duration={this.props.duration}
        style={{
          position:'absolute',
          width: 7,
          height: 7,
          backgroundColor: '#ffffff',
          transform: [
            {translateZ: this.props.iconTranslateZ},
          ],
          layoutOrigin: [0.5, 0.5, 0], // Mysterious
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image 
          style={{
            width: this.props.width,
            height: this.props.height,
          }}
          source={asset('red-circle.png')}
        />
        <Text 
          style={{
            fontSize: 0.4,
            fontWeight: '200',
            color: this.props.textColor,
            backgroundColor: txtBgCol,
          }}>
          {txt}
        </Text>
      </FadeInView>
    );
  }
}

