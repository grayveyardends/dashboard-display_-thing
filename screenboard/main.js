import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";

const container = document.querySelector(".three-box");

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-canvas"),
  alpha: true,
  antialias: true,
});

renderer.setClearColor(0x000000, 0); // transparent background
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(container.clientWidth, container.clientHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

camera.position.set(4, 10, 20);
camera.lookAt(0, 0, 0);

const groundGeometery = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometery.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide,
});
const groundMesh = new THREE.Mesh(groundGeometery, groundMaterial);
scene.add(groundMesh);

const spotlight = new THREE.SpotLight(0xffffff, 3, 100, 0.2, 0.5);
spotlight.position.set(0, 25, 0);
scene.add(spotlight);

const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);

const gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  const w = container.clientWidth;
  const h = container.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});
