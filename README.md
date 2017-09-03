<h1 align="center"><img width="500" align="center" src="https://livetourlab.com/static/img/ltlab-logo-2000x303.a41dfa1.png" alt="LiveTourLab"/></h1>
<br/>

LiveTourLab is a framework for creating Live VR Tours. 21 ready components, easily add your own [React VR](https://github.com/facebook/react-vr) code.

## Demo (click play to enter)
<a href="https://livetourlab.com/tours/3004
" target="_blank"><img src="https://user-images.githubusercontent.com/13546743/29484526-cbd21df0-84ea-11e7-87e8-55dc6844f29c.gif"
alt="LiveTourLab Demo" width="300" border="0" /></a><br/>

<img src="https://user-images.githubusercontent.com/13546743/29484640-247e4350-84ed-11e7-9fdb-1c9d4cadb57c.png"
alt="LiveTourLab Demo" width="16" height="16" border="0" /> 10x more interactive than 360 videos<br/>
<img src="https://user-images.githubusercontent.com/13546743/29484640-247e4350-84ed-11e7-9fdb-1c9d4cadb57c.png"
alt="LiveTourLab Demo" width="16" height="16" border="0" /> 10x faster creation than game engine VR<br/>
<img src="https://user-images.githubusercontent.com/13546743/29484640-247e4350-84ed-11e7-9fdb-1c9d4cadb57c.png"
alt="LiveTourLab Demo" width="16" height="16" border="0" /> 10x more extensible than GUI authoring tools<br/>
<img src="https://user-images.githubusercontent.com/13546743/29484640-247e4350-84ed-11e7-9fdb-1c9d4cadb57c.png"
alt="LiveTourLab Demo" width="16" height="16" border="0" /> 100% cross-platform including custom code <br/>
<img src="https://user-images.githubusercontent.com/13546743/29484640-247e4350-84ed-11e7-9fdb-1c9d4cadb57c.png"
alt="LiveTourLab Demo" width="16" height="16" border="0" /> 100% standard camera compatible<br/>
<img src="https://user-images.githubusercontent.com/13546743/29484640-247e4350-84ed-11e7-9fdb-1c9d4cadb57c.png"
alt="LiveTourLab Demo" width="16" height="16" border="0" /> 100% open source<br/>
<img src="https://user-images.githubusercontent.com/13546743/29484640-247e4350-84ed-11e7-9fdb-1c9d4cadb57c.png"
alt="LiveTourLab Demo" width="16" height="16" border="0" /> 0 server lock-in with static build<br/>
<img src="https://user-images.githubusercontent.com/13546743/29484640-247e4350-84ed-11e7-9fdb-1c9d4cadb57c.png"
alt="LiveTourLab Demo" width="16" height="16" border="0" /> 0 effort to start, a lifetime to master<br/>


## Please Star and Watch!

<a href="https://livetourlab.com
"><img src="https://user-images.githubusercontent.com/13546743/29448371-8d45c700-8420-11e7-9c6c-f6f08981c36c.gif"
alt="Please both Star and Watch!" width="320" border="0" /></a>

The repo includes components for navigation, cards, preloading, blending photography and video and much more. Easily add your own React VR code. Once done, you define the tour in a separate JSON file, meaning you can use the same all-static code build for many tours:

<a href="https://livetourlab.com
"><img src="https://user-images.githubusercontent.com/13546743/29448460-f3eabff6-8420-11e7-90fb-f4dbc7b8b28b.gif"
alt="[Define in json extend with code" width="500" border="0" /></a>




## Getting started

1. __Create a new React VR & LiveTourLab project__

```
npm install -g react-vr-cli
react-vr init MyLiveTour
cd MyLiveTour
npm install live-tour-lab --save
npm install
```

2. __index.vr.js__

While waiting for install, open index.vr.js and change it to:
```jsx
import React from 'react';
import { AppRegistry } from 'react-vr';
import { LiveTour } from 'live-tour-lab';

export default class MyLiveTour extends React.Component {
  render() {
    return (
      <LiveTour tourURI='hello-world.json' />
    );
  }
};

AppRegistry.registerComponent('MyLiveTour', () => MyLiveTour);
```

3. __Grab the Hello World Tour__

Replace the React VR hello world with the LiveTourLab hello world:
```
rm -rf static_assets
git clone https://github.com/livetourlab/hello-world.git static_assets
```

4. __Run your first Live Tour!__

```
npm start
```
Point the browser as instructed, see build progress in the terminal window.

<a href="https://livetourlab.com" target="_blank"><img src="https://user-images.githubusercontent.com/13546743/29866239-092a08d8-8da2-11e7-8b44-82bf00fbebf4.jpg"
alt="LiveTourLab Demo" width="800" border="0" /></a>

<i>Hello world is done. Now time for code!</i>

## Create New React VR Component

1. __Create a new file Hero.js__

Let's add a new component. Create a new file in your main directory, MyLiveTour/Hero.js with the contents below
```jsx
import React from 'react';
import {
  asset,
  View,
  Animated,
  AnimatedImage,
} from 'react-vr';

export default class Hero extends React.Component {
  static defaultProps = {
    op: 1, // opacity of hero picture
    width: 1, // width of hero picture
    height: 1, // height of hero picture
    rotateY: 0, // position
    src: null, // file name
  };

  constructor(props) {
    super();
    this.state = {
      rotAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    Animated.timing(
      this.state.rotAnim,
      {
        toValue: 360,
        duration: 3000,
      }
    )
    .start(() => {
      // Restart at end
      this.state.rotAnim.setValue(0);
      this.startAnimation();
    });
  }

  render() {
    return (
      <Animated.Image
        style={{
          position:'absolute',
          layoutOrigin: [0.5, 0.5, 0],
          width: this.props.width,
          height: this.props.height,
          transform: [
            {rotateY: this.props.rotateY},
            {translateZ: -3},
            {rotateY: this.state.rotAnim},
            {translateX: 0.5}
          ],
          opacity: this.props.op,
        }}
        source={ asset(this.props.src) }
      />
    );
  }
}
```

2. __index.vr.js__

Open index.vr.js again. Import your new component and send it as a child to LiveTourLab. Full code again:
```jsx
import React from 'react';
import { AppRegistry } from 'react-vr';
import { LiveTour } from 'live-tour-lab';
import Hero from './Hero';

export default class MyLiveTour extends React.Component {
  render() {
    return (
      <LiveTour tourURI='hello-world.json' >
        <Hero entries="heroes" />
      </LiveTour>
    );
  }
};

AppRegistry.registerComponent('MyLiveTour', () => MyLiveTour);
```


3. __Edit static_assets/hello-world.json__

You indicated above that the Hero component will take care of "heroes" entries. So locate the last scene "Backyard", and add a "heroes" section, as follows. The elements are sent as props to your Hero.js component.
```
...
{
  "id":"Backyard",
  "photopanos":[
    {"src":"1004-fraser-11-low.jpg","rotateY":350}
  ],
  "heroes": [
    { "src": "boss.jpg", "width": 2, "height": 2, "rotateY": 35, "op": 0.9 },
    { "src": "boss.jpg", "width": 2, "height": 2, "rotateY": 325 }
  ],
  "infos":[
...
```

4. __Reload browser__

Reload your browser window and enjoy! ;-)

