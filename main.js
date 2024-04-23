// Import the Three.js library

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';



// To allow for the camera to move around the scene
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

// To allow for importing the .gltf file

import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

// Import the RGBELoader module for HDR textures

import { RGBELoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene(); // This creates the scene

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Create new camera

let object; // This keeps the 3D object as a global variable

let controls; // Allow the camera to move around

let objToRender = 'ball'; // Set which object to render

// Instantiate a loader for the .gltf file

const loader = new GLTFLoader();

// It loads the file

const renderer = new THREE.WebGLRenderer({   
    antialias: true,  // Enable antialiasing for smoother edges
    alpha: false     // Alpha: false means the background is not transparent
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);  // THIS IS FOR THE CANVAS COLOR
renderer.setPixelRatio(window.devicePixelRatio);
// Add the renderer to the DOM
// Fixed typo in "container3D"

// Adding HDR environment
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

new RGBELoader()
    .setDataType(THREE.UnsignedByteType) // For HDR effect
    .load('models/car/MR_INT-001_NaturalStudio_NAD.hdr', function (texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        pmremGenerator.dispose();

        // Apply the environment map to the scene
        scene.environment = envMap;

        // Load the model
        loader.load(
             // If the file is loaded,w add it to the scene
            `models/${objToRender}/scene.gltf`,
            function (gltf) {
                object = gltf.scene;
                scene.add(object); // Added this line to actually add the loaded object to the scene
            },
            function (xhr) {
                // While it is loading, log the progress
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                // If there is an error log it
                console.error('An error happened', error);
            }
        );
    });

// Add the renderer to the DOM

document.getElementById("container3D").appendChild(renderer.domElement); // This is connected to the html div container.


// Set how far the camera will be from the 3D model

camera.position.z = 25;


// Add lights to the scene, so we can actually see the 3D model

const topLight = new THREE.DirectionalLight(0xffffff, 2); // {color, intensity}
topLight.position.set(500, 500, 500); // Top-left-ish
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

camera.position.z = 5; // This changes position of the object in the canvas
camera.position.y = 1;  // If you see a black screen, you need more light for the 3D model

// Render the scene

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);  // Added renderer.render call to actually render the scene
}

// Initialize OrbitControls

controls = new OrbitControls(camera, renderer.domElement);


// Add a listener to the window, so we can resize the window and the camera

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the 3D rendering

animate();
