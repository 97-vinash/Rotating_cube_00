import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    37,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

camera.position.set(6, 6, 6);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0xADFF2F});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

const edgesGeometry = new EdgesGeometry(box.geometry);
const edgesMaterial = new LineBasicMaterial({color: 0x000000});
const edges = new LineSegments(edgesGeometry, edgesMaterial);
// scene.add(edges);

const boxGroup = new THREE.Group();
boxGroup.add(box);
boxGroup.add(edges);
scene.add(boxGroup);

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

function animate() {
    boxGroup.rotation.x += 0.04;
    boxGroup.rotation.y += 0.04;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


