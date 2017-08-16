import React from 'react';
import {
  asset,
  Image,
} from 'react-vr';


export default class Preload extends React.Component {
  static defaultProps = {
    src: null, // File to preload
  };

  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    return( 
      <Image 
        style={{
          width: 0,
          height: 0,
          opacity: 0,
        }}
        source={asset(this.props.src)}
      />
    );
  }
}

