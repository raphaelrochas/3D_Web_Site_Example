import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Création de la scène
const scene = new THREE.Scene()

// Chargement de la cubemap skybox (6 faces)
const loader = new THREE.CubeTextureLoader()
const cubeTexture = loader.load([
    './3D/sky_box/px.png',   // +X 
    './3D/sky_box/nx.png',   // -X 
    './3D/sky_box/py.png',   // +Y
    './3D/sky_box/ny.png',   // -Y 
    './3D/sky_box/pz.png',   // +Z 
    './3D/sky_box/nz.png'    // -Z 
])
scene.background = cubeTexture

// Caméra Perspective
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.01,
  50000
)
camera.position.set(100, 0, 50)
camera.lookAt(0, 0, 100)

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Contrôles orbitaux pour naviguer dans la scène
const controls = new OrbitControls(camera, renderer.domElement)

// Cube rouge
const geometry = new THREE.BoxGeometry(12, 50, 50)
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Éclairage ambiant
const ambientLight = new THREE.AmbientLight(0xffffff, 10)
scene.add(ambientLight)

// Animation / boucle de rendu
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()

// Ajustement du renderer et de la caméra à la taille de la fenêtre
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

