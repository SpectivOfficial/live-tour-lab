import React from 'react';
import {
} from 'react-vr';

import FadeInView from '../ltwrap/FadeInView';

export default class Card extends React.Component {
  static defaultProps = {
    width: 3.0,
    backgroundColor: '#ffffffee',
    borderWidth: 0,
  };

  constructor(props) {
    super();
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const borderRadius = 2 * this.props.borderWidth; // some reasonable default
    const borderColor = (this.props.borderColor) || '#d6d7da88';
    return (
      <FadeInView 
        style={{
          position:'absolute',
          width: this.props.width,
          layoutOrigin: [0.5, 0.5, 0],
          backgroundColor: this.props.backgroundColor,
          flexDirection: 'column',
          flex: 1,
          alignItems: 'stretch',
          borderRadius: borderRadius,
          borderWidth: this.props.borderWidth,
          borderColor: borderColor,
        }}
        billboarding={'off'}>
        {this.props.children}
      </FadeInView>
    );
  }
}

