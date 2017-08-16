import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  View,
  Model,
  Image,
  VrButton,
  Animated,
  Video,
  Text,
  VideoControl,
  MediaPlayerState,
  Scene,
  VrHeadModel,
} from 'react-vr';

//import Linking from 'Linking';
import {Linking} from 'react-native';

//import {History} from 'react-native';
//import History from 'History';
import { NativeModules } from 'react-vr';  // Trying this for History instead

import { Easing } from 'react-native';

import FadeInView from '../ltwrap/FadeInView';
import InfoPopup from '../popup/InfoPopup';
import Navigation from '../nav/Navigation';
import Preload from '../loader/Preload';
import LoadingInVr from '../loader/LoadingInVr';
import LTVideo from '../ltwrap/LTVideo';
import LTVideoAuto from '../ltwrap/LTVideoAuto';
import LTPhoto from '../ltwrap/LTPhoto';
import LTPhotoPano from '../ltwrap/LTPhotoPano';
import LTVideoPano from '../ltwrap/LTVideoPano';
import LTSound from '../ltwrap/LTSound';
import DevReload from '../loader/DevReload';
import VrLog from '../loader/VrLog';

export default class LiveTour extends React.Component {
  static defaultProps = {
    canAutoplaySound: false,
    tourURI: 'live-tour.json',
  };

  constructor (props) {
    super();
    this.state =  {
      tour: {},
      current_scene:null,
      showNav: false,
      pulseAnim: new Animated.Value(1),
      animationStarted: false,
      photo2d: {},
      doPreload: false,
      loadingFirstScene: false,
      firstPanoLoaded: false,
      //panoRotY: 0,
      sceneRotY: 0,
      nextRotateY: null,
      dev: false,
      urlLinkId: null,
      vrLog: [],
    };
    this.onNavigationClick = this.onNavigationClick.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.panoOnLoad = this.panoOnLoad.bind(this);
    this.panoOnLoadEnd = this.panoOnLoadEnd.bind(this);
  }

  componentWillMount() {
    let url = Linking.getInitialURL().then((url) => {

      if (url) {
        const dev = (url.search('dev=1')>1);
        if( dev ) {
          this.setState({dev: true});
        }
        const hash = url.split('#')[1];
        if( hash ) {
          this.setState({urlLinkId: hash});
        }

        //console.log('Initial url is: ' + url);
        //console.log('Dev parameter is: ', dev );
        //console.log('Hash is', hash );
      }

      this.fetchTourDef();

    }).catch(err => {
      console.log('An error occurred in Linking.getInitialURL', err, 'Will proceed anyway. Now fetching live tour definition.');
      this.fetchTourDef();

    });

  }

  componentWillUnmount() {
    //console.log('Will unmount');
  }

  componentDidMount() {
    //console.log('Did mount');
  }

  fetchTourDef() {
    fetch(asset(this.props.tourURI).uri)
      .then(res => {
        if (res.status >= 400) {
          let errMsg = 'Could not load file: '+ this.props.tourURI + ", got server response " + res.status;
          this.vlog(errMsg);
          throw(errMsg);
        } else {
          return res.json();
        }
      })
      .then(resJSON => {
        console.log('fetched the json:', resJSON);
        this.initTour( resJSON );
      })
      .catch( err => {
        this.vlog(err);
        throw(err);
      })
      .done();
  }

  vlog(msg) {
    console.log('vlog: ', msg);
    this.setState((prevState) => ({
      vrLog: [...prevState.vrLog, msg]
    }));
  }

  initTour( tourDef ) {
    this.setState({tour: tourDef});
    const firstSceneId = (this.state.urlLinkId !==null) ? this.state.urlLinkId : this.state.tour.firstSceneId;
    console.log('firstSceneId is', firstSceneId);
    let scene = this.getScene( firstSceneId );
    //console.log( 'Found scene', scene);
    if( scene ) {
      this.setRotY( scene );
      this.setScene( scene );
    }
  }

  getScene( sceneId ) {
    //console.log('getScene, sceneId', sceneId, 'from this.state.tour.scenes',this.state.tour.scenes );
    return( this.state.tour.scenes.find( i => i['id'] === sceneId ) );
  }

