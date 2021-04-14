import { TweenMax } from 'gsap';
import { Platform } from 'react-native';
import { Fog } from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

import AudioManager from '../AudioManager';
import Colors from '../constants/Colors';
import Settings from '../constants/Settings';
import Level from './Level';

const GameShader = {
  uniforms: {
    tDiffuse: { type: 't', value: null },

    //Vignette
    vigOffset: { type: 'f', value: 1.0 },
    vigDarkness: { type: 'f', value: 1.0 },

    //BrightnessContrast
    brightness: { type: 'f', value: 0 },

    //HueSaturationShader
    hue: { type: 'f', value: 0 },
    hueAmount: { type: 'f', value: 0 }, //0-1
    saturation: { type: 'f', value: 0 },
  },
  vertexShader: `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}
	`,
  fragmentShader: `
  uniform sampler2D tDiffuse;
  uniform float vigOffset;
  uniform float vigDarkness;
  uniform float brightness;
  uniform float contrast;
  uniform float hue;
  uniform float hueAmount;
  uniform float saturation;
  varying vec2 vUv;
  void main() {
  vec4 col = texture2D( tDiffuse, vUv );
  vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( vigOffset );
  col = vec4( mix( col.rgb, vec3( 1.0 - vigDarkness ), dot( uv, uv ) ), col.a );
  col.rgb += brightness;
  float angle = hue * 3.14159265;
  float s = sin(angle), c = cos(angle);
  vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;
  float len = length(col.rgb);
  vec3 shiftedCol = vec3(
  dot(col.rgb, weights.xyz),
  dot(col.rgb, weights.zxy),
  dot(col.rgb, weights.yzx)
  );
  col = vec4( mix( col.rgb, shiftedCol.rgb, hueAmount ), 1.0 );
  gl_FragColor = col;
  }
	`,
};
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
    this.scene.fog = new Fog(
      Colors.fog,
      Settings.FLOOR_DEPTH / 2,
      Settings.FLOOR_DEPTH + 50,
    );
    this.renderer.setClearColor(Colors.backgroundColor, 1);
  }

  init = async () => {
    //INIT CONTROLS

    //FX
    this.superPass = new ShaderPass(GameShader);
    this.superPass.uniforms.vigDarkness.value = 2;
    this.superPass.uniforms.vigOffset.value = this.fxParams.vignetteAmount;
    this.superPass.uniforms.saturation.value = this.fxParams.saturation - 1;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
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
    AudioManager.playAsync('point');

    this.score += 1;
    let highScore = false;
    if (this.score === this.hiScore + 1 && this.hiScore !== 0) {
      AudioManager.playAsync('best');
      highScore = true;
    }
    this.onUpdateScore(this.score, highScore);
  }

  onGameOver() {
    this.onPlay(false);
    AudioManager.playAsync('hit');

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
      AudioManager.playAsync('retro');
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
