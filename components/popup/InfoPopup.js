import React from 'react';
import {
  asset,
  Image,
  View,
  Animated,
  NativeModules,
} from 'react-vr';

//import Linking from 'Linking';
import {Linking} from 'react-native';

import FadeInView from '../ltwrap/FadeInView';
import Card from '../card/Card';
import CardHeader from '../card/CardHeader';
import CardContent from '../card/CardContent';
import CardSmallTxt from '../card/CardSmallTxt';
import CardImage from '../card/CardImage';
import CardVideo from '../card/CardVideo';
import CardButtonRow from '../card/CardButtonRow';
import CardButton from '../card/CardButton';

export default class InfoPopup extends React.Component {
  static defaultProps = {
    card: null, // Card to show on hover. Mandatory for now
    rotateY: 0, // Position of icon [degrees around Y axis]
    rotateX: 0, // Position of icon, default 0 horizontal [degrees around X axis]

    // Icon style

    icon: 'icons/red-heart2.png', // Icon file
    iconWidth: 0.4, // Width of icon [VR units, not pixels]
    iconHeight: 0.4, // Height of icon [VR units, not pixels]
    iconTranslateZ: -4, // Z distance of icon [VR units]
    iconDuration: 1300, // Time of fading in the navigation icon [ms]

    // Card style

    stick: false, // If true, show always, also without hovering
    cardTranslateZ: -3.9, // Z distance of pop-up card [VR units]
    width: 3.0, // Card width
    backgroundColor: '#ffffffee', // Card background
    cardBorderWidth: 0, // Card border width
    borderColor: '#88888800', // Card border color

    // Advanced

    pretransform: [], // Advanced positioning

  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: (this.props.stick),
    };
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount() {
  }

  buttonClick(uri) {
    Linking.canOpenURL(uri).then(supported => {
      if (!supported) {
        console.log('Uri not supported: ', uri);
      } else {
        return Linking.openURL(uri);
      }
    }).catch(err => console.error('Linking open URL failed', err));
  }

  render() {
    if( (this.state.expanded) || (this.props.stick) ) {
      return( 
        <View 
          style={{
            transform: [ 
              {rotateY: this.props.rotateY}, 
              {rotateX: this.props.rotateX}, 
              {translateZ: this.props.cardTranslateZ},
              ...this.props.pretransform
            ],
            position:'absolute',
          }}
          onExit={() => {
            if(!this.props.stick) {
              this.setState({expanded: false})
            }
          }}>
          <Card width={this.props.width} backgroundColor={this.props.backgroundColor} borderColor={this.props.borderColor} borderWidth={this.props.cardBorderWidth} >
            {this.props.card.map((cardEntry, i) => {
              switch (cardEntry.type) {
                case 'header':
                  return(
                    <CardHeader 
                      key={i} 
                      textColor={cardEntry.textColor || (this.props.header && this.props.header.textColor)} 
                      fontSize={cardEntry.fontSize || (this.props.header && this.props.header.fontSize)} >
                      {cardEntry.txt}
                    </CardHeader>
                  );
                case 'image':
                  return(
                    <CardImage 
                      key={i} 
                      source={asset(cardEntry.src)} 
                      ratio={cardEntry.ratio || (this.props.image && this.props.image.ratio)} 
                      width={this.props.width} 
                      borderWidth={ !isNaN(cardEntry.borderWidth) ? cardEntry.borderWidth : (this.props.image && this.props.image.borderWidth)}
                    />
                  );
                case 'video':
                  return(
                    <CardVideo
                      key={i} 
                      source={asset(cardEntry.src)} 
                      ratio={cardEntry.ratio} 
                      width={this.props.width} 
                      borderWidth={ !isNaN(cardEntry.borderWidth) ? cardEntry.borderWidth : (this.props.video && this.props.video.borderWidth)}
                      ctrl={cardEntry.ctrl} 
                    />
                  );
                case 'content':
                  return(
                    <CardContent 
                      key={i} 
                      textColor={cardEntry.textColor || (this.props.content && this.props.content.textColor)} 
                      fontSize={cardEntry.fontSize || (this.props.content && this.props.content.fontSize)} >
                      {cardEntry.txt}
                    </CardContent>
                  );
                case 'footer':
                  return(
                    <CardSmallTxt 
                      key={i} 
                      textColor={cardEntry.textColor || (this.props.footer && this.props.footer.textColor)} 
                      fontSize={cardEntry.fontSize || (this.props.footer && this.props.footer.fontSize)} >
                      {cardEntry.txt}
                    </CardSmallTxt>
                  );
                case 'row':
                  return( 
                    <CardButtonRow key={i}>
                      {cardEntry.buttons.map((button, i) => {
                        return <CardButton key={i} onClick={() => this.buttonClick(button.uri) }>{button.txt}</CardButton>;
                      })}
                    </CardButtonRow>
                  );
                default:
                  return <Text style={{backgroundColor: 'red'}}>Invalid card type</Text>;
              }
            })}
          </Card>
        </View>
      );
    } else {
      return( 
        <FadeInView 
          duration={this.props.iconDuration}
          style={{
            transform: [ 
              {rotateY: this.props.rotateY}, 
              {rotateX: this.props.rotateX}, 
              {translate: [0, 0, this.props.iconTranslateZ]},
            ],
            position:'absolute',
            layoutOrigin: [0.5, 0, 0],            
          }}>
          <Animated.Image 
            style={{
              width: this.props.iconWidth,
              height: this.props.iconHeight,
              transform: [{scale: this.props.pulseAnim}]
            }}
            source={asset(this.props.icon)}
            onEnter={() => this.setState({expanded: true}) }
          />
        </FadeInView>
      );
    }
  }
}

