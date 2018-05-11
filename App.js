import '@expo/browser-polyfill';

import { THREE } from 'expo-three';
import React from 'react';
import { StatusBar, View } from 'react-native';
import Preload from './components/Preload';

/* 
  Inspired by WebGL tutorial: https://www.airtightinteractive.com/2015/01/building-a-60fps-webgl-game-on-mobile/
*/

require('./game/GameShader');
require('three/examples/js/shaders/CopyShader');
require('three/examples/js/postprocessing/EffectComposer');
require('three/examples/js/postprocessing/RenderPass');
require('three/examples/js/postprocessing/ShaderPass');

class App extends React.Component {
  componentWillMount() {
    THREE.suppressExpoWarnings(true);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <Preload />
      </View>
    );
  }
}

export default App;
