// import '@expo/browser-polyfill';
import * as THREE from 'three';
global.THREE = global.THREE || THREE;
require('./game/GameShader');
require('three/examples/js/shaders/CopyShader');
require('three/examples/js/postprocessing/EffectComposer');
require('three/examples/js/postprocessing/RenderPass');
require('three/examples/js/postprocessing/ShaderPass');
