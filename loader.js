// Loader 3D avec Three.js
let loaderRenderer, loaderScene, loaderCamera, loaderMesh, loaderFrame = 0;
const loaderCanvas = document.getElementById('loader-canvas');
const progressBar = document.getElementById('progress');
const loaderContainer = document.getElementById('loader-container');
const loaderText = document.getElementById('loader-text');

// Préparation du LoadingManager
let loadingManager;
let assetsLoaded = false;

function initLoader3D() {
  loaderRenderer = new THREE.WebGLRenderer({ canvas: loaderCanvas, alpha: true, antialias: true });
  loaderRenderer.setClearColor(0x0A0A0A, 0);
  loaderRenderer.setSize(120, 120, false);
  loaderScene = new THREE.Scene();
  loaderCamera = new THREE.PerspectiveCamera(40, 1, 0.1, 10);
  loaderCamera.position.z = 3.5;
  // Géodésique wireframe
  const geometry = new THREE.IcosahedronGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xC0C0C0, wireframe: true, opacity: 0.7, transparent: true });
  loaderMesh = new THREE.Mesh(geometry, material);
  loaderScene.add(loaderMesh);
  // Particules convergentes (Points)
  const particles = new THREE.Points(
    new THREE.IcosahedronGeometry(1.2, 2),
    new THREE.PointsMaterial({ color: 0xFAFAFA, size: 0.04, transparent: true, opacity: 0.7 })
  );
  loaderScene.add(particles);
}

function animateLoader() {
  loaderFrame++;
  loaderMesh.rotation.x += 0.012;
  loaderMesh.rotation.y += 0.018;
  loaderRenderer.render(loaderScene, loaderCamera);
  if (loaderContainer.style.display !== 'none') {
    requestAnimationFrame(animateLoader);
  }
}

function setLoaderProgress(p) {
  progressBar.style.width = `${Math.floor(p * 100)}%`;
  loaderText.textContent = p < 1 ? `Chargement... ${Math.floor(p*100)}%` : 'Prêt !';
}

function explosionLoader(callback) {
  // Animation d'explosion du loader (GSAP)
  gsap.to(loaderMesh.scale, { x: 2.5, y: 2.5, z: 2.5, duration: 0.5, ease: 'expo.in', onComplete: () => {
    gsap.to(loaderContainer, { opacity: 0, duration: 0.8, delay: 0.1, onComplete: () => {
      loaderContainer.style.display = 'none';
      document.getElementById('main-content').style.display = '';
      if (callback) callback();
    }});
  }});
  gsap.to(loaderMesh.material, { opacity: 0, duration: 0.5, delay: 0.3 });
}

function startLoadingAssets() {
  loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    setLoaderProgress(0);
  };
  loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    setLoaderProgress(itemsLoaded / itemsTotal);
  };
  loadingManager.onLoad = function () {
    setLoaderProgress(1);
    assetsLoaded = true;
    setTimeout(() => explosionLoader(), 600);
  };
  loadingManager.onError = function (url) {
    loaderText.textContent = 'Erreur de chargement : ' + url;
  };

  // Exemple de préchargement d'assets (textures, modèles, sons)
  // Ici, on charge juste une texture de base pour la démo
  const textureLoader = new THREE.TextureLoader(loadingManager);
  textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg', () => {});
  // Tu peux ajouter d'autres assets ici
}

window.addEventListener('DOMContentLoaded', () => {
  initLoader3D();
  animateLoader();
  startLoadingAssets();
}); 