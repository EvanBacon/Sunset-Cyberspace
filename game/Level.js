import { TweenMax } from 'gsap';
import ImprovedNoise from 'improved-noise';
import {
  CylinderGeometry,
  DoubleSide,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  PlaneGeometry,
  WireframeGeometry,
} from 'three';

import AudioManager from '../AudioManager';
import Colors from '../constants/Colors';
import Settings from '../constants/Settings';
import Collectible from './Collectible';
import Lighting from './Lighting';
import Particles from './Particles';

const ACCEL = 2000;
const MAX_SPEED_ACCEL = 70;
const START_MAX_SPEED = 1500;
const FINAL_MAX_SPEED = 7000;
const SIDE_ACCEL = 500;
const MAX_SIDE_SPEED = 4000;
const OBSTACLE_COUNT = 10;
const FLOOR_RES = 20;
const FLOOR_YPOS = -300;
const FLOOR_THICKNESS = 120; //300;
const LINE_WIDTH = 2;
const randomRange = (min, max) => min + Math.random() * (max - min);

export default class Level {
  snoise = new ImprovedNoise();

  stepCount = 0;
  moveSpeed = 0; //z distance per second
  slideSpeed = 0;
  sliding = false;

  rightDown = false;
  leftDown = false;
  playing = false;
  acceptInput = true;

  obstacles = [];

  noiseScale = 3;
  noiseSeed = Math.random() * 100;

  obstacleMaterials = [];
  time = 0;

  constructor(game) {
    this.game = game;
  }

  init = async () => {
    const lighting = new Lighting();
    await lighting.setupAsync();
    this.game.scene.add(lighting);

    this.moverGroup = new Object3D();
    this.game.scene.add(this.moverGroup);

    //make floor
    const floorGroup = new Object3D();

    this.floorMaterial = new MeshLambertMaterial({
      color: Colors.floor, //diffuse
      emissive: Colors.dark,
      side: DoubleSide,
    });
    this.floorMaterial.flatShading = true;

    //add extra x width
    this.floorGeometry = new PlaneGeometry(
      Settings.FLOOR_WIDTH + 1200,
      Settings.FLOOR_DEPTH,
      FLOOR_RES,
      FLOOR_RES,
    );
    const floorMesh = new Mesh(this.floorGeometry, [this.floorMaterial]);
    floorGroup.add(floorMesh);
    this.moverGroup.add(floorGroup);
    floorMesh.rotation.x = Math.PI / 2;
    floorGroup.position.y = FLOOR_YPOS;
    this.moverGroup.position.z = -Settings.MOVE_STEP;
    floorGroup.position.z = 500;

    this.geometry2 = new WireframeGeometry(this.floorGeometry); // or EdgesGeometry
    let material2 = new LineBasicMaterial({
      color: Colors.blue,
      linewidth: LINE_WIDTH,
      transparent: true,
    });
    this.wireframe = new LineSegments(this.geometry2, material2);
    floorMesh.add(this.wireframe);

    this.obstacleGeom = new CylinderGeometry(0, 256, 640, 8, 1, false);

    let obstacle;
    for (let i = 0; i < OBSTACLE_COUNT; i++) {
      const scl = randomRange(0.8, 1.3);
      // const matID = i % this.languageMaterials.length;
      obstacle = this.makeObstacle(scl);
      this.moverGroup.add(obstacle);
      obstacle.posi = Math.random();
      obstacle.posj = Math.random();
      obstacle.position.x =
        obstacle.posj * Settings.FLOOR_WIDTH - Settings.FLOOR_WIDTH / 2;
      obstacle.position.z =
        -(obstacle.posi * Settings.FLOOR_DEPTH) + Settings.FLOOR_DEPTH / 2;
      obstacle.position.y = Math.random() * -150 - 50;
      // obstacle.rotation.y = Math.random() * Math.PI * 2;
      this.obstacles.push(obstacle);
      obstacle.collided = false;
    }

    //add this.obstacles down the edges
    const EDGE_OBSTACLE_COUNT = 12;
    for (let i = 0; i < EDGE_OBSTACLE_COUNT; i++) {
      // const matID = i % this.languageMaterials.length;

      obstacle = this.makeObstacle(1.3, 0, Colors.pink);
      this.moverGroup.add(obstacle);
      obstacle.position.x = Settings.FLOOR_WIDTH / 2 + 300;
      obstacle.position.z =
        (Settings.FLOOR_DEPTH * i) / EDGE_OBSTACLE_COUNT -
        Settings.FLOOR_DEPTH / 2;
    }

    for (let i = 0; i < EDGE_OBSTACLE_COUNT; i++) {
      // const matID = i % this.languageMaterials.length;

      obstacle = this.makeObstacle(1.3, 1, Colors.pink);
      this.moverGroup.add(obstacle);
      obstacle.position.x = -(Settings.FLOOR_WIDTH / 2 + 300);
      obstacle.position.z =
        (Settings.FLOOR_DEPTH * i) / EDGE_OBSTACLE_COUNT -
        Settings.FLOOR_DEPTH / 2;
    }

    this.collectible = new Collectible();
    await this.collectible.setupAsync();
    this.moverGroup.add(this.collectible);

    TweenMax.fromTo(
      this.game.fxParams,
      0.3,
      { brightness: 0 },
      { brightness: -1 },
    );

    this.particles = new Particles(this);
    await this.particles.init();
    this.setFloorHeight();

    this.resetField();

    this.maxSpeed = START_MAX_SPEED;

    this.loaded = true;
  };

