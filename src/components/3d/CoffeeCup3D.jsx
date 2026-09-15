import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CoffeeCup3D({ cupColor = '#ffffff', liquidColor = '#d97706', foamColor = '#fef3c7' }) {
  const containerRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.35, 9.6);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    container.appendChild(renderer.domElement);

    // Master Group containing the entire scene
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // --- MATERIALS ---
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xdfa67b,
      roughness: 0.5,
      metalness: 0.05
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x231812,
      roughness: 0.88,
      metalness: 0.05
    });

    const capMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.85,
      metalness: 0.1
    });

    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.75,
      metalness: 0.05
    });

    const apronMat = new THREE.MeshStandardMaterial({
      color: 0x3e2723, // Espresso leather apron
      roughness: 0.58,
      metalness: 0.15
    });

    const strapMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.5,
      metalness: 0.15
    });

    const pantsMat = new THREE.MeshStandardMaterial({
      color: 0x1e2229,
      roughness: 0.85,
      metalness: 0.05
    });

    const shoesMat = new THREE.MeshStandardMaterial({
      color: 0x1f140e,
      roughness: 0.35,
      metalness: 0.25
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Polished amber brass kettle
      roughness: 0.18,
      metalness: 0.92
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.15,
      metalness: 0.9
    });

    const ceramicCupMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(cupColor),
      roughness: 0.12,
      metalness: 0.15
    });

    const teaLiquidMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(liquidColor),
      emissive: new THREE.Color(liquidColor),
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.92,
      roughness: 0.12,
      metalness: 0.05,
      transmission: 0.45
    });

    const counterWoodMat = new THREE.MeshStandardMaterial({
      color: 0x271911,
      roughness: 0.38,
      metalness: 0.15
    });

    // --- 2. ARTISANAL TEA BAR COUNTER ---
    const counterGeo = new THREE.BoxGeometry(7.2, 0.4, 3.4);
    const counterMesh = new THREE.Mesh(counterGeo, counterWoodMat);
    counterMesh.position.set(0, -2.4, 0.4);
    counterMesh.receiveShadow = true;
    masterGroup.add(counterMesh);

    // Counter Brass Trim Edge
    const trimGeo = new THREE.BoxGeometry(7.3, 0.06, 0.06);
    const trimMesh = new THREE.Mesh(trimGeo, goldMat);
    trimMesh.position.set(0, -2.18, 2.1);
    masterGroup.add(trimMesh);

    // --- 3. STANDING TEA MASTER MAN MODEL ---
    const manGroup = new THREE.Group();
    manGroup.position.set(0.15, 0, -0.6);
    masterGroup.add(manGroup);

    // A. Standing Legs & Shoes
    const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 2.4, 18), pantsMat);
    legL.position.set(-0.55, -2.4, -0.2);
    manGroup.add(legL);

    const legR = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 2.4, 18), pantsMat);
    legR.position.set(0.55, -2.4, -0.2);
    manGroup.add(legR);

    const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.8), shoesMat);
    shoeL.position.set(-0.55, -3.55, 0.05);
    manGroup.add(shoeL);

    const shoeR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.8), shoesMat);
    shoeR.position.set(0.55, -3.55, 0.05);
    manGroup.add(shoeR);

    // B. Waist & Belt
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.96, 0.94, 0.22, 24), strapMat);
    belt.position.set(0, -1.15, -0.15);
    manGroup.add(belt);

    const beltBuckle = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 0.08), goldMat);
    beltBuckle.position.set(0, -1.15, 0.82);
    manGroup.add(beltBuckle);

    // C. Torso & Linen Barista Shirt
    const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.95, 2.3, 24), shirtMat);
    torsoMesh.position.set(0, 0.05, -0.15);
    torsoMesh.castShadow = true;
    manGroup.add(torsoMesh);

    // D. Full Barista Leather Apron (Front, Chest & Pocket)
    const apronGeo = new THREE.CylinderGeometry(1.18, 0.98, 2.6, 24, 1, false, -Math.PI * 0.42, Math.PI * 0.84);
    const apronMesh = new THREE.Mesh(apronGeo, apronMat);
    apronMesh.position.set(0, -0.2, -0.12);
    apronMesh.castShadow = true;
    manGroup.add(apronMesh);

    // Leather Apron Pocket with Tea Spoon
    const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.48, 0.08), apronMat);
    pocket.position.set(0, -0.05, 1.05);
    manGroup.add(pocket);

    const teaSpoon = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.5, 10), goldMat);
    teaSpoon.position.set(0.2, 0.22, 1.08);
    teaSpoon.rotation.z = -0.25;
    manGroup.add(teaSpoon);

    // Apron Leather Straps
    const strapL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.5, 0.04), strapMat);
    strapL.position.set(-0.45, 0.45, 0.98);
    strapL.rotation.z = -0.15;
    manGroup.add(strapL);

    const strapR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.5, 0.04), strapMat);
    strapR.position.set(0.45, 0.45, 0.98);
    strapR.rotation.z = 0.15;
    manGroup.add(strapR);

    // E. Neck, Collar & Realistic Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.85, 0.05);
    headGroup.rotation.x = 0.32; // Focused on making tea

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 0.7, 20), skinMat);
    neck.position.y = -0.6;
    headGroup.add(neck);

    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.08, 12, 24), shirtMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = -0.85;
    headGroup.add(collar);

    // Head Base
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.66, 24, 24), skinMat);
    head.scale.set(0.92, 1.1, 0.95);
    head.castShadow = true;
    headGroup.add(head);

    // Nose
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.26, 12), skinMat);
    nose.rotation.x = -Math.PI / 2.3;
    nose.position.set(0, 0.02, 0.66);
    headGroup.add(nose);

    // Eyes focused on the tea pour
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), eyeMat);
    leftEye.position.set(-0.2, 0.16, 0.56);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), eyeMat);
    rightEye.position.set(0.2, 0.16, 0.56);
    headGroup.add(rightEye);

    // Eyebrows
    const browL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.04), hairMat);
    browL.position.set(-0.2, 0.25, 0.6);
    browL.rotation.z = -0.15;
    headGroup.add(browL);

    const browR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.04), hairMat);
    browR.position.set(0.2, 0.25, 0.6);
    browR.rotation.z = 0.15;
    headGroup.add(browR);

    // Trimmed Beard & Mustache
    const mustache = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.045, 12, 20, Math.PI), hairMat);
    mustache.position.set(0, -0.14, 0.62);
    headGroup.add(mustache);

    const beard = new THREE.Mesh(new THREE.SphereGeometry(0.46, 16, 16, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55), hairMat);
    beard.position.set(0, -0.26, 0.18);
    beard.scale.set(0.85, 0.8, 0.95);
    headGroup.add(beard);

    // Artisan Barista Cap
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.7, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.52), capMat);
    cap.position.set(0, 0.32, -0.05);
    cap.scale.set(1.05, 0.55, 1.15);
    cap.rotation.x = -0.12;
    headGroup.add(cap);

    const capBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.74, 0.74, 0.06, 24, 1, false, -Math.PI * 0.35, Math.PI * 0.7), capMat);
    capBrim.position.set(0, 0.35, 0.38);
    capBrim.rotation.x = 0.22;
    headGroup.add(capBrim);

    manGroup.add(headGroup);

    // F. Left Arm & Hand (Actively Holding and Steadying the Cup & Saucer on Table)
    const leftArm = new THREE.Group();
    const shoulderL = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), shirtMat);
    shoulderL.position.set(-1.25, 1.0, 0);
    leftArm.add(shoulderL);

    const bicepL = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.22, 1.35, 16), shirtMat);
    bicepL.position.set(-1.42, 0.32, 0.45);
    bicepL.rotation.set(0.7, 0.15, 0.4);
    leftArm.add(bicepL);

    const forearmL = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 1.35, 16), skinMat);
    forearmL.position.set(-1.18, -0.72, 1.15);
    forearmL.rotation.set(1.28, -0.25, 0.55);
    leftArm.add(forearmL);

    const cuffL = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 12, 16), shirtMat);
    cuffL.position.set(-1.3, -0.2, 0.85);
    cuffL.rotation.set(1.28, -0.25, 0.55);
    leftArm.add(cuffL);

    // Left Hand gripping and steadying the saucer/cup
    const leftHandGroup = new THREE.Group();
    leftHandGroup.position.set(-0.95, -1.82, 1.6);
    leftHandGroup.rotation.set(0.15, 0.45, 0.2);

    const handPalm = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.15, 0.45), skinMat);
    leftHandGroup.add(handPalm);

    // Left fingers holding the saucer rim
    for (let f = 0; f < 4; f++) {
      const finger = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.45, 10), skinMat);
      finger.rotation.z = -Math.PI / 2.5;
      finger.rotation.y = 0.12 * (f - 1.5);
      finger.position.set(0.26, -0.04, (f - 1.5) * 0.12);
      leftHandGroup.add(finger);
    }
    // Thumb resting on top of saucer rim
    const thumb = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.32, 10), skinMat);
    thumb.position.set(0.1, 0.12, -0.2);
    thumb.rotation.set(-0.3, 0.4, 0.5);
    leftHandGroup.add(thumb);

    leftArm.add(leftHandGroup);
    manGroup.add(leftArm);

    // G. Right Arm & Hand (Holding Frothing Pitcher)
    const rightArm = new THREE.Group();
    const shoulderR = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), shirtMat);
    shoulderR.position.set(1.35, 1.0, 0);
    rightArm.add(shoulderR);

    const bicepR = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.20, 1.2, 16), shirtMat);
    bicepR.position.set(1.48, 0.48, 0.4);
    bicepR.rotation.set(0.45, -0.15, -0.45);
    rightArm.add(bicepR);

    const forearmR = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.15, 1.15, 16), skinMat);
    forearmR.position.set(1.25, -0.18, 1.05);
    forearmR.rotation.set(1.05, 0.2, -0.55);
    rightArm.add(forearmR);

    const cuffR = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.05, 12, 16), shirtMat);
    cuffR.position.set(1.38, 0.12, 0.75);
    cuffR.rotation.set(1.05, 0.2, -0.55);
    rightArm.add(cuffR);

    manGroup.add(rightArm);

    // --- 4. ARTISANAL MILK FROTHING PITCHER & POURING ACTION ---
    const kettleGroup = new THREE.Group();
    // Default resting position (above cup)
    kettleGroup.position.set(0.75, 0.55, 1.55);
    kettleGroup.rotation.set(0.1, -0.2, -0.15); // Resting upright angle

    // Hand gripping pitcher handle
    const handR = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.32, 0.30), skinMat);
    handR.position.set(0.48, 0.05, 0);
    kettleGroup.add(handR);

    // Polished Stainless Steel Frothing Pitcher Body (Tapered Cylinder)
    const pitcherBodyGeo = new THREE.CylinderGeometry(0.38, 0.52, 1.15, 32);
    const pitcherBody = new THREE.Mesh(pitcherBodyGeo, brassMat);
    pitcherBody.castShadow = true;
    kettleGroup.add(pitcherBody);

    // Pitcher Pouring Spout
    const spoutGeo = new THREE.ConeGeometry(0.20, 0.38, 16);
    const spoutMesh = new THREE.Mesh(spoutGeo, brassMat);
    spoutMesh.rotation.z = Math.PI / 2.7;
    spoutMesh.position.set(-0.40, 0.42, 0);
    kettleGroup.add(spoutMesh);

    // Pitcher Handle
    const pHandleGeo = new THREE.TorusGeometry(0.32, 0.065, 16, 24, Math.PI * 1.25);
    const pHandle = new THREE.Mesh(pHandleGeo, brassMat);
    pHandle.rotation.z = -Math.PI / 2;
    pHandle.position.set(0.50, 0.02, 0);
    kettleGroup.add(pHandle);

    manGroup.add(kettleGroup);

    // --- 5. ARTISAN CERAMIC CAPPUCCINO BOWL & SAUCER ON COUNTER ---
    const teaCupGroup = new THREE.Group();
    teaCupGroup.position.set(-0.35, -1.9, 1.55);
    masterGroup.add(teaCupGroup);

    // Ceramic Saucer with Golden Rim
    const saucer = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.0, 0.12, 36), ceramicCupMat);
    saucer.position.y = 0.05;
    saucer.castShadow = true;
    saucer.receiveShadow = true;
    teaCupGroup.add(saucer);

    const saucerGoldTrim = new THREE.Mesh(new THREE.TorusGeometry(1.39, 0.025, 12, 36), goldMat);
    saucerGoldTrim.rotation.x = Math.PI / 2;
    saucerGoldTrim.position.y = 0.11;
    teaCupGroup.add(saucerGoldTrim);

    // Cappuccino Bowl (Wide-Brim Ceramic Cup)
    const bowlGeo = new THREE.CylinderGeometry(0.98, 0.62, 1.05, 36, 1, true);
    const bowlMesh = new THREE.Mesh(bowlGeo, ceramicCupMat);
    bowlMesh.position.y = 0.6;
    bowlMesh.castShadow = true;
    teaCupGroup.add(bowlMesh);

    // Bowl Base
    const bowlBaseMesh = new THREE.Mesh(new THREE.CircleGeometry(0.62, 36), ceramicCupMat);
    bowlBaseMesh.rotation.x = Math.PI / 2;
    bowlBaseMesh.position.y = 0.08;
    teaCupGroup.add(bowlBaseMesh);

    // Golden Bowl Top Rim Trim
    const bowlGoldRim = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.03, 12, 36), goldMat);
    bowlGoldRim.rotation.x = Math.PI / 2;
    bowlGoldRim.position.y = 1.12;
    teaCupGroup.add(bowlGoldRim);

    // Curved Ceramic Bowl Handle
    const bowlHandleGeo = new THREE.TorusGeometry(0.38, 0.075, 16, 24, Math.PI * 1.15);
    const bowlHandle = new THREE.Mesh(bowlHandleGeo, ceramicCupMat);
    bowlHandle.position.set(-0.95, 0.6, 0);
    bowlHandle.rotation.z = Math.PI / 2.2;
    bowlHandle.castShadow = true;
    teaCupGroup.add(bowlHandle);

    // Cappuccino Crema Surface with Detailed Latte Art Canvas Texture
    const latteCanvas = document.createElement('canvas');
    latteCanvas.width = 512;
    latteCanvas.height = 512;
    const lCtx = latteCanvas.getContext('2d');

    // Rich espresso crema radial gradient
    const cremaGrad = lCtx.createRadialGradient(256, 256, 20, 256, 256, 256);
    cremaGrad.addColorStop(0, '#fef3c7'); // Velvety foam center
    cremaGrad.addColorStop(0.3, '#d97706'); // Golden roast crema
    cremaGrad.addColorStop(0.7, '#78350f'); // Dark hazelnut espresso
    cremaGrad.addColorStop(1, '#3d1d11'); // Dark roast ring
    lCtx.fillStyle = cremaGrad;
    lCtx.fillRect(0, 0, 512, 512);

    // Micro-foam Latte Art Heart / Rosetta in center
    lCtx.fillStyle = '#fffbeb';
    lCtx.beginPath();
    lCtx.arc(256, 215, 65, 0, Math.PI * 2);
    lCtx.fill();

    lCtx.beginPath();
    lCtx.moveTo(256, 325);
    lCtx.bezierCurveTo(180, 255, 140, 175, 205, 130);
    lCtx.bezierCurveTo(256, 100, 256, 160, 256, 160);
    lCtx.bezierCurveTo(256, 160, 256, 100, 307, 130);
    lCtx.bezierCurveTo(372, 175, 332, 255, 256, 325);
    lCtx.fill();

    [370, 400, 430].forEach((y, i) => {
      lCtx.beginPath();
      lCtx.arc(256, y, 16 - i * 4, 0, Math.PI * 2);
      lCtx.fill();
    });

    const latteArtTex = new THREE.CanvasTexture(latteCanvas);
    const cappuccinoLiquidMat = new THREE.MeshStandardMaterial({
      map: latteArtTex,
      roughness: 0.28,
      metalness: 0.08
    });

    const cappuccinoSurface = new THREE.Mesh(new THREE.CircleGeometry(0.92, 36), cappuccinoLiquidMat);
    cappuccinoSurface.rotation.x = -Math.PI / 2;
    cappuccinoSurface.position.y = 1.05;
    teaCupGroup.add(cappuccinoSurface);

    // --- 6. SILKY STEAMED MILK POUR STREAM ---
    const milkMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfffbeb,
      emissiveIntensity: 0.45,
      roughness: 0.15
    });

    // Milk stream geometry from hovering pitcher spout down to the cappuccino crema
    const streamCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.18, 0.05, 1.55),  // Spout exit (above cup)
      new THREE.Vector3(-0.08, -0.42, 1.55), // Mid-air stream
      new THREE.Vector3(-0.35, -0.85, 1.55)  // Impact cleanly into cappuccino crema
    ]);
    const streamGeo = new THREE.TubeGeometry(streamCurve, 24, 0.042, 12, false);
    const milkStreamMesh = new THREE.Mesh(streamGeo, milkMat);
    milkStreamMesh.visible = false;
    masterGroup.add(milkStreamMesh);

    // --- 7. DYNAMIC STEAM VORTEX PARTICLES ---
    const steamCount = 65;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamSpeeds = [];

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = -0.35 + (Math.random() - 0.5) * 0.8;
      steamPositions[i * 3 + 1] = -0.8 + Math.random() * 2.8;
      steamPositions[i * 3 + 2] = 1.55 + (Math.random() - 0.5) * 0.8;
      steamSpeeds.push({
        vx: (Math.random() - 0.5) * 0.006,
        vy: 0.015 + Math.random() * 0.018,
        vz: (Math.random() - 0.5) * 0.006,
        spiralSpeed: 1.8 + Math.random() * 2.0,
        initY: -0.8
      });
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const sCanvas = document.createElement('canvas');
    sCanvas.width = 64;
    sCanvas.height = 64;
    const sCtx = sCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sGrad.addColorStop(0, 'rgba(255, 245, 235, 0.7)');
    sGrad.addColorStop(0.5, 'rgba(251, 191, 36, 0.25)');
    sGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);
    const steamTex = new THREE.CanvasTexture(sCanvas);

    const steamMat = new THREE.PointsMaterial({
      size: 0.45,
      map: steamTex,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    masterGroup.add(steamParticles);

    // --- 8. LIGHTING SETUP ---
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.5);
    scene.add(ambientLight);

    const warmSpotLight = new THREE.SpotLight(0xfef3c7, 3.8, 25, Math.PI / 4, 0.4, 1.2);
    warmSpotLight.position.set(4, 7, 5);
    warmSpotLight.castShadow = true;
    scene.add(warmSpotLight);

    const rimLight = new THREE.PointLight(0xf43f5e, 2.8, 16);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const amberFillLight = new THREE.PointLight(0xd97706, 2.2, 12);
    amberFillLight.position.set(0, -1, 3.5);
    scene.add(amberFillLight);

    // --- 9. INTERACTIVE CONTROLS & ANIMATION LOOP ---
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let dragRotationX = 0;
    let dragRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        // Clamp Y rotation strictly within 180 degrees (-90deg to +90deg)
        dragRotationY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, dragRotationY + deltaX * 0.008));
        // Clamp X tilt slightly to prevent flipping
        dragRotationX = Math.max(-0.05, Math.min(0.05, dragRotationX + deltaY * 0.002));
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // 5-SECOND POURING & 3-SECOND WAITING CYCLE (Total 8.0s Cycle)
      const cycleTime = elapsedTime % 8.0;
      const isPouring = cycleTime < 5.0;

      // Smooth pourProgress factor (0.0 = resting high, 1.0 = lowered close & pouring)
      let pourProgress = 0;
      if (cycleTime < 0.8) {
        // Lowering down smoothly into pour position (0s to 0.8s)
        pourProgress = cycleTime / 0.8;
      } else if (cycleTime <= 4.2) {
        // Fully lowered and pouring latte art (0.8s to 4.2s)
        pourProgress = 1.0;
      } else if (cycleTime < 5.0) {
        // Lifting back up to rest (4.2s to 5.0s)
        pourProgress = (5.0 - cycleTime) / 0.8;
      } else {
        // Waiting / Resting (5.0s to 8.0s)
        pourProgress = 0.0;
      }

      // 1. PITCHER POSITION: Hovers above the cup rim while pouring
      // Resting high: Y = 0.55, X = 0.75, Z_tilt = -0.15
      // Lowered pour: Y = 0.15, X = 0.55, Z_tilt = -0.58 (strictly above the cup rim at Y = -0.78)
      const pourOsc = isPouring ? Math.sin(elapsedTime * 3.0) * 0.03 : 0;
      
      const targetKettleX = 0.75 - pourProgress * 0.20;
      const targetKettleY = 0.55 - pourProgress * 0.40; // Cleanly hovers above the cup rim!
      const targetTiltZ = -0.15 - pourProgress * 0.45 + pourOsc;

      kettleGroup.position.x += (targetKettleX - kettleGroup.position.x) * 0.12;
      kettleGroup.position.y += (targetKettleY - kettleGroup.position.y) * 0.12;
      kettleGroup.rotation.z += (targetTiltZ - kettleGroup.rotation.z) * 0.12;

      // 2. RIGHT ARM FOLLOWS PITCHER NATURALLY
      rightArm.position.y = -pourProgress * 0.15;
      rightArm.position.x = -pourProgress * 0.08;

      // 3. MILK STREAM VISIBILITY & SCALE
      milkStreamMesh.visible = pourProgress > 0.12;
      milkStreamMesh.scale.set(pourProgress, pourProgress, pourProgress);

      // 4. STEAM INTENSITY
      steamMat.opacity = 0.25 + pourProgress * 0.45;

      // Subtle natural breathing & weight shift of standing barista
      manGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.025;

      // AUTOMATIC SMOOTH CIRCULAR MOTION (Circular orbit trajectory in 3D space)
      const circleSpeed = 0.75;
      const circleRadius = 0.32;
      masterGroup.position.x = Math.sin(elapsedTime * circleSpeed) * circleRadius;
      masterGroup.position.z = (Math.cos(elapsedTime * circleSpeed) - 1.0) * circleRadius * 0.6;
      masterGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.05;

      // Automatic circular yaw & pitch panning
      const autoCircleYaw = Math.sin(elapsedTime * circleSpeed) * 0.42; // Circular left-right glide
      const autoCirclePitch = Math.cos(elapsedTime * circleSpeed) * 0.035;

      const rawTargetY = autoCircleYaw + dragRotationY + mouseX * 0.35;
      const clampedTargetY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rawTargetY)); // Keep within 180°
      const clampedTargetX = Math.max(-0.06, Math.min(0.06, autoCirclePitch + dragRotationX - mouseY * 0.06));

      masterGroup.rotation.y += (clampedTargetY - masterGroup.rotation.y) * 0.06;
      masterGroup.rotation.x += (clampedTargetX - masterGroup.rotation.x) * 0.06;

      // Dynamic Steam Simulation
      const positions = steamGeo.attributes.position.array;
      const speedMultiplier = isPouring ? 1.0 : 0.4;
      for (let i = 0; i < steamCount; i++) {
        const sp = steamSpeeds[i];
        positions[i * 3 + 1] += sp.vy * speedMultiplier;
        positions[i * 3] += (sp.vx + Math.sin(elapsedTime * sp.spiralSpeed + i) * 0.004) * speedMultiplier;
        positions[i * 3 + 2] += (sp.vz + Math.cos(elapsedTime * sp.spiralSpeed + i) * 0.004) * speedMultiplier;

        if (positions[i * 3 + 1] > 2.8) {
          positions[i * 3 + 1] = sp.initY;
          positions[i * 3] = -0.35 + (Math.random() - 0.5) * 0.6;
          positions[i * 3 + 2] = 1.55 + (Math.random() - 0.5) * 0.6;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [cupColor, liquidColor, foamColor]);

  return (
    <div
      ref={containerRef}
      onClick={() => setClickCount(c => c + 1)}
      className="w-full h-full min-h-[420px] md:min-h-[520px] relative cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
    />
  );
}


