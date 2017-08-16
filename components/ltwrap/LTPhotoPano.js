import React from 'react';
import {
  Pano,
  asset,
} from 'react-vr';

/* Format:

      { 
        "src": "fraser-02-equir.jpg" 
        OR
        "src": [
          "tmp/1004-9-cm0.png",
          "tmp/1004-9-cm1.png",
          "tmp/1004-9-cm2.png",
          "tmp/1004-9-cm3.png",
          "tmp/1004-9-cm4.png",
          "tmp/1004-9-cm5.png"
          // px,nx,py,ny,pz,nz
        ]
      }

*/

export default class LTPhotoPano extends React.Component {
  static defaultProps = {
    //panoRotY: 0, // Not used for now, would be needed to rotate the world instead of the scene camera.
    src: null, // Source file
    onLoadEnd: null, // Function to call upon pano file finished loading
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let panosrc = null;
    if (Object.prototype.toString.call(this.props.src) === '[object String]') {
      panosrc = asset(this.props.src);
    } else if (Object.prototype.toString.call(this.props.src) === '[object Array]') {
      panosrc = [
        asset(this.props.src[0]),
        asset(this.props.src[1]),
        asset(this.props.src[2]),
        asset(this.props.src[3]),
        asset(this.props.src[4]),
        asset(this.props.src[5]),
      ];
    } 

    return (
      <Pano 
        source={panosrc}
        onLoadEnd={this.props.onLoadEnd}
        style={{ 
          /* transform: [{rotateY: this.props.panoRotY}], */
        }}
      />
    );
  }
}

