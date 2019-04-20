import ExpoTHREE, { THREE } from '../expo-three';
import Assets from '../Assets';
import Node from './Node';

class Background extends Node {
  setupAsync = async () => {
    const map = await ExpoTHREE.loadAsync(Assets.images['sky.png']);
    this.material = new THREE.MeshBasicMaterial({
      map,
      transparent: true,
      depthTest: true,
      fog: false,
    });

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(800, 300, 1, 1),
      this.material,
    );
    mesh.scale.set(20, 20, 20);
    mesh.position.z = -3600;
    mesh.position.y = 1800;
    this.add(mesh);
  };
}

export default Background;
