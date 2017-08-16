import React from 'react';
import {
  Text,
  View,
  VrButton,
} from 'react-vr';

export default class CardButton extends React.Component {
  static defaultProps = {
    textColor: '#000000',
    fontSize: 0.18,
    fontWeight: '200',
    borderColor: '#cccccc88',
    borderWidth: 0.008,
  };

  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <View style={{
        flex: 1,
        borderColor: this.props.borderColor,
        borderWidth: this.props.borderWidth,
        opacity: 1,
      }}>
      <VrButton onClick={this.props.onClick}>

      <Text style={{
        fontSize: this.props.fontSize,
        fontWeight: this.props.fontWeight,
        color: this.props.textColor,
        marginLeft: 0.1,
        marginRight: 0.1,
        marginTop: 0.1,
        marginBottom: 0.1,
        textAlign: 'center',
        textAlignVertical: 'center',   
      }}>
        {this.props.children}
      </Text>
      </VrButton>
      </View>
    );
  }
}

