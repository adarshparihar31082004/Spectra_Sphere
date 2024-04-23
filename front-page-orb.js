import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/RGBELoader.js';
// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable transparency
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('orb-container').appendChild(renderer.domElement);

// Lighting setup
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(11, 11, 13);
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight);
scene.add(spotLight.target);

const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 5);
scene.add(hemisphereLight);

// Define gltf model variable at a higher scope
let loadedGltf = null;

// Loading HDR Environment
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
new RGBELoader()
    .setDataType(THREE.UnsignedByteType) // For HDR effect
    .load('models/car/MR_INT-001_NaturalStudio_NAD.hdr', function (texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.environment = envMap;
        pmremGenerator.dispose();
        texture.dispose();
    });





// Load the GLB model
const loader = new GLTFLoader();
loader.load('/front-page-orb/orb.glb', function(gltf) {
    gltf.scene.scale.set(20, 20, 11);  // Scale up the model
    scene.add(gltf.scene);
    loadedGltf = gltf; // Store the loaded model in the higher scope variable
    animate();
}, undefined, function(error) {
    console.error('Error loading the model:', error);
});

// Adjust renderer size based on its container
function onWindowResize() {
    const width = document.getElementById('model-container').clientWidth;
    const height = document.getElementById('model-container').clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize, false);

// Position the camera
camera.position.set(0, 0, 3); // Adjust camera position
camera.position.z = 2;  

function animate() {
    requestAnimationFrame(animate);

    // Rotate the model if it's loaded
    if (loadedGltf && loadedGltf.scene) {
        loadedGltf.scene.rotation.y += 0.0021;
    }

    renderer.render(scene, camera); // Render the scene from the perspective of the camera
}

// Ensure the renderer size matches the container initially
onWindowResize();
animate(); // Start the animation loop
