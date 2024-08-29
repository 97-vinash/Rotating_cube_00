import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.enableDamping = true;
orbit.dampingFactor = 0.04;

// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

const hemiLight = new THREE.HemisphereLight(0xADFF2F, 0x000000, 2);
scene.add(hemiLight);

camera.position.set(0, 0, 10);

// camera.rotation.y = Math.PI / 4;

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
}); //0xADFF2F - light green
const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

const edgesGeometry = new EdgesGeometry(box.geometry);
const edgesMaterial = new LineBasicMaterial({color: 0xffffff});
const edges = new LineSegments(edgesGeometry, edgesMaterial);
// scene.add(edges);

const boxGroup = new THREE.Group();
boxGroup.add(box);
boxGroup.add(edges);
scene.add(boxGroup);
// boxGroup.position.set(0, 1.5, 0);

// const gridHelper = new THREE.GridHelper();
// scene.add(gridHelper);

function animate() {
    boxGroup.rotation.x += 0.0008;
    boxGroup.rotation.y += 0.0008;

    renderer.render(scene, camera);
    orbit.update();
}

renderer.setAnimationLoop(animate);


