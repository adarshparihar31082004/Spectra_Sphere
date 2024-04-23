import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.getElementById('model-viewer').appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load('/front-page-orb/orb.glb', function(gltf) {
    scene.add(gltf.scene);
}, undefined, function(error) {
    console.error('An error happened', error);
});

document.getElementById('start-ar').addEventListener('click', () => {
    if ('xr' in navigator) {
        navigator.xr.requestSession('immersive-ar', { requiredFeatures: ['local-floor', 'hit-test'] })
            .then(xrSession => {
                renderer.xr.setSession(xrSession);
                xrSession.addEventListener('end', () => {
                    // Handle session end
                });
            });
    }
});

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

animate();