  setRotY( scene ) {
    let rotY = 0;
    if (Object.prototype.toString.call(this.state.nextRotateY) === '[object Number]') {
      //console.log('Got nextRotateY', this.state.nextRotateY);
      rotY = this.state.nextRotateY;
      this.setState({nextRotateY: null});
    } else if( scene.photopanos && scene.photopanos[0].rotateY ) {
      rotY = scene.photopanos[0].rotateY;
    } else if ( scene.videopanos && scene.videopanos[0].rotateY ) {
      rotY = scene.videopanos[0].rotateY;
    } else if (Object.prototype.toString.call(this.state.sceneRotY) === '[object Number]') {
      rotY = this.state.sceneRotY; // Can be useful for when walking back, when this not set neither on nav nor panos, then staying on course
    } 
    //console.log('Setting sceneRotY to', rotY);
    this.setState({sceneRotY: rotY});
  }

  setScene( scene ) {
    this.setState({current_scene: scene});
  }

  updateHistory( scene ) {
    const id = scene.id;
    const url = "#"+id;
    const name = (scene.name) || (this.state.tour.name) || "LiveTourLab";
    //console.log('name:', name);
    const NativeHistory = NativeModules.History;
    NativeHistory.pushState({sceneId: id}, name, url );

    /*
    History.state()
      .then(res => console.log('History state:', res) )
      .done();
    */
  }

  devReload() {
    // Reload JSON, but don't change scene or rotation - Handy during development
    // Clear log from previous error messages
    this.setState({vrLog: []});
    fetch(asset(this.props.tourURI).uri)
      .then(res => {
        if (res.status >= 400) {
          let errMsg = 'Could not load file: '+ this.props.tourURI + ", got server response " + res.status;
          this.vlog(errMsg);
          throw(errMsg);
        } else {
          return res.json();
        }
      })
      .then(resJSON => {
        console.log('fetched the json:', resJSON);
        const currSceneId = this.state.current_scene.id;
        tourDef = resJSON;
        //console.log('tourDef:', tourDef);
        //console.log('currSceneId:', currSceneId);
        this.setState({tour: tourDef});
        let scene = this.getScene( currSceneId );
        this.setScene( scene );
      })
      .catch( err => {
        this.vlog(err);
        throw(err);
      })
      .done();
  }

  onNavigationClick(toId,nextRotateY){
    //console.log('onNavigationClick', toId, nextRotateY);

    let scene = this.getScene( toId );
    this.setState({showNav: false});
    this.setState({doPreload: false});
    this.setState({nextRotateY: nextRotateY});
    this.setScene( scene );
    this.updateHistory( scene );
  }

  panoOnLoad() {
    //console.log('In panoOnLoad');
  }

  panoOnLoadEnd(){
    // ToDo:
    // If first scene doesn't include a Pano image, but for example a flat 2D image
    // need to call this method from the onLoad event of the Image
    // Maybe make new components "Intro Image" and "Intro Video" for that purpose with appropriate sizing and closing behaviour

    //console.log('In panoOnLoadEnd');
    if(!this.state.firstPanoLoaded) {
      this.setState({firstPanoLoaded: true});
      this.setState({loadingFirstScene: false});

      // Close 2D Loading page if any
      console.log('Posting sceneLoadEnd');
      postMessage({ type: "sceneLoadEnd"});
    }

    let scene = this.state.current_scene;
    this.setRotY( scene );

    this.setState({showNav: true});
    //console.log('showNav is', this.state.showNav);

    if( !this.state.animationStarted ) {
      this.startAnimation();
      //console.log('Started animation');
      this.setState({animationStarted: true});
    }
    this.setState({doPreload: true});
  }

  startAnimation(){
    //this.state.pulseAnim.setValue(0);
      Animated.sequence([
        Animated.timing(
          this.state.pulseAnim,
          {
            toValue: 1,
            duration: 1000,
            easing: Easing.in,
          }
        ),
        Animated.timing(
          this.state.pulseAnim,
          {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.cubic,
          }
        )
      ])
    .start(() => {
      this.startAnimation();
    });
  }



