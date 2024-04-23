import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
renderer.setSize(window.innerWidth, window.innerHeight); // Set size
document.getElementById('model-container').appendChild(renderer.domElement); // Append renderer to DOM

// Adjust renderer size based on its container
function onWindowResize() {
    const width = document.getElementById('model-container').clientWidth;
    const height = document.getElementById('model-container').clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize, false);

// Create a sphere geometry and material
const geometry = new THREE.SphereGeometry(1, 32, 32); // SphereGeometry(radius, widthSegments, heightSegments)
const material = new THREE.MeshBasicMaterial({color: 0x00ff00}); // Green color
const sphere = new THREE.Mesh(geometry, material);



scene.add(sphere); // Add sphere to the scene

// Position the camera
camera.position.z = 2;

// Ensure the renderer size matches the container initially
onWindowResize();

let hue = 0; // Variable to hold the current hue value

function animate() {
    requestAnimationFrame(animate);

    // Rotate the sphere
    sphere.rotation.y += 0.01;

    // Change the sphere's color
    hue += 0.5; // Increase the hue
    if (hue > 360) hue = 0; // Reset hue if it goes beyond 360
    material.color.setHSL(hue / 360, 1, 0.5); // Set color using HSL (Hue, Saturation, Lightness)

    renderer.render(scene, camera); // Render the scene from the perspective of the camera
}



animate(); // Start the animation loop
