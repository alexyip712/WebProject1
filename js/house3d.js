import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 2.8;
controls.maxDistance = 12;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.6;
controls.maxAzimuthAngle = 1.2;
controls.minAzimuthAngle = -1.2;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1.5, 0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(2000, 2000, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x85877e,
    side: THREE.DoubleSide
});

const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

const DLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
DLight.position.set(2,10,1);
DLight.target.position.set(0,0,0);
scene.add(DLight);

const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(10, 25, 10);
spotLight.castShadow = true;
spotLight.shadow.bias = 0;
scene.add(spotLight);

const spotLight2 = new THREE.SpotLight(0xffffff, 1000, 100, 0.22, 1);
spotLight2.position.set(-10, 25, -10);
spotLight2.castShadow = true;
spotLight2.shadow.bias = 1;
scene.add(spotLight2);

const spotLight3 = new THREE.SpotLight(0xffffff, 5000, 200, 0.22, 1);
spotLight3.position.set(10, 25, 60);
spotLight3.castShadow = true;
spotLight3.shadow.bias = 1;
scene.add(spotLight3);


const loader = new GLTFLoader().setPath('assets/a1/');
loader.load('A1.glb', (glb) => {
    console.log('loading model');
    const mesh = glb.scene;

    mesh.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    mesh.position.set(0, 0.0001, 0);
    scene.add(mesh);

    document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
    console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
    console.error(error);
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


animate();

