import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

import Assets from '../Assets';
import { TextureLoader } from 'expo-three';
import Node from './Node';

class Background extends Node {
  constructor() {
    super();
    this.material = new MeshBasicMaterial({
      map: new TextureLoader().load(Assets.images['sky.png']),
      transparent: true,
      depthTest: true,
      fog: false,
    });

    const mesh = new Mesh(new PlaneGeometry(800, 300, 1, 1), this.material);
    mesh.scale.set(20, 20, 20);
    mesh.position.z = -3600;
    mesh.position.y = 1800;
    this.add(mesh);
  }
}

export default Background;