  makeObstacle = (scale, materialID, color = Colors.red) => {
    const obstacle = new Object3D();
    const cone = new Mesh(this.obstacleGeom, this.floorMaterial);
    cone.add(
      new LineSegments(
        new WireframeGeometry(this.obstacleGeom),
        new LineBasicMaterial({
          color,
          transparent: true,
          linewidth: LINE_WIDTH,
        }),
      ),
    );
    obstacle.add(cone);
    obstacle.scale.set(scale, scale, scale);
    obstacle.myheight = 1400 * obstacle.scale.y;
    return obstacle;
  };

  setFloorHeight = () => {
    //apply noise to floor

    //move mover back by Settings.MOVE_STEP
    this.stepCount++;
    this.moverGroup.position.z = -Settings.MOVE_STEP;

    //calculate vert psons base on noise
    let ipos;
    const offset =
      ((this.stepCount * Settings.MOVE_STEP) / Settings.FLOOR_DEPTH) *
      FLOOR_RES;

    for (let i = 0; i < FLOOR_RES + 1; i++) {
      for (let j = 0; j < FLOOR_RES + 1; j++) {
        ipos = i + offset;
        const cur = i * (FLOOR_RES + 1) + j;
        this.floorGeometry.vertices[cur].z =
          this.snoise.noise(
            (ipos / FLOOR_RES) * this.noiseScale,
            (j / FLOOR_RES) * this.noiseScale,
            this.noiseSeed,
          ) * FLOOR_THICKNESS;
      }
    }
    this.floorGeometry.verticesNeedUpdate = true;
    this.wireframe.geometry = new WireframeGeometry(this.floorGeometry);

    for (let i = 0; i < OBSTACLE_COUNT; i++) {
      const obstacle = this.obstacles[i];
      obstacle.position.z += Settings.MOVE_STEP;

      if (
        obstacle.position.z + this.moverGroup.position.z >
        Settings.FLOOR_DEPTH / 2
      ) {
        obstacle.collided = false;
        obstacle.position.z -= Settings.FLOOR_DEPTH;
        ipos = obstacle.posi + (offset / FLOOR_RES) * Settings.FLOOR_DEPTH;
        //re-randomize x pos
        obstacle.posj = Math.random();
        obstacle.position.x =
          obstacle.posj * Settings.FLOOR_WIDTH - Settings.FLOOR_WIDTH / 2;
        obstacle.visible = true;
      }
    }

    this.particles.shift();

    //shift collectible
    this.collectible.position.z += Settings.MOVE_STEP;
    if (
      this.collectible.position.z + this.moverGroup.position.z >
      Settings.FLOOR_DEPTH / 2
    ) {
      this.collectible.collided = false;
      this.collectible.position.z -= Settings.FLOOR_DEPTH;
      //re-randomize x pos
      this.collectible.posj = Math.random();
      const xRange = (Settings.FLOOR_WIDTH / 2) * 0.7;
      this.collectible.position.x = randomRange(-xRange, xRange);
    }
  };
  animate = delta => {
    this.time += delta;
    if (!this.loaded) {
      return;
    }
    //PLAYER MOVEMENT
    if (this.playing) {
      //max speed accelerates slowly
      this.maxSpeed += delta * MAX_SPEED_ACCEL;
      this.maxSpeed = Math.min(this.maxSpeed, FINAL_MAX_SPEED);

      //move speed accelerates quickly after a collision

      this.moveSpeed += delta * ACCEL;
      this.moveSpeed = Math.min(this.moveSpeed, this.maxSpeed);

      //right takes precedence

      const direction = this.direction * 0.1;
      this.slideSpeed = Math.max(
        Math.min(direction * SIDE_ACCEL, MAX_SIDE_SPEED),
        -MAX_SIDE_SPEED,
      );

      //bounce off edges of rails
      const nextx = this.game.camera.position.x + delta * this.slideSpeed;

      if (
        nextx > Settings.FLOOR_WIDTH / 2 ||
        nextx < -Settings.FLOOR_WIDTH / 2
      ) {
        this.slideSpeed = -this.slideSpeed;
        AudioManager.playAsync('hit');
      }

      this.game.camera.position.x += delta * this.slideSpeed;

      //TILT
      //this.moverGroup.rotation.z = 0.016 * this.slideSpeed * 0.003;

      this.game.camera.rotation.z = this.slideSpeed * -0.00003;
      // this.moverGroup.rotation.z = this.slideSpeed * 0.000038;
    } else {
      //slow down after dead
      this.moveSpeed *= 0.95;
    }

    this.collectible.update(delta, this.time);

    this.moverGroup.position.z += delta * this.moveSpeed;

    if (this.moverGroup.position.z > 0) {
      //build new strip
      this.setFloorHeight();
    }

    this.particles.animate();

    //SIMPLE HIT DETECT

    if (Settings.hitDetect) {
      let p;
      let dist;

      const camPos = this.game.camera.position.clone();
      camPos.z -= 200;

      p = this.collectible.position.clone();
      p.add(this.moverGroup.position);
      dist = p.distanceTo(camPos);
      if (dist < 200 && !this.collectible.collided) {
        //GOT POINT
        this.collectible.collided = true;
        this.game.onScorePoint();
      }

      for (let i = 0; i < OBSTACLE_COUNT; i++) {
        p = this.obstacles[i].position.clone();
        p.y = 0; //ignore obstacle height
        p.add(this.moverGroup.position);

        //can only hit this.obstacles if they are in front of you
        if (p.z < camPos.z && p.z > camPos.z - 200) {
          dist = p.distanceTo(camPos);
          if (dist < 200 && !this.obstacles[i].collided) {
            //GAME OVER
            this.obstacles[i].collided = true;
            this.onGameEnd();
          }
        }
      }
    }
  };

