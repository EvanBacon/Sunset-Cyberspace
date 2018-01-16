import './window/domElement';

import Expo from 'expo';
import { THREE } from 'expo-three';
import React from 'react';

import HomeScreen from './components/HomeScreen';
import Fonts from './constants/Fonts';
import Images from './constants/Images';
import Models from './constants/Models';
import arrayFromObject from './utils/arrayFromObject';
import cacheAssetsAsync from './utils/cacheAssetsAsync';
import AudioManager from './AudioManager';
/* 
  Inspired by WebGL tutorial: https://www.airtightinteractive.com/2015/01/building-a-60fps-webgl-game-on-mobile/
*/

/// Import web shim for three.js methods
require('./src/GameShader');

// Import Shaders
require('three/examples/js/shaders/CopyShader');
require('three/examples/js/postprocessing/EffectComposer');
require('three/examples/js/postprocessing/RenderPass');
require('three/examples/js/postprocessing/ShaderPass');

export default class App extends React.Component {
  state = { ready: false };

  componentWillMount() {
    THREE.suppressExpoWarnings(true);
    this._setupExperienceAsync();
  }

  _setupExperienceAsync = async () => {
    await this._preloadAsync();
    await AudioManager.sharedInstance.setupAsync();
    this.setState({ ready: true });
  };

  async _preloadAsync() {
    await cacheAssetsAsync({
      fonts: [
        {
          'Retro-Regular': Fonts['Retro-Regular'],
          'Retro-Italic': Fonts['Retro-Italic'],
        },
      ],
      files: [...arrayFromObject(Images), ...arrayFromObject(Models)],
    });
  }

  render() {
    return this.state.ready ? <HomeScreen /> : <Expo.AppLoading />;
  }
}
