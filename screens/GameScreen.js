import ExpoGraphics from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import React from 'react';

import TouchableView from '../components/TouchableView';
import Colors from '../constants/Colors';
import Game from '../src/Game';

require('three/examples/js/shaders/FXAAShader');

class GameScreen extends React.Component {
  shouldComponentUpdate = (nextProps, nextState) => false;
  game = {};

  render = () => (
    <TouchableView
      id="game"
      shouldCancelWhenOutside={false}
      onTouchesBegan={event => this.game.onTouchesBegan(event)}
      onTouchesMoved={event => this.game.onTouchesMoved(event)}
      onTouchesEnded={event => this.game.onTouchesEnded(event)}
    >
      <ExpoGraphics.View
        style={{ flex: 1 }}
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        onResize={this.onResize}
      />
    </TouchableView>
  );

  onContextCreate = async ({ gl, width, height, scale }) => {
    // global.supportsEffects = gl.createRenderbuffer != null;

    // gl.createRenderbuffer = gl.createRenderbuffer || (() => ({}));
    // gl.bindRenderbuffer = gl.bindRenderbuffer || (() => ({}));
    // gl.renderbufferStorage = gl.renderbufferStorage || (() => ({}));
    // gl.framebufferRenderbuffer = gl.framebufferRenderbuffer || (() => ({}));

    const crazy = false;

    // renderer
    this.renderer = ExpoTHREE.renderer({
      gl,
      // precision: crazy ? 'highp' : 'mediump',
      antialias: false, //crazy ? true : false,
      stencil: false,
      maxLights: crazy ? 4 : 2,
    });
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(Colors.dark);

    // scene
    this.scene = new THREE.Scene();

    /// Standard Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 10500);
    // this.controls = new THREE.OrbitControls(this.camera);

    // setup custom world
    await this._setupWorld();
    this.onResize({ width, height, scale });
  };

  _setupWorld = async () => {
    this.game = new Game(
      this.camera,
      this.scene,
      this.renderer,
      this.props.onPlay,
      this.props.updateScore,
    );
    await this.game.init();
    this.props.onGameLoaded();
  };

  onResize = ({ width, height, scale }) => {
    if (!this.game) {
      return;
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
    this.game.onResize({ width, height, scale });
  };

  onRender = delta => {
    this.game.animate(delta);
  };
}

export default GameScreen;