  render() {


    if( !this.state.current_scene ) {
      if( this.state.vrLog.length>0 ) {
        return <VrLog logArray={this.state.vrLog} />;
      }
      return null;
    }

    return (

      <Scene
        style={{
          transform: [
            {rotateY: this.state.sceneRotY},
          ],
          position:'absolute',
        }}>

        {this.state.current_scene['photopanos'] && 
          this.state.current_scene['photopanos'].map( (item,i) => {
            return ( 
              <LTPhotoPano 
                key={i}
                //panoRotY={this.state.panoRotY}
                onLoadEnd={this.panoOnLoadEnd}
                {...this.state.tour.defaults.photopanos}
                {...item}
              />
            );
          })
        }

        {this.state.current_scene['videopanos'] && 
          this.state.current_scene['videopanos'].map( (item,i) => {
            return ( 
              <LTVideoPano 
                key={i}
                onLoadEnd={this.panoOnLoadEnd}
                {...this.state.tour.defaults.videopanos}
                {...item}
              />
            );
          })
        }

        {this.state.showNav &&
          this.state.current_scene['navs'] && 
          this.state.current_scene['navs'].map( (item,i) => {
            return ( 
              <Navigation 
                key={i}
                onNavClick={this.onNavigationClick}
                pulseAnim={this.state.pulseAnim}
                {...this.state.tour.defaults.navs}
                {...item}
              />
            );
          })
        }

        {this.state.showNav && 
          this.state.current_scene['videos'] && 
          this.state.current_scene['videos'].map( (item,i) => {
            return ( 
              <LTVideo
                key={i}
                {...this.state.tour.defaults.videos}
                {...item}
              />
            );
          })
        }

        {this.state.showNav && 
          this.state.current_scene['videoautos'] && 
          this.state.current_scene['videoautos'].map( (item,i) => {
            return ( 
              <LTVideoAuto 
                key={i}
                canAutoplaySound={this.props.canAutoplaySound}
                {...this.state.tour.defaults.videos}
                {...item}
              />
            );
          })
        }

        {this.state.showNav && // Need to wait to display this until pano has loaded
          this.state.current_scene['photos'] && 
          this.state.current_scene['photos'].map( (item,i) => {
            return ( 
              <LTPhoto 
                key={i}
                {...this.state.tour.defaults.photos}
                {...item}
              />
            );
          })
        }

        {this.state.showNav &&
          this.state.current_scene['infos'] && 
          this.state.current_scene['infos'].map( (item,i) => {
            return ( 
              <InfoPopup 
                key={i}
                pulseAnim={this.state.pulseAnim}
                {...this.state.tour.defaults.infos}
                {...item}
              />
            );
          })
        }

        {this.state.showNav &&
          this.state.current_scene['sounds'] && 
          this.state.current_scene['sounds'].map( (item,i) => {
            return ( 
              <LTSound 
                key={i}
                {...this.state.tour.defaults.sounds}
                {...item}
              />
            );
          })
        }

        {this.state.doPreload &&
          this.state.current_scene['preloads'] && 
          this.state.current_scene['preloads'].map( (item,i) => {
            return ( 
              <Preload 
                key={i}
                {...this.state.tour.defaults.preloads}
                {...item}
              />
            );
          })
        }

        {(this.state.vrLog.length>0) && 
          <VrLog logArray={this.state.vrLog} />
        }

        {this.state.dev && 
          <View>
            <DevReload onClick={() => {this.devReload()} }></DevReload> 
            <DevReload onClick={() => {this.devReload()} } rotateY={0}></DevReload> 
            <DevReload onClick={() => {this.devReload()} } rotateY={90}></DevReload> 
            <DevReload onClick={() => {this.devReload()} } rotateY={180}></DevReload> 
            <DevReload onClick={() => {this.devReload()} } rotateY={270}></DevReload> 
          </View>
        }

        {/*
        {this.state.loadingFirstScene && 
          <LoadingInVr />
        }
        */}


        {this.state.showNav && 
          this.props.children && 
          React.Children.map(this.props.children, (child ) => {
            //console.log('Child is', child);
            //console.log('entries is', child.props.entries);
            let entriesStr = child.props.entries;
            let sceneEntries = this.state.current_scene[entriesStr];
            if( !sceneEntries ) {
              return null;
            }
            return(
              sceneEntries.map( (item,i) => {
                  //console.log('Item is', item, 'i is', i);
                  let extraChildProps = {
                    key: i,
                    ...this.state.tour.defaults[entriesStr],
                    ...item
                  }            
                  return React.cloneElement(child, extraChildProps);
                })
            );
          })
        }

      </Scene>
    );
  }
};

