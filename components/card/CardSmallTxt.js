import React from 'react';
import {
  Text,
  View,
} from 'react-vr';

export default class CardSmallTxt extends React.Component {
  static defaultProps = {
    textColor: '#000000',
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
        fontSize: 0.07,
        fontWeight: '200',
        textAlign: 'right',
        color: this.props.textColor,
        marginLeft: 0.1,
        marginRight: 0.1,
        marginTop: 0,
        marginBottom: 0,
      }}>
        {this.props.children}
      </Text>
    );
  }
}
