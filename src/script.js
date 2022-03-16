import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

console.log(dat);

/**
 * Debug
 */
const gui = new dat.GUI();

const parameters = {
  color: 0x96ff,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
  },
};

gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
});

gui.add(parameters, "spin");

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scenes
const scene = new THREE.Scene();

const geometry = new THREE.IcosahedronGeometry(24, 0);

const bufferArray = geometry.attributes.position.array;
const numVertices = geometry.attributes.position.count;

let vertices = [];
for (let i = 0; i < numVertices; i++) {
  const vertexIndex = i * 3;
  const x = bufferArray[vertexIndex];
  const y = bufferArray[vertexIndex + 1];
  const z = bufferArray[vertexIndex + 2];
  vertices.push({ x, y, z });
}
vertices = Array.from(new Set(vertices.map((vertex) => JSON.stringify(vertex)))).map((vertex) => JSON.parse(vertex))

const boxGeometry = new THREE.BoxGeometry(1,1,1)
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 'red',
    wireframe: true
})














// Object2
const geometry2 = new THREE.IcosahedronGeometry(24, 0);
const material2 = new THREE.MeshBasicMaterial({
  color: "white",
  wireframe: true,
});
const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.y = 0;
mesh2.position.x = 0;
mesh2.position.z = 0;
scene.add(mesh2);



for (let i = 0; i < vertices.length; i++) {
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    boxMesh.position.set(vertices[i].x, vertices[i].y, vertices[i].z)
    scene.add(boxMesh)
    boxMesh.lookAt(mesh2.position)
}



// Object3
// const geometry3 = new THREE.IcosahedronGeometry(24, 0)
// const material3 = new THREE.MeshBasicMaterial({ color: 'green', wireframe: true})
// const mesh3 = new THREE.Mesh(geometry3, material3)
// mesh3.position.y = 0
// mesh3.position.x = 0
// mesh3.position.z = 0
// scene.add(mesh3)

// Debug
// gui.add(mesh.position, 'x', -3, 3, 0.01)

// Axes helper
// const axesHelper = new THREE.AxesHelper(50)
// scene.add(axesHelper)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Updates sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// Scale
// mesh3.scale.set(0.75, 0.75, 0.75)

// Rotation
// mesh.rotation.x = Math.PI / 5.68
// mesh.rotation.y = 1
// mesh.rotation.z = 1

// Rotation2
// mesh2.rotation.x = Math.PI / 5.68

// mesh3.rotation.x = Math.PI / 5.68

// Position
// mesh.position.x = 0
// mesh.position.y = 0
// mesh.position.z = 0

// Camera
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height);
const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-100.333 * aspectRatio, 100.333 * aspectRatio, 100.333, -100.333)
camera.position.set(0, 0, 60);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webgl"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

// Time
// let time = Date.now()

// Clock
const clock = new THREE.Clock();

// Animations
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // // Time
  // const currentTime = Date.now()
  // const deltaTime = currentTime - time
  // time = currentTime

  // Update objects
  // mesh.rotation.x = 32 * Math.cos(elapsedTime)
  // mesh2.rotation.x = 8 * Math.cos(elapsedTime)
  // mesh3.rotation.x = 16 * Math.cos(elapsedTime)
  // mesh.scale.y = 2 * Math.sin(elapsedTime)
  // mesh2.scale.y = Math.sin(elapsedTime)
  // mesh3.scale.y = 1.5 * Math.sin(elapsedTime)
  // mesh.scale.x = 2 * Math.sin(elapsedTime)
  // mesh2.scale.x = Math.sin(elapsedTime)
  // mesh3.scale.x = 1.5 * Math.sin(elapsedTime)
  // mesh.scale.z = 2 * Math.sin(elapsedTime)
  // mesh2.scale.z = Math.sin(elapsedTime)
  // mesh3.scale.z = 1.5 * Math.sin(elapsedTime)

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 20) * 30
  // camera.position.z = Math.cos(cursor.x * Math.PI * 20) * 30
  // camera.position.y = cursor.y * 40
  // camera.lookAt(mesh.position)

  // camera.lookAt(mesh2.position)
  // camera.lookAt(mesh.position)

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();
