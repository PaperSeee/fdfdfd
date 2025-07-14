// three-scene.js
let renderer, scene, camera, centralMesh, particles, animationId;

function createCentralMaterial(mode) {
  // Couleurs très claires, effet glass/holo, glow accentué
  return new THREE.MeshPhysicalMaterial({
    color: [0xffffff, 0xf8f8ff, 0xe0e0ff][mode],
    metalness: 0.95,
    roughness: 0.04,
    transmission: 0.98,
    thickness: 1.5,
    transparent: true,
    opacity: 0.98,
    clearcoat: 1,
    clearcoatRoughness: 0.01,
    ior: 1.6,
    reflectivity: 0.9,
    wireframe: true,
    sheen: 1,
    sheenColor: 0xffffff,
    sheenRoughness: 0.1
  });
}

function initThreeScene() {
  const container = document.getElementById('three-container');
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x0A0A0A, 0);
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.set(0, 0, 5);

  // Lumière directionnelle douce pour ombres
  const light = new THREE.DirectionalLight(0xffffff, 0.7);
  light.position.set(2, 4, 6);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  // Sphère géodésique wireframe avec effet glassmorphism
  const geometry = new THREE.IcosahedronGeometry(0.9, 2);
  const material = createCentralMaterial(0);
  centralMesh = new THREE.Mesh(geometry, material);
  centralMesh.castShadow = true;
  scene.add(centralMesh);

  // Halo lumineux doux
  const haloGeometry = new THREE.RingGeometry(1.05, 1.35, 64);
  const haloMaterial = new THREE.MeshBasicMaterial({ color: 0xFAFAFA, side: THREE.DoubleSide, transparent: true, opacity: 0.18 });
  const halo = new THREE.Mesh(haloGeometry, haloMaterial);
  halo.position.z = -0.2;
  halo.rotation.x = Math.PI / 2;
  centralMesh.add(halo);

  // Particules flottantes
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 120;
  const posArray = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 4.5;
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({ color: 0xFAFAFA, size: 0.045, opacity: 0.7, transparent: true });
  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  // Ombre dynamique (plane flou sous l'objet)
  const shadowGeometry = new THREE.PlaneGeometry(2.5, 2.5);
  const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.18 });
  const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadowMesh.position.y = -1.3;
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.receiveShadow = true;
  scene.add(shadowMesh);

  // Animation idle
  animate();

  // Responsive
  // Adapter la taille sur mobile
  function resizeCentral() {
    const container = document.getElementById('three-container');
    if (!container) return;
    let size = 320;
    if (window.innerWidth < 900) size = 180;
    if (window.innerWidth < 700) size = 120;
    renderer.setSize(size, size);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resizeCentral);
  resizeCentral();

  // Effet glow au survol/clic (plus marqué)
  renderer.domElement.addEventListener('pointerover', () => {
    gsap.to(centralMesh.material, { opacity: 1, duration: 0.2 });
    gsap.to(halo.material, { opacity: 0.5, duration: 0.2 });
    // bgCircle.material is removed, so this part is removed or commented out
  });
  renderer.domElement.addEventListener('pointerout', () => {
    gsap.to(centralMesh.material, { opacity: 0.98, duration: 0.2 });
    gsap.to(halo.material, { opacity: 0.32, duration: 0.2 });
    // bgCircle.material is removed, so this part is removed or commented out
  });
}

function animate() {
  animationId = requestAnimationFrame(animate);
  centralMesh.rotation.x += 0.004;
  centralMesh.rotation.y += 0.008;
  // Particules flottantes idle
  const positions = particles.geometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.0003;
  }
  particles.geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}

function onWindowResize() {
  const container = document.getElementById('three-container');
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

let currentMode = 0; // 0: Vitrine, 1: E-commerce, 2: SaaS
const MODES = [
  { name: 'Vitrine', geometry: () => new THREE.IcosahedronGeometry(1.2, 2) },
  { name: 'E-commerce', geometry: () => new THREE.BoxGeometry(1.5, 1.5, 1.5) },
  { name: 'SaaS', geometry: () => new THREE.TorusGeometry(1, 0.38, 32, 100) }
];

function morphCentralObject(nextMode) {
  // Explosion de particules
  gsap.to(particles.material, { size: 0.18, opacity: 0.2, duration: 0.3, yoyo: true, repeat: 1, onComplete: () => {
    // Implosion après morph
    gsap.to(particles.material, { size: 0.045, opacity: 0.7, duration: 0.4 });
  }});
  // Morphing de la géométrie et du matériau (taille adaptée)
  const newGeometry = MODES[nextMode].geometry();
  const newMaterial = createCentralMaterial(nextMode);
  gsap.to(centralMesh.scale, { x: 0.18, y: 0.18, z: 0.18, duration: 0.22, onComplete: () => {
    centralMesh.geometry.dispose();
    centralMesh.geometry = newGeometry;
    centralMesh.material.dispose();
    centralMesh.material = newMaterial;
    gsap.to(centralMesh.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'expo.out' });
  }});
  // Animation de couleur wireframe selon le mode
  const colors = [0xffffff, 0xC0C0C0, 0xFAFAFA];
  gsap.to(centralMesh.material, { colorProps: { color: colors[nextMode] }, duration: 0.5 });
  // Changement de contenu dynamique
  updateDynamicContent(nextMode);
}

function updateDynamicContent(mode) {
  const content = document.getElementById('dynamic-content');
  if (!content) return;
  if (mode === 0) {
    content.innerHTML = `
      <h1 class="typewriter">Site Vitrine</h1>
      <p class="slogan">L’élégance au service de votre image.</p>
      <div class="valeurs">
        <div>✨ Impact visuel</div>
        <div>🚀 Performance</div>
        <div>🎨 Créativité</div>
      </div>
      <div class="parallax-img"></div>
    `;
  } else if (mode === 1) {
    content.innerHTML = `
      <h1>E-commerce</h1>
      <div class="product-grid">
        <div class="product"><img src="https://placehold.co/120x120"/><div>Produit 1</div><div>29€</div><button>Acheter</button></div>
        <div class="product"><img src="https://placehold.co/120x120"/><div>Produit 2</div><div>49€</div><button>Acheter</button></div>
        <div class="product"><img src="https://placehold.co/120x120"/><div>Produit 3</div><div>19€</div><button>Acheter</button></div>
      </div>
    `;
  } else if (mode === 2) {
    content.innerHTML = `
      <h1>SaaS</h1>
      <ul class="features">
        <li>🔒 Sécurité avancée</li>
        <li>⚡ Rapidité</li>
        <li>📈 Scalabilité</li>
      </ul>
      <div class="testimonials">“Incroyable !” – Client A</div>
      <button class="cta">Essayer</button>
    `;
  }
}

function handleCentralObjectClick() {
  currentMode = (currentMode + 1) % 3;
  morphCentralObject(currentMode);
}

window.addEventListener('DOMContentLoaded', () => {
  // Attendre que le loader disparaisse
  const check = setInterval(() => {
    if (document.getElementById('main-content').style.display !== 'none') {
      clearInterval(check);
      initThreeScene();
      // Ajout de l'event listener pour le morphing
      setTimeout(() => {
        renderer.domElement.addEventListener('click', handleCentralObjectClick);
        renderer.domElement.addEventListener('touchend', handleCentralObjectClick);
        updateDynamicContent(0);
      }, 400);
    }
  }, 100);
}); 