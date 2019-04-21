import ExpoTHREE, { THREE } from '../expo-three';
import { TweenMax } from 'gsap';
import { Platform } from 'react-native';

import AudioManager from '../AudioManager';
import Colors from '../constants/Colors';
import Settings from '../constants/Settings';
import Level from './Level';

const isIPhone = Platform.OS === 'ios';
//Global Settings
export default class Game {
  isFirstGame = true;
  minMoveSpeed = 20;

  hiScore = 0;
  score = 0;

  hueTime = 0;
  fxParams = {
    vignetteAmount: 0.8,
    brightness: 0,
    saturation: 0.5,
  };

  constructor(camera, scene, renderer, onPlay, onUpdateScore) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.onPlay = onPlay;
    this.onUpdateScore = onUpdateScore;
    this.camera.position.z = Settings.FLOOR_DEPTH / 2 - 300;
    this.scene.fog = new THREE.Fog(
      Colors.fog,
      Settings.FLOOR_DEPTH / 2,
      Settings.FLOOR_DEPTH + 50,
    );
    this.renderer.setClearColor(Colors.backgroundColor, 1);
  }

  init = async () => {
    //INIT CONTROLS

    //FX
    this.superPass = new THREE.ShaderPass(THREE.GameShader);
    this.superPass.uniforms.vigDarkness.value = 2;
    this.superPass.uniforms.vigOffset.value = this.fxParams.vignetteAmount;
    this.superPass.uniforms.saturation.value = this.fxParams.saturation - 1;

    this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));
    this.composer.addPass(this.superPass);
    this.superPass.renderToScreen = true;

    this.level = new Level(this);

    await this.level.init();

    //fade in
    TweenMax.fromTo(
      this.fxParams,
      1,
      { brightness: -1 },
      { brightness: 0, delay: 0.5 },
    );
  };

  animate = delta => {
    this.level.animate(delta);

    const speed = this.level.getSpeed();
    let hueAmount;
    if (speed < 0.5) {
      hueAmount = 0;
    } else {
      hueAmount = (speed - 0.5) * 2;
    }
    this.superPass.uniforms.hueAmount.value = hueAmount;

    this.hueTime += speed * speed * 0.05;
    const hue = (this.hueTime % 2) - 1; //put in range -1 to 1
    this.superPass.uniforms.hue.value = hue;
    this.superPass.uniforms.brightness.value = this.fxParams.brightness;

    if (global.supportsEffects) {
      this.composer.render(delta);
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  };

  onResize({ width, height, scale }) {
    this.width = width;
    this.height = height;
    const halfRes = isIPhone ? scale : scale / 2;
    this.composer.setSize(width * halfRes, height * halfRes);
  }

  onScorePoint() {
    AudioManager.sharedInstance.playAsync('point');

    this.score += 1;
    let highScore = false;
    if (this.score === this.hiScore + 1 && this.hiScore !== 0) {
      AudioManager.sharedInstance.playAsync('best');
      highScore = true;
    }
    this.onUpdateScore(this.score, highScore);
  }

  onGameOver() {
    this.onPlay(false);
    AudioManager.sharedInstance.playAsync('hit');

    //display this.score
    if (this.score > this.hiScore) {
      this.hiScore = this.score;
    }
    this.hueTime = 0;
  }

  onGameStart() {
    this.onPlay(true);
    this.score = 0;
    if (Settings.playMusic) {
      AudioManager.sharedInstance.playAsync('retro');
    }
    this.level.startGame(this.isFirstGame);
    this.isFirstGame = false;
  }

  _onKeyPressed = () => {
    if (!this.level.playing && this.level.acceptInput) {
      this.onGameStart();
    }
  };

  keyboardMult = 2;

  onLeft = () => {
    this.level.direction = -this.minMoveSpeed * this.keyboardMult;
  };

  onRight = () => {
    this.level.direction = this.minMoveSpeed * this.keyboardMult;
  };

  onKeyUp = () => {
    this._onKeyPressed();
    this.level.direction = 0;
  };

  onTouchesBegan = ({ touches, gestureState: { dx } }) => {
    if (!this.level.playing && this.level.acceptInput) {
      this.onGameStart();
    }
    for (let i = 0; i < touches.length; i++) {
      const xpos = touches[i].pageX;
      if (xpos > this.width / 2) {
        this.level.direction = this.minMoveSpeed;
      } else {
        this.level.direction = -this.minMoveSpeed;
      }
    }
  };

  lastdx;
  onTouchesMoved = ({ touches, gestureState: { dx } }) => {
    if (!this.level.playing && this.level.acceptInput) {
      this.onGameStart();
    }

    // let frameDelta = dx;
    // if (this.lastdx) {
    //   frameDelta = this.lastdx - dx;
    // }
    // // this.level.direction = dx; //frameDelta * -10;

    // this.lastdx = dx;

    for (let i = 0; i < touches.length; i++) {
      const xpos = touches[i].pageX;
      if (xpos > this.width / 2) {
      } else {
        this.level.direction = -this.minMoveSpeed + dx;
      }
    }
  };

  onTouchesEnded = ({ changedTouches }) => {
    this.level.direction = 0;
    this.lastdx = null;
  };
}
