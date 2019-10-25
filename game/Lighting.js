import { HemisphereLight, PointLight } from 'three';

import Colors from '../constants/Colors';
import Settings from '../constants/Settings';
import Node from './Node';

class Lighting extends Node {
  constructor() {
    super();
    //lights
    const hemisphereLight = new HemisphereLight(Colors.light, Colors.dark, 0.6);
    hemisphereLight.position.y = 300;
    this.add(hemisphereLight);
    //middle light

    const centerLight = new PointLight(Colors.light, 0.8, 4500);
    centerLight.position.z = Settings.FLOOR_DEPTH / 4;
    centerLight.position.y = 500;
    this.add(centerLight);

    //point light
    const frontLight = new PointLight(Colors.light, 1, 2500);
    frontLight.position.z = Settings.FLOOR_DEPTH / 2;
    this.add(frontLight);
  }
}

export default Lighting;
