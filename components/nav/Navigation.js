import React from 'react';
import {
  VrButton,
  Animated,
  Image,
  View,
  asset,
  Text,
} from 'react-vr';

import { Easing } from 'react-native';

import FadeInView from '../ltwrap/FadeInView';

export default class Navigation extends React.Component {
  static defaultProps = {
    to: null, // Id of next scene, mandatory
    txt: '', // Text label
    rotateY: 0, // Position of icon [degrees around Y axis]
    rotateX: 0, // Position of icon, default 0 horizontal [degrees around X axis]
    nextRotateY: null, // Rotation after entering next scene [degrees around Y axis]

    // Icon style

    icon:'icons/white-circle.png', // Icon file
    iconWidth: 0.4, // Width of icon [VR units, not pixels]
    iconHeight: 0.4, // Height of icon [VR units, not pixels]
    iconTranslateZ: -4, // Z distance of icon [VR units]
    iconDuration: 1300, // Time of fading in the navigation icon [ms]

    // Gazing style

    gazeNav: true, // Set to false to disable navigation by gazing, only navigating by click
    gazeDelay: 1800, // Time to gaze before navigating [ms]

    iconColorStart:'rgb(255,0,0)',   // Tint icon when gazing, animation start
    iconColorEnd:'rgb(255,255,255)', // Tint icon when gazing, animation end
    iconColorDisable:false,          // Disable gaze color animation

    // Text style

    textColor: 'white', // Text color
    backgroundColor:"#88888800",  // Text background color, default background is none, transparent
    backgroundGaze: "#44444433",  // Text background color when gazing, default is semi-transparent gray shadow

    fontSize: 0.12, // Font size
    fontWeight: '200', // Font weight
    borderRadius: 0.01, // Text background box border radius
    paddingLeft: 0.1, // Text padding left
    paddingRight: 0.1, // Text padding right

    onNavClick: null, // Function callback, don't set in json
  };

  constructor(props) {
    super();
    this.state = {
      gazing: false,
      timeoutId: null,
      gazeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
  }

  navClick(e) {
    //console.log('In Navigation navClick', e);
    //console.log('e.nativeEvent.inputEvent.eventType', e.nativeEvent.inputEvent.eventType);
    //console.log('e.nativeEvent.inputEvent.button', e.nativeEvent.inputEvent.button);
    if( this.props.onNavClick && this.props.to ) {    
      this.props.onNavClick(this.props.to, this.props.nextRotateY);
    }
  }

  startGazing() {
    if(!this.props.gazeNav) {
      return;
    }

    //console.log('Start gazing');
    // Set state to start gazing
    this.setState({gazing: true});

    // Start timeout
    const id = setTimeout(() => {
      this.navClick();
    }, this.props.gazeDelay);

    // Keep the timeout id to clear it later
    this.setState({timeoutId: id});

    // Start animation
    Animated.timing(this.state.gazeAnim, {
      toValue: 1,
      duration: this.props.gazeDelay,
      easing: Easing.in,
    }).start();
  }

  stopGazing() {
    if(!this.props.gazeNav) {
      return;
    }

    //console.log('Stop gazing');
    // Set state to no gazing
    this.setState({gazing: false});

    // Clear timeout
    if( this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
      this.setState({timeoutId: null});
    }

    // Stop animation and reset value
    this.state.gazeAnim.stopAnimation();
    this.state.gazeAnim.setValue(0);
  }

  render() {
    let interpolIconColor = this.state.gazeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.iconColorStart, this.props.iconColorEnd]
    });
    let interpolScale = this.state.gazeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2]
    });

    return (
      <FadeInView
        duration={this.props.iconDuration}
        style={{
          position:'absolute',
        }}>
        <VrButton
          onClick={ e => this.navClick(e) }
          ignoreLongClick={true}
          onEnter={() => this.startGazing() }
          onExit={() => this.stopGazing() }
          style={{
            position:'absolute',
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
            layoutOrigin: [0.5, 0, 0],            
            transform: [
              {rotateY: this.props.rotateY},
              {rotateX: this.props.rotateX},
              {translateZ: this.props.iconTranslateZ},
            ],
          }}>
          <Animated.Image 
            style={{
              width: this.props.iconWidth,
              height: this.props.iconHeight,
              transform: [{scale: this.state.gazing ? interpolScale : this.props.pulseAnim }],
              tintColor: (this.props.iconColorDisable) ? '#ffffff' : interpolIconColor,
            }}
            source={asset(this.props.icon)}
          />
          <Text 
            style={{
              fontSize: this.props.fontSize,
              fontWeight: this.props.fontWeight,
              color: this.props.textColor,
              backgroundColor: this.state.gazing ? this.props.backgroundGaze : this.props.backgroundColor,
              textAlign: 'center',
              borderRadius: this.props.borderRadius,
              paddingLeft: this.props.paddingLeft,
              paddingRight: this.props.paddingRight,
            }}>
            {this.props.txt}
          </Text>
        </VrButton>
      </FadeInView>
    );
  }
}

