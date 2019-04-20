import * as THREE from 'three';

global.THREE = global.THREE || THREE;

require('three/examples/js/loaders/OBJLoader');
THREE.suppressExpoWarnings = () => {};

class Renderer extends THREE.WebGLRenderer {
  constructor({ gl, canvas, pixelRatio, clearColor, width, height, ...props }) {
    width = width || gl.drawingBufferWidth;
    height = height || gl.drawingBufferHeight;
    super({
      canvas: canvas || {
        width,
        height,
        style: {},
        addEventListener: () => {},
        removeEventListener: () => {},
        clientHeight: height,
      },
      context: gl,
      ...props,
    });

    this.setPixelRatio(pixelRatio || 1);

    if (width && height) this.setSize(width, height);
    if (clearColor) this.setClearColor(clearColor, 1.0);
  }
}

const loadAsync = async res => {
  let nextRes = res;
  if (typeof res === 'object' && res !== null && res.downloadAsync) {
    nextRes = res.localUri || res.uri;
  }

  console.log('loadAsync', nextRes);
  if (nextRes.match(/\.(jpeg|jpg|gif|png)$/)) {
    return parseTexture(nextRes);
  } else if (nextRes.match(/\.obj$/i)) {
    console.log('loadAsync.obj', nextRes);
    const loader = new THREE.OBJLoader();
    return await new Promise((resolve, reject) =>
      loader.load(nextRes, resolve, () => {}, reject),
    );
  } else {
    throw new Error('unsupported file type', nextRes);
  }

  return new THREE.TextureLoader().load(nextRes);
};

async function parseTexture(asset) {
  return new THREE.TextureLoader().load(asset);
}

export default { THREE, Renderer, loadAsync };

export { THREE, Renderer, loadAsync };

const alignMesh = (mesh, axis = { x: 0.5, y: 0.5, z: 0.5 }) => {
  axis = axis || {};
  const box = new THREE.Box3().setFromObject(mesh);

  const size = box.getSize();
  const min = { x: -box.min.x, y: -box.min.y, z: -box.min.z };

  Object.keys(axis).map(key => {
    const scale = axis[key];
    mesh.position[key] = min[key] - size[key] + size[key] * scale;
  });
};

const scaleLongestSideToSize = (mesh, size) => {
  const { x: width, y: height, z: depth } = new THREE.Box3()
    .setFromObject(mesh)
    .getSize();
  const longest = Math.max(width, Math.max(height, depth));
  const scale = size / longest;
  mesh.scale.set(scale, scale, scale);
};

/// Used for smoothing imported meshes
const computeMeshNormals = mesh => {
  mesh.traverse(async child => {
    if (child instanceof THREE.Mesh) {
      /// Smooth geometry
      const temp = new THREE.Geometry().fromBufferGeometry(child.geometry);
      temp.mergeVertices();
      temp.computeVertexNormals();
      temp.computeFaceNormals();

      child.geometry = new THREE.BufferGeometry().fromGeometry(temp);
    }
  });
};

const utils = {
  alignMesh,
  scaleLongestSideToSize,
  computeMeshNormals,
};

export { utils };
