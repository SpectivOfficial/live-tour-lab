import React from 'react';
import {
  Text,
  View,
} from 'react-vr';

export default class CardContent extends React.Component {
  static defaultProps = {
    textColor: '#000000',
    fontSize: 0.12,
  };

  constructor(props) {
    super();
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Text style={{
        fontSize: this.props.fontSize,
        fontWeight: '200',
        textAlign: 'justify',
        color: this.props.textColor,
        marginLeft: 0.1,
        marginRight: 0.1,
        marginTop: 0,
        marginBottom: 0.015,
      }}>
        {this.props.children}
      </Text>
    );
  }
}
