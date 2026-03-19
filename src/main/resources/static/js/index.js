import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';

const massRange = document.getElementById("massRange");
const massValue = document.getElementById("massValue");
const executeBtn = document.getElementById("executeBtn");
const result = document.getElementById("result");
const sceneContainer = document.getElementById("sceneContainer");

let animationId = null;
let currentRenderer = null;

massRange.addEventListener("input", () => {
    massValue.textContent = massRange.value;
});

executeBtn.addEventListener("click", async () => {
    const response = await fetch("/collapse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            coreSolarMass: parseFloat(massRange.value)
        })
    });

    if (!response.ok) {
        result.textContent = "Request failed";
        return;
    }

    const data = await response.json();

    result.textContent =
        data.remnantAfterCollapse + " | " + Number(data.remnantSolarMass).toFixed(2) + " M☉";

    const type = data.remnantAfterCollapse.toLowerCase();

    if (type.includes("black")) {
        renderBlackHole();
    } else if (type.includes("neutron")) {
        renderNeutronStar();
    } else {
        renderWhiteDwarf();
    }
});

function clearScene() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    if (currentRenderer) {
        currentRenderer.dispose();
        currentRenderer = null;
    }

    sceneContainer.innerHTML = "";
}

function createBaseScene() {
    clearScene();

    const width = sceneContainer.clientWidth || 1200;
    const height = sceneContainer.clientHeight || 800;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    sceneContainer.appendChild(renderer.domElement);
    currentRenderer = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 18, 100);
    pointLight.position.set(4, 4, 8);
    scene.add(pointLight);

    addStars(scene);

    return { scene, camera, renderer };
}

function addStars(scene) {
    const starCount = 3000;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
        const radius = 30 + Math.random() * 40;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 40;

        starPositions[i * 3] = Math.cos(angle) * radius;
        starPositions[i * 3 + 1] = height;
        starPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.12
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

function renderBlackHole() {
    const { scene, camera, renderer } = createBaseScene();

    const blackHoleGeometry = new THREE.SphereGeometry(3.5, 64, 64);
    const blackHoleMaterial = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
    scene.add(blackHole);

    const diskGeometry = new THREE.TorusGeometry(6.5, 1.0, 32, 180);
    const diskMaterial = new THREE.MeshStandardMaterial({
        color: 0xff9933,
        emissive: 0xff5500,
        emissiveIntensity: 2.2
    });
    const disk = new THREE.Mesh(diskGeometry, diskMaterial);
    disk.rotation.x = Math.PI / 2.8;
    disk.rotation.z = 0.3;
    scene.add(disk);

    const innerDiskGeometry = new THREE.TorusGeometry(5.0, 0.35, 16, 140);
    const innerDiskMaterial = new THREE.MeshStandardMaterial({
        color: 0xffdd99,
        emissive: 0xffaa33,
        emissiveIntensity: 3
    });
    const innerDisk = new THREE.Mesh(innerDiskGeometry, innerDiskMaterial);
    innerDisk.rotation.x = Math.PI / 2.8;
    innerDisk.rotation.z = 0.3;
    scene.add(innerDisk);

    const particleCount = 1600;
    const positions = new Float32Array(particleCount * 3);
    const particleData = [];

    for (let i = 0; i < particleCount; i++) {
        const radius = 7 + Math.random() * 5;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 0.5;

        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(angle) * radius;

        particleData.push({
            radius,
            angle,
            y,
            speed: 0.001 + Math.random() * 0.0015
        });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffbb66,
        size: 0.12
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 20;
    camera.position.y = 2;

    function animate() {
        animationId = requestAnimationFrame(animate);

        blackHole.rotation.y += 0.0003;
        disk.rotation.z += 0.001;
        innerDisk.rotation.z -= 0.0015;

        const arr = particleGeometry.attributes.position.array;

        for (let i = 0; i < particleCount; i++) {
            const p = particleData[i];
            p.angle += p.speed;
            p.radius -= 0.003;

            if (p.radius < 4.3) {
                p.radius = 8 + Math.random() * 4;
                p.angle = Math.random() * Math.PI * 2;
                p.y = (Math.random() - 0.5) * 0.5;
            }

            arr[i * 3] = Math.cos(p.angle) * p.radius;
            arr[i * 3 + 1] = p.y;
            arr[i * 3 + 2] = Math.sin(p.angle) * p.radius;
        }

        particleGeometry.attributes.position.needsUpdate = true;

        camera.position.x = Math.sin(Date.now() * 0.00008) * 1.2;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    animate();
}

function renderWhiteDwarf() {
    const { scene, camera, renderer } = createBaseScene();

    const geometry = new THREE.SphereGeometry(4.5, 64, 64);
    const material = new THREE.MeshStandardMaterial({
        color: 0xeaf4ff,
        emissive: 0xbfdfff,
        emissiveIntensity: 1.8
    });

    const star = new THREE.Mesh(geometry, material);
    scene.add(star);

    const glowGeometry = new THREE.SphereGeometry(5.4, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xddeeff,
        transparent: true,
        opacity: 0.14
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    camera.position.z = 16;

    function animate() {
        animationId = requestAnimationFrame(animate);

        star.rotation.y += 0.0008;
        glow.rotation.y -= 0.0005;

        const pulse = 1 + Math.sin(Date.now() * 0.001) * 0.02;
        glow.scale.set(pulse, pulse, pulse);

        renderer.render(scene, camera);
    }

    animate();
}

function renderNeutronStar() {
    const { scene, camera, renderer } = createBaseScene();

    const geometry = new THREE.SphereGeometry(4.0, 64, 64);
    const material = new THREE.MeshStandardMaterial({
        color: 0x88bbff,
        emissive: 0x3366ff,
        emissiveIntensity: 2.5
    });

    const star = new THREE.Mesh(geometry, material);
    scene.add(star);

    const ringGeometry = new THREE.TorusGeometry(6.0, 0.15, 16, 120);
    const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaccff,
        emissive: 0x66aaff,
        emissiveIntensity: 3
    });

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.1;
    scene.add(ring);

    const beamGeometry = new THREE.CylinderGeometry(0.15, 0.6, 14, 24);
    const beamMaterial = new THREE.MeshBasicMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.25
    });

    const beam1 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam1.position.y = 7;
    scene.add(beam1);

    const beam2 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam2.position.y = -7;
    beam2.rotation.z = Math.PI;
    scene.add(beam2);

    const system = new THREE.Group();
    system.add(star);
    system.add(ring);
    system.add(beam1);
    system.add(beam2);
    scene.add(system);

    camera.position.z = 17;

    function animate() {
        animationId = requestAnimationFrame(animate);

        system.rotation.y += 0.003;
        system.rotation.z += 0.0008;

        renderer.render(scene, camera);
    }

    animate();
}