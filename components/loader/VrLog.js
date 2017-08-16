import React from 'react';
import {
  VrButton,
  VrHeadModel,
  View,
  Text,
} from 'react-vr';

// Todo: Extend this component with functionality to clear logs, filter them, open/close view etc.

export default class VrLog extends React.Component {
  static defaultProps = {
    logArray: [],
    //onClear: Callbacks, Roadmap.
    fontSize: 0.1,
    color: 'white',
    backgroundColor: '#44444488',
    translateZ: -2,
  };

  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    //const rotY = VrHeadModel.rotation()[1] || 0;

    return( 
      <View billboarding="on">
        <Text 
          style={{
            transform: [ 
              {translateZ: this.props.translateZ},
            ],
            position:'absolute',
            fontSize: this.props.fontSize,
            fontWeight: this.props.fontWeight,
            color: this.props.textColor,
            backgroundColor: this.props.backgroundColor,
            textAlign: 'left',
            paddingLeft: 0.1,
            paddingRight: 0.1,
          }}>
          { this.props.logArray.join('\n') }
        </Text>
      </View>
    );
  }
}

