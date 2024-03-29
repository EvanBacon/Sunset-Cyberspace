import { TextureLoader } from 'expo-three';
import ImprovedNoise from 'improved-noise';
import { Platform } from 'react-native';
import {
  AdditiveBlending,
  DoubleSide,
  Geometry,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Vector3,
} from 'three';

import Assets from '../Assets';
import Colors from '../constants/Colors';
import Settings from '../constants/Settings';
import randomRange from '../utils/randomRange';
import Background from './Background';

const isIPhone = Platform.OS === 'ios';

const PARTICLES_COUNT = isIPhone ? 400 : 200;
const BAR_COUNT = isIPhone ? 20 : 10;

export default class Particles {
  windDir = 0;
  windStrength = 0;
  particlesTime = 0;
  particlesGeometry;
  bars = [];
  barMaterial;

  snoise = new ImprovedNoise();

  game;
  level;

  constructor(level) {
    this.game = level.game;
    this.level = level;
  }

  init = async () => {
    //make falling particles
    this.particlesGeometry = new Geometry();

    for (let i = 0; i < PARTICLES_COUNT; i++) {
      this.particlesGeometry.vertices.push(
        new Vector3(
          randomRange(-Settings.FLOOR_WIDTH / 2, Settings.FLOOR_WIDTH / 2),
          randomRange(Settings.PARTICLES_BOTTOM, Settings.PARTICLES_TOP),
          randomRange(-Settings.FLOOR_DEPTH / 2, Settings.FLOOR_DEPTH / 2),
        ),
      );
    }

    const particlesMaterial = new PointsMaterial({
      size: 50,
      // sizeAttenuation: true,
      map: new TextureLoader().load(Assets.images['particle.png']),
      transparent: true,
      blending: AdditiveBlending,
      depthTest: true,
      opacity: 0.7,
      depthWrite: false,
    });

    this.level.moverGroup.add(
      new Points(this.particlesGeometry, particlesMaterial),
    );

    //STRIPS
    //add bars for at high speed

    this.barMaterial = new MeshBasicMaterial({
      color: Colors.bar,
      blending: AdditiveBlending,
      depthTest: false,
      transparent: true,
      opacity: 0.6,
      // sizeAttenuation: true,
      side: DoubleSide,
    });

    const barGeom = new PlaneGeometry(20, 500, 1, 1);

    for (let i = 0; i < BAR_COUNT; i++) {
      const bar = new Mesh(barGeom, this.barMaterial);

      bar.scale.x = randomRange(0.2, 2);
      bar.origYScale = randomRange(0.2, 2);
      bar.scale.z = randomRange(0.2, 2);

      this.level.moverGroup.add(bar);

      bar.rotation.x = Math.PI / 2;
      bar.rotation.y = Math.PI / 2;

      bar.position.x = randomRange(
        -Settings.FLOOR_WIDTH / 2,
        Settings.FLOOR_WIDTH / 2,
      );
      bar.position.y = randomRange(-300, 600);
      bar.position.z = randomRange(
        -Settings.FLOOR_DEPTH / 2,
        Settings.FLOOR_DEPTH / 2,
      );

      this.bars.push(bar);
    }

    this.background = new Background();
    await this.background.setupAsync();
    this.game.scene.add(this.background);
  };

  shift = () => {
    for (let i = 0; i < PARTICLES_COUNT; i++) {
      let vert = this.particlesGeometry.vertices[i];
      vert.z += Settings.MOVE_STEP;

      if (
        vert.z + this.level.moverGroup.position.z >
        Settings.FLOOR_DEPTH / 2
      ) {
        vert.z -= Settings.FLOOR_DEPTH;
      }
    }
    this.particlesGeometry.verticesNeedUpdate = true;

    for (let i = 0; i < this.bars.length; i++) {
      let p = this.bars[i].position;
      p.z += Settings.MOVE_STEP;
      if (p.z + this.level.moverGroup.position.z > Settings.FLOOR_DEPTH / 2) {
        p.z -= Settings.FLOOR_DEPTH;
      }
    }
  };

  animate = () => {
    //global perlin wind
    this.particlesTime += 0.001;
    this.windStrength = this.snoise.noise(this.particlesTime, 0, 0) * 20;
    this.windDir =
      ((this.snoise.noise(this.particlesTime + 100, 0, 0) + 1) / 2) *
      Math.PI *
      2;

    for (let i = 0; i < PARTICLES_COUNT; i++) {
      let vert = this.particlesGeometry.vertices[i];

      //gravity
      vert.y -= 3;

      //bounds wrapping
      if (vert.y < Settings.PARTICLES_BOTTOM) {
        vert.y = Settings.PARTICLES_TOP;
      }

      //only do fancy wind if not playing
      if (!this.level.playing) {
        vert.x += Math.cos(this.windDir) * this.windStrength;
        vert.z += Math.sin(this.windDir) * this.windStrength;

        //wrap around edges
        if (vert.x > Settings.FLOOR_WIDTH / 2 + Settings.PARTICLES_EDGE)
          vert.x = -Settings.FLOOR_WIDTH / 2 + Settings.PARTICLES_EDGE;
        if (vert.x < -Settings.FLOOR_WIDTH / 2 + Settings.PARTICLES_EDGE)
          vert.x = Settings.FLOOR_WIDTH / 2 + Settings.PARTICLES_EDGE;

        if (vert.z > Settings.FLOOR_DEPTH / 2 + Settings.PARTICLES_EDGE) {
          vert.z = -Settings.FLOOR_DEPTH / 2 + Settings.PARTICLES_EDGE;
        }
        if (vert.z < -Settings.FLOOR_DEPTH / 2 + Settings.PARTICLES_EDGE) {
          vert.z = Settings.FLOOR_DEPTH / 2 + Settings.PARTICLES_EDGE;
        }
      }
    }

    this.particlesGeometry.verticesNeedUpdate = true;

    let opac = (this.level.getSpeed() - 0.5) * 2;

    this.barMaterial.opacity = (opac * 2) / 3;
    this.background.material.opacity = opac + 0.1;

    for (let i = 0; i < this.bars.length; i++) {
      const p = this.bars[i].position;
      p.z += 40;

      this.bars[i].scale.y = this.bars[i].origYScale * opac;
    }
  };
}
