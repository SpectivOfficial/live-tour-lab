import React from 'react';
import {
  asset,
  View,
  Image,
} from 'react-vr';

/* Photo to Blend with Pano background */

export default class LTPhoto extends React.Component {
  static defaultProps = {
    src: 'icons/red-heart.png', // Image source
    rotateY: 0, // Position of icon [degrees around Y axis]
    rotateX: 0, // Position of icon, default 0 horizontal [degrees around X axis]

    cmWidth: 1, // Sets the actual size, in cubemap widths. Hence 1 is 1 cubemap width. 0.5 is half a cubemap width.
    imgWidth: 1, // Set to the image size in pixels, only used for width/height ratio calculation
    imgHeight: 1, // Set to the image size in pixels, only used for width/height ratio calculation
    opacity: 1, // Photo opacity

    pretransform: [], // Advanced positioning
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // cmWidth = 1
    // imgWidth = 2048
    // imgHeight = 1152
    // roty = 90
    // src = 'hm2h264-blend-2048x1152-ff1.mp4'

    const base = 600;
    const cmWidth = this.props.cmWidth;
    const width = base * cmWidth;
    const height = this.props.imgHeight / this.props.imgWidth * width;
    const tray = height / 2;
    const traz = -base / 2;

    return (
      <View
        style={{
          alignItems: 'center',
          layoutOrigin: [0, 0, 0],
          opacity: this.props.opacity,
          transform: [
            {rotateY: this.props.rotateY},
            {rotateX: this.props.rotateX},
            {translate: [0, tray, traz]},
            ...this.props.pretransform
          ],
          position:'absolute',
        }}>
        <Image
          style={{
            layoutOrigin: [0, 0, 0],
            width: width,
            height: height,
            position:'absolute',
          }}
          source={ asset(this.props.src) }
        />
      </View>
    );
  }
}

