import React from 'react';
import {
  Animated,
} from 'react-vr';

import { Easing } from 'react-native';

export default class FadeInView extends React.Component {
  static defaultProps = {
    duration: 200,
  };

  constructor(props) {
    super();
    this.state = {
       fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
     Animated.timing(
       this.state.fadeAnim,
       {
         toValue: 1,
         duration: this.props.duration,
         easing: Easing.in,
       }
     ).start();
  }
  render() {
    return (
      <Animated.View
        onEnter={this.props.onEnter}
        onExit={this.props.onExit}
        billboarding={this.props.billboarding}
        style={{...this.props.style, opacity: this.state.fadeAnim}}>
        {this.props.children}
      </Animated.View>
    );
  }
}