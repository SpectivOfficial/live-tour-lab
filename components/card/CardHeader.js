import React from 'react';
import {
  Text,
  View,
} from 'react-vr';

export default class CardHeader extends React.Component {
  static defaultProps = {
    textColor: '#333333',
    fontSize: 0.3,
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
        fontWeight: '400',
        textAlign: 'left',
        color: this.props.textColor,
        marginLeft: 0.1,
        marginRight: 0.1,
        marginTop: 0.1,
      }}>
        {this.props.children}
      </Text>
    );
  }
}