  startGame = isFirstGame => {
    this.acceptInput = false;
    //if first game just start run
    if (isFirstGame) {
      this.startRun();
      return;
    }

    //fade out

    TweenMax.fromTo(
      this.game.fxParams,
      0.3,
      { brightness: 0 },
      { brightness: -1 },
    );
    TweenMax.delayedCall(0.3, this.resetField);
    TweenMax.fromTo(
      this.game.fxParams,
      0.3,
      { brightness: -1 },
      { brightness: 0, delay: 0.3 },
    );
    TweenMax.delayedCall(0.6, this.startRun);
  };

  resetField = () => {
    const camPos = this.game.camera.position;
    //put cam in middle
    camPos.x = 0;
    //set tilt to 0
    this.slideSpeed = 0;
    this.moverGroup.rotation.z = 0;
    //kill this.obstacles that are too close at the start
    for (let i = 0; i < OBSTACLE_COUNT; i++) {
      let p = this.obstacles[i].position.clone();
      p.add(this.moverGroup.position);

      if (p.z < camPos.z && p.z > camPos.z - Settings.FLOOR_DEPTH / 2) {
        this.obstacles[i].collided = true;
        this.obstacles[i].visible = false;
      }
    }
  };

  startRun = () => {
    this.playing = true;
    this.acceptInput = true;
  };

  onAcceptInput = () => {
    this.acceptInput = true;
  };

  onGameEnd = () => {
    this.moveSpeed = -1200;
    this.maxSpeed = START_MAX_SPEED;
    this.playing = false;
    this.acceptInput = false;
    //wait before re-enabling start game
    TweenMax.delayedCall(1, this.onAcceptInput);
    this.game.onGameOver();
  };

  getSpeed = () => this.moveSpeed / FINAL_MAX_SPEED;
}
