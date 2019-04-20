// import '@expo/browser-polyfill';
import './three-common';

import { THREE } from './expo-three';
import React from 'react';
import { StatusBar, View } from 'react-native';
import Preload from './components/Preload';

/* 
  Inspired by WebGL tutorial: https://www.airtightinteractive.com/2015/01/building-a-60fps-webgl-game-on-mobile/
*/

class App extends React.Component {
  componentWillMount() {
    THREE.suppressExpoWarnings && THREE.suppressExpoWarnings(true);
    StatusBar.setHidden(true, true);
  }

  render() {
    return <Preload />;
  }
}

export default App;