Now add a ?dev=1 to the URL:  http://192.168.1.6:8081/vr/?dev=1#Backyard

With the dev=1 flag, looking down and clicking the semi-transparent circular arrow reloads the json tour definition file, updating the scene definition while keeping all states intact. This works also a production build of the code. Try changing something in one of the "heroes" entries above and reload the json to instantly see the result.

5. __Tour defaults__

A lot of information was the same in the 2 hero entries. While you could change the defaults in your Hero.js component code, it is often the case that you want different looks in different tours. So go ahead and set a default for our tour instead. Add an entry to the defaults section at the top of the json file:
```
...
"defaults": {
    "heroes": {
      "src": "boss.jpg",
      "width": 2,
      "height": 2
    },
    "infos": {
...
````
Now, without changing the code, we can reduce the per-scene markup to just:

```
...
  "heroes": [
    { "rotateY": 35, "op": 0.1 },
    { "rotateY": 325 }
  ],
...
```

While you can still override the defaults in individual entries eg.
```
...
  "heroes": [
    { "rotateY": 35, "height": 0.5, "width": 0.5 },
    { "rotateY": 325 }
  ],
...
```


## Please Contribute for a Better Future

TV, YouTube and Netflix is turning the world population into passive addicts of entertainment. When my children grow up, I want media to instead fuel their imagination, let them be active participants, help them be present in the moment, and feel the impact of life changing experiences, even if far away.

With love and respect, I invite you to take part in creating this entirely new media format.

We are making a more interactive, more immersive, more extensible, faster to create, more standards-compatible format for experiences.

Creating a new media format is big. It is so big, it is something that one of the giant companies would do in a gigantic project. So here I am, asking you to join me in doing just that, with the power of open source.

If you want to do something big, you have to say so, and then stand up for it when people laugh at you, or you never get there. I have had the incredible blessing to get to play a part in changing the world once already, in another industry, and with your help, we can do it again.

If you in any way feel inspired by VR and what it can do for mankind, please Star & Watch this Github repo and take part in its evolution. This is a humble beginning. It took us 20 years last time, but we reached almost every person on the planet, with twice as many users as Google & Facebook combined. Big things can be done.

What you see in this repo is today 21 components making it easier to create tours. We needs 100'ds. As all cinematic VR content of today, the experience suffers from lack of parallax responsiveness, too slow hardware to keep up with the resolution needed, bulky media files, expensive cameras, and a million other issues. We will solve all of that.

Dream big, start small, begin now.

Again, I have put my heart and soul into this, please do me the honor of both Starring and Watching the Repo.

Welcome to send me an email directly. I have always put pride in being accessible and I look forward to hearing from you: anders@livetourlab.com

Short term contribution wanted. If you have other ideas, please write to me as well.
- [ ] 3PP video players for 2D videos
- [ ] 3PP video players for Pano videos
- [ ] Model: Pick up and rotate a product.
- [ ] In-tour visual editor mode for the JSON (click-drag, add objects)
- [ ] 2D UI in VR, with keyboard, 2D layout etc
- [ ] Video alfa: Alfa channel support on videos that works cross-platform
- [ ] Blink black: Nav fading to and from black upon scene change
- [ ] Gaze toggle other objects than cards, eg video overlay
- [ ] Prevent info popups from appearing first few moments of entering a new scene
- [ ] Heat map recording
- [ ] Pixel, Analytics recording
- [ ] Navigation component peaking into next scene
- [ ] Optimise convert options better for sharper 8k pano photos
- [ ] Optimise ffmpeg options better for VP9 pano videos
- [ ] Try-room, shopping assistant, dress up, checkout
- [ ] VR chat
- [ ] Game components
- [ ] Avatar AI
- [ ] Avatar Human
- [ ] Specialized avatars: Dinner companion, Personal trainer, Executive coach etc.

Long term contribution wanted:
- [ ] Integrate with cameras manufacturer for dual-lens
- [ ] Better file format for cinematic 3D supporting parallax movement
- [ ] ...and much more :-)

Done:
- [x] LiveTour
- [x] Navigation
- [x] Info popup
- [x] Flexible Card with Header, Content, Footer, Image, Video, Row, Buttons
- [x] Base background 360 photo
- [x] Base background 360 video
- [x] Anchor photo on background
- [x] Anchor video on background
- [x] Anchor video with auto-play sound on background
- [x] Sound
- [x] Pre-loader
- [x] Various dev tools

In progress:
- [ ] World rotation instead of scene rotation to avoid the rotation flicker or use fade-to-black

// Anders


## Compiling from Source

Welcome to contribute to the LiveTourLab core by working the source code. Given the React VR project structure, I tried many different variants for folder structure, symlinks and hard links. Finally I ended up using a much simpler solution, which is what I recommend: Just move the live-tour-lab directory out of node_modules and into your project directory.

Stand in the project folder, MyLiveTour in the getting started example above, and do:
```
# edit ./package.json and remove live-tour-lab from dependencies
rm -rf node_modules/live-tour-lab
git clone  https://github.com/livetourlab/live-tour-lab.git
npm start
```

That is it. Your project still runs. No need to symlink or manage dependencies. Now go ahead and edit the source. When you have produced something great, just push to github from inside the live-tour-lab directory  (not project directory).


## License

Apache License Version 2.0


## Component Reference Documentation

Please find the component reference documentation on:
#### [livetourlab.com/docs](https://livetourlab.com/docs)



Thank you!
