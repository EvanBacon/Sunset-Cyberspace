import ExpoTHREE, { THREE } from 'expo-three';

import Colors from '../constants/Colors';
import Settings from '../constants/Settings';
import Node from './Node';
import Images from '../constants/Images';

class Background extends Node {
  setupAsync = async () => {
    //SKY
    this.material = new THREE.MeshBasicMaterial({
      map: await ExpoTHREE.loadAsync(Images.sky),
      transparent: true,
      depthTest: true,
      fog: false,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(800, 300, 1, 1), this.material);
    mesh.scale.set(20, 20, 20);
    mesh.position.z = -3600;
    mesh.position.y = 1800;
    this.add(mesh);
  };
}

export default Background;
