import React from 'react';
import {
  Image,
} from 'react-vr';

export default class CardImage extends React.Component {
  static defaultProps = {
    width: 3.0,
    ratio: 1.778,
    source: null,
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
    const height = this.props.width / this.props.ratio;
    const borderRadius = this.props.borderWidth * 2;
    return (
      <Image
        source={this.props.source}
        style={{
          height: height, 
          marginTop: 0, 
          marginLeft: 0, 
          marginRight: 0,
          borderWidth: this.props.borderWidth,
          borderRadius: borderRadius,
          borderColor: '#d6d7da88',
          /*
          borderRadius: this.props.width > 5 ? 0.01 : 0 ,
          borderWidth: this.props.width > 5 ? 0.02 : 0 ,
          borderColor: '#e30a7888',
          */
        }}>
      </Image>
    );
  }
}

