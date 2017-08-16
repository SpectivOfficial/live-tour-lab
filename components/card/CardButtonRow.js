import React from 'react';
import {
  View
} from 'react-vr';

export default class CardButtonRow extends React.Component {
  static defaultProps = {
    paddingTop: 0.2,
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
      <View style={{
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingTop: this.props.paddingTop,
      }}>
        {this.props.children}
      </View>
    );
  }
}

