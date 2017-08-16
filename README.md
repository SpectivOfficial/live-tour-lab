<h1 align="center">LiveTourLab</h1>

<br/>

LiveTourLab is a framework for creating Live Tours.
Add [React VR](https://github.com/facebook/react-vr) components.

## Demo (click to open)
<a href="https://livetourlab.com/tours/3003
" target="_blank"><img src="https://raw.githubusercontent.com/livetourlab/live-tour-lab/assets/screen-rec/screen-rec-shorter-9fps-290.gif"
alt="LiveTourLab Demo" width="290" height="163" border="0" /></a>

- [x] 10x more interactive than 360 videos
- [x] 10x more immersive than 2D
- [x] 10x more extensible than GUI apps
- [x] 10x faster creation than game engine VR
- [x] 100% open source
- [x] 100% standard camera compatible
- [x] 0 lock-in with static build
- [x] 1 minute to get started, a lifetime to master



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
(coming later today)
```

4. __Run your first Live Tour!__

```
npm start
```


## Create your Own Component in minutes

1. __Create a new file Hero.js__

Surely you feel a pressing need for a component that displays my rotating portrait in your tours. Let's create one! Create a new file in your main directory, MyLiveTour/Hero.js with the contents below
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

Now add a ?dev=1 to the URL:  http://localhost:8081/vr/?dev=1

Then looking down and clicking the semi-transparent circular arrow reloads the json tour definition file. That updates the scene definition while keeping all states intact. Works also a production build of the code.

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

I know the WHY is usually not in the readme, but I think that is wrong. What I have learned over the decades is that the WHY and the HOW always beats the WHAT given some time.

We built the world's best live tour platform and now we give it away as open source. We could have sold it, I had a good offer. But I want to do something bigger. Here on Github the world's best minds are found.

With love and respect, I invite you to take part in creating this entirely new media format. Here and now, I ask two things from you.

1. Please Star & Watch this Github repo and take part in its evolution, if you in any way feel inspired by VR and what it can do for mankind. This is a humble beginning. It took 20 years to democratize communication and information, putting an Internet connected mobile phone in the hand of every person the planet. This is not the end result, I have big visions of where we can take VR. Join me from day 1.

2. Please take my short course to to get up to speed faster. Time is our most precious asset. With great love and care I have therefore crafted a small course in live tour creation, with the ambition to save time. Please take the course and then join me in creating the future. It will be fun.

I also want to express a profound thank you to the amazing Facebook team that open sourced React VR, which this version of LiveTourLab is built on. We had written 75% of the code on another platform when I took the decision to re-write it on React VR instead. Result became 1/10 of the code in 1/10 of the time. Well done building an amazing piece of software, and I hope that LiveTourLab will add to Mark's vision of democratizing VR. He talked about it when we met in Jakarta already in 2014. A great visionary.

I've had the immense blessing of getting to play a role in changing the world once already, in telecommunication. 7.1 billion mobile subscriptions now exceed the world population. Facebook & Google's 2-3 billion users still has a way to go.

I am convinced that VR will change the world, just as telecommunication and the Internet did. Transferring immersive experiences is profoundly different from transferring information. I have decided to try to play a part in changing the world a 2nd time, with VR, honoring my roots in computer graphics. “Those who are crazy enough to think they can change the world usually do.”

Again, I have put my heart and soul into this, please do me the honor of both Starring and Watching the Repo. Let's do magic!

![Please both Star and Watch](https://livetourlab.com/static/vid/star-watch.gif)

<a href="https://livetourlab.com/tours/3003
" target="_blank"><img src="https://raw.githubusercontent.com/livetourlab/live-tour-lab/assets/screen-rec/screen-rec-shorter-9fps-290.gif"
alt="LiveTourLab Demo" width="290" height="163" border="0" /></a>

// Anders

## Please Contribute

This is a beginning. We have around 20 live tour components today and I foresee that we will have hundreds of components soon, for every application that is suited to the format.

Even without any react experience, you can easily build custom components. Just look at the existing components and you'll figure it out easily.

Personally I had completely switched to Vue for my front-ends, but I must say I like React for VR, it is well fit for this more programmatic model.

Just define a namespace for the json markup and follow the example above. When done, please contribute your creation to the repo if you think it is of general interest.

When integrating your component into the LiveTourLab core main repo, you can also receive callback functions to your components to update the tour state, similar to the Navigation component.

Welcome to send me an email directly. I'm the founder and main developer. I have always put pride in being accessible and I look forward to hearing from you: anders@livetourlab.com

Development requests. Please pick up any of these, work with me and we will check in your creation into the main repo. If you have other ideas, please write to me as well.

Immediate contribution wanted:
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

## Working with the source code

Easy!

To contribute to the LiveTourLab core, you need to work with the source code. Since the React VR structure is a bit different, I tried many different variants and the simplest one is what I ended up using:

Just move the live-tour-lab directory out of node_modules and into your project directory.

So if you stand in MyLiveTour (see getting started above) and installed through npm, do:
```
# edit ./package.json and remove live-tour-lab from dependencies

rm -rf node_modules/live-tour-lab
git clone https://github.com/livetourlab/live-tour-lab.git
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

That is it. Just continue running your project and edit as much as you want in the live-tour-lab source.

When you have produced something great, just publish to github from inside the live-tour-lab directory.


## Component Reference Documentation
Please find the full documentation on:
#### [livetourlab.com](https://livetourlab.com/)
