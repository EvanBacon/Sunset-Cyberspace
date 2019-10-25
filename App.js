// import '@expo/browser-polyfill';
import './three-common';

import React from 'react';
import { StatusBar } from 'react-native';

import Preload from './components/Preload';

/* 
  Inspired by WebGL tutorial: https://www.airtightinteractive.com/2015/01/building-a-60fps-webgl-game-on-mobile/
*/

StatusBar.setHidden(true, true);

export default Preload;
