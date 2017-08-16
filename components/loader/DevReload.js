import React from 'react';
import {
  asset,
  Image,
  VrButton,
  VrHeadModel,
} from 'react-vr';

export default class DevReload extends React.Component {
  static defaultProps = {
    width: 0.4,
    height: 0.4,
    iconTranslateZ: -4,
    icon: 'icons/reload-icon.png',
    onClick: null,
    rotateY: null,
  };

  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    const rotY = (this.props.rotateY) || VrHeadModel.rotation()[1] || 10;

    return( 
      <VrButton onClick={this.props.onClick}>
        <Image 
          style={{
            transform: [ 
              {rotateY: rotY}, 
              {translate: [0, -2, this.props.iconTranslateZ]},
            ],
            position:'absolute',
            width: this.props.width,
            height: this.props.height,
            opacity: 0.5,
          }}
          source={asset(this.props.icon)}
        />
      </VrButton>
    );
  }
}

