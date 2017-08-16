<h1 align="center">LiveTourLab</h1>

<br/>

LiveTourLab is an extensible framework for creating Live VR Tours. Extend with your own VR components in minutes.
Built on top of Facebook's open source [React VR](https://github.com/facebook/react-vr).

A live tour is an entirely new media format:
- [x] 10x faster creation than game engines
- [x] 10x more interactive than video streaming
- [x] 10x more immersive than 2D canvas
- [x] 10x more extensible than GUI apps - code beats GUI
- [x] 0 special cameras or software needed
- [x] 0 lock-in with static build
- [x] 100% open source
- [x] 1 minute to get started, a lifetime to master


## Demo (click to open in new tab)
<a href="https://livetourlab.com
" target="_blank" title="Click to open this Live Tour in new tab"><img src="https://livetourlab.com/dev/static/img/screen-rec-10fps-320.gif"
alt="Live Tour Lab Demo" width="320" height="180" border="0" /></a>

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
```
import React from 'react';
import { AppRegistry } from 'react-vr';

import {LiveTour} from 'live-tour-lab';

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

```
git clone ... static_assets/
```

4. __Run your first Live Tour!__

```
npm start
```


## Create your Own Component in minutes

1. __Create a new file Hero.js__

Surely you feel a pressing need for a component that displays my rotating portrait in your tours. Let's create one. Create a new file in your main directory, MyLiveTour/Hero.js with the contents below
```
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
```
import React from 'react';
import { AppRegistry } from 'react-vr';

import {LiveTour} from 'live-tour-lab';
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

You indicated above that the Hero component will take care of "heroes" entries. So locate the last scene "BackHome", and add a "heroes" section, as follows. The elements are sent as props to your Hero.js component.
```
...
{
  "id":"BackHome",
  "photopanos":[
    { "src":"1004-11.jpg","rotateY":350 }
  ],
  "heroes": [
    { "src": "boss.jpg", "width": 2, "height": 2, "rotateY": 35, "op": 0.1 },
    { "src": "boss.jpg", "width": 2, "height": 2, "rotateY": 325 }
  ],
  "infos":[
...
```

4. __Reload browser__

Reload your browser window and enjoy! :-)

5. __Dev reload json__

Add a ?dev=1 to the URL:  http://localhost:8081/vr/?dev=1

Then look down and click the semi-transparent circular arrow to reload the json tour definition file. This updates the scene definition while keeping all states intact and works also a production build of the code.

Try changing something in one of the "heroes" entries above and reload the json to instantly see the result.

5. __Use tour defaults__

A lot of information was the same in the 3 hero entries. While you could change the defaults in your Hero.js component code, it is often the case where you want different looks in different tours. So go ahead and set a default for our tour instead. Add an entry to the defaults section at the top of the json file:
```
...
"defaults": {
    "heroes": {
      "src": "boss.jpg",
      "width": 2,
      "height": 2
    },
    "navs": {
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
    { "rotateY": 35, "op": 0.1, "width": 1 },
    { "rotateY": 325 }
  ],
...
```



## Please Star and Watch this Repo!

I've had the immense blessing of getting to play a role in changing the world once already, in telecommunication. 7.1 billion mobile subscriptions now exceed the world population. Suddenly Facebook & Google's 2-3 billion users seems just a humble beginning.

I am convinced that VR will change the world, just as telecommunication and the Internet did. Transferring immersive experiences is profoundly different from transferring information. I have decided to try to play a part in changing the world a 2nd time, with VR, in my roots of computer graphics. As Steve said, “Those who are crazy enough to think they can change the world usually do.”

We built the world's best live tour platform and now we give it away as open source. I could have sold it, I had a good offer. But money is overrated and it is here on Github that the world's best minds are found.

With love and respect, I invite you to take part in creating this entirely new media format. Here and now, I ask two things from you.

1. Please Star & Follow this Github repo and take part in its evolution, if you in any way feel inspired by VR and what it can do for mankind. This is a humble beginning. It took 20 years to democratize communication and information, putting an Internet connected mobile phone in the hand of every person the planet. This is not the end result, I have big visions of where we can take VR. Join me from day 1.

2. Please take my short course to to get up to speed faster. Don't waste time, it is your most precious asset. With great love and care I have therefore crafted a small course in live tour creation, with the ambition to save both you and me time. It is not free because I want you to commit. Investing something small reduces risk of procrastination, delays and quitting. Please take the course and then joint me in creating the future. It will be fun.

I also want to express a profound thank you to the amazing Facebook team that open sourced React VR, which this version of LiveTourLab is built on. We had written 75% of the code on another platform when I took the decision to re-write it on React VR instead. Result became 1/10 of the code in 1/10 of the time (with surely 1/10 of the bugs). Well done building an amazing piece of software, and I hope that LiveTourLab will add to your vision of democratizing VR.

Again, I have put my heart and soul into this, please do me the honor of both Starring and Watching the Repo. Let's do magic!

![Please both Star and Watch](https://livetourlab.com/dev/static/img/star-watch.gif)

// Anders

## Please Contribute

This is a beginning. We have around 20 live tour components today and I foresee that we will have hundreds of components soon, for every application that is suited to the format.

Even without any react experience, you can easily put a custom component together - just follow the existing components and you'll figure it out in under an hour if you know JavaScript. Personally I had completely switched to Vue for my front-ends, but I must say I like React for VR, it is better fit for this more programmatic model.

As shown above, it is trivially easy to integrate any React VR component into the LiveTourLab framework without even touching the repo. Just define a namespace for the json markup and follow the example. The elements in the json get sent to you as props, both from the "defaults" section of your namespace and the entries. Then you can render anything you want with it in your component. When done, please contribute your creation.

We more than welcome you to integrate your component into the LiveTourLab core main repo. Then you can also receive callback functions to your components to update the tour state, similar to the Navigation component.

Welcome to send me an email directly. I'm the founder and main developer. I have always put pride in being accessible and I look forward to hearing from you: anders@livetourlab.com

Development requests. Please pick up any of these, work with me and we will check in your creation into the main repo. If you have other ideas, please write to me as well.

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
- [ ] World instead of scene rotation to avoid the rotation flicker (if not using fade-to-black)

Short-term contribution wanted:
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


## Using the repo source to contribute to the LiveTourLab core

I tried many different variants and the simplest one is what I ended up using:

Move the live-tour-lab directory out of node_modules and into your project directory. So if you stand in MyLiveTour (see getting started above) do
```
mv node_modules/live-tour-lab ./
```

Then modify index.vr.js and change the import statement 
from:
```
import {LiveTour} from 'live-tour-lab';
```
to:
```
import {LiveTour} from './live-tour-lab';
```

Then you can continue running your project and edit as much as you want in the live-tour-lab directory.

When you have produced something great, just publish to github from inside the live-tour-lab directory. No need to move it back or do anything else. It is really that simple!


## Component Reference
Please see:
#### [livetourlab.com/](https://livetourlab.com/)
