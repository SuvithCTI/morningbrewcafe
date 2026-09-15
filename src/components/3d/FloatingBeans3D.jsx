import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingBeans3D({ colorTheme = 'sunset' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 26;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Color palettes based on theme
    const themePalettes = {
      rosegold: {
        primary: 0xfb7185,
        secondary: 0xf59e0b,
        ambient: 0xfff1f2,
        spark: 'rgba(251, 113, 133, 1)',
        bean1: 0xe11d48,
        bean2: 0xfde047
      },
      sunset: {
        primary: 0xf59e0b,
        secondary: 0xf97316,
        ambient: 0xfff7ed,
        spark: 'rgba(251, 191, 36, 1)',
        bean1: 0xd97706,
        bean2: 0xfbbf24
      },
      matcha: {
        primary: 0x10b981,
        secondary: 0x06b6d4,
        ambient: 0xd1fae5,
        spark: 'rgba(52, 211, 153, 0.95)',
        bean1: 0x143525,
        bean2: 0x059669
      },
      berry: {
        primary: 0xec4899,
        secondary: 0x8b5cf6,
        ambient: 0xfce7f3,
        spark: 'rgba(244, 114, 182, 0.95)',
        bean1: 0x2e112d,
        bean2: 0xa855f7
      },
      cosmic: {
        primary: 0x38bdf8,
        secondary: 0xc084fc,
        ambient: 0xe0e7ff,
        spark: 'rgba(56, 189, 248, 0.95)',
        bean1: 0x121738,
        bean2: 0x6366f1
      },
      ocean: {
        primary: 0x06b6d4,
        secondary: 0x3b82f6,
        ambient: 0xcffafe,
        spark: 'rgba(34, 211, 238, 0.95)',
        bean1: 0x082f49,
        bean2: 0x0284c7
      },
      royal: {
        primary: 0xa855f7,
        secondary: 0xf43f5e,
        ambient: 0xfae8ff,
        spark: 'rgba(217, 70, 239, 0.95)',
        bean1: 0x3b0764,
        bean2: 0xc026d3
      },
      flame: {
        primary: 0xef4444,
        secondary: 0xf59e0b,
        ambient: 0xfee2e2,
        spark: 'rgba(239, 68, 68, 0.95)',
        bean1: 0x450a0a,
        bean2: 0xdc2626
      }
    };

    const cur = themePalettes[colorTheme] || themePalettes.sunset;

    // 1. DIVERSE 3D GEOMETRIES:
    // A. Coffee Bean Geometry
    const beanGeo = new THREE.SphereGeometry(0.55, 16, 16);
    beanGeo.scale(1.25, 0.75, 0.6);

    // B. Organic Coffee Leaf Geometry
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, -0.6);
    leafShape.quadraticCurveTo(0.4, 0, 0, 0.7);
    leafShape.quadraticCurveTo(-0.4, 0, 0, -0.6);
    const leafGeo = new THREE.ShapeGeometry(leafShape);
    leafGeo.scale(1.2, 1.2, 1.2);

    // C. Sugar Crystal Gem Geometry (Octahedron)
    const gemGeo = new THREE.OctahedronGeometry(0.4, 0);

    // Materials
    const darkBeanMat = new THREE.MeshStandardMaterial({
      color: cur.bean1,
      roughness: 0.3,
      metalness: 0.2,
    });

    const goldenBeanMat = new THREE.MeshStandardMaterial({
      color: cur.bean2,
      roughness: 0.2,
      metalness: 0.8,
      emissive: cur.primary,
      emissiveIntensity: 0.25,
    });

    const leafMat = new THREE.MeshStandardMaterial({
      color: cur.primary,
      roughness: 0.4,
      metalness: 0.3,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });

    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.8,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      ior: 1.5
    });

    // Spawn Particles
    const elements = [];
    const totalCount = 38;

    for (let i = 0; i < totalCount; i++) {
      let mesh;
      const type = i % 4; // 0: Dark Bean, 1: Golden Bean, 2: Coffee Leaf, 3: Crystal Gem

      if (type === 0) {
        mesh = new THREE.Mesh(beanGeo, darkBeanMat);
      } else if (type === 1) {
        mesh = new THREE.Mesh(beanGeo, goldenBeanMat);
      } else if (type === 2) {
        mesh = new THREE.Mesh(leafGeo, leafMat);
      } else {
        mesh = new THREE.Mesh(gemGeo, crystalMat);
      }

      mesh.position.set(
        (Math.random() - 0.5) * 36,
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 16
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      const scale = 0.5 + Math.random() * 0.8;
      mesh.scale.multiplyScalar(scale);

      scene.add(mesh);

      elements.push({
        mesh,
        type,
        baseX: mesh.position.x,
        baseY: mesh.position.y,
        baseZ: mesh.position.z,
        rotSpeedX: (Math.random() - 0.5) * 0.018,
        rotSpeedY: (Math.random() - 0.5) * 0.024,
        rotSpeedZ: (Math.random() - 0.5) * 0.015,
        floatFreq: 0.8 + Math.random() * 0.8,
        floatAmp: 0.8 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2
      });
    }

    // 2. Sparkling Glowing Firefly Dust
    const sparkCount = 70;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3] = (Math.random() - 0.5) * 44;
      sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 32;
      sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const sparkCanvas = document.createElement('canvas');
    sparkCanvas.width = 48;
    sparkCanvas.height = 48;
    const sCtx = sparkCanvas.getContext('2d');
    const radGrad = sCtx.createRadialGradient(24, 24, 0, 24, 24, 24);
    radGrad.addColorStop(0, cur.spark);
    radGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = radGrad;
    sCtx.fillRect(0, 0, 48, 48);

    const sparkTexture = new THREE.CanvasTexture(sparkCanvas);
    const sparkMat = new THREE.PointsMaterial({
      size: 0.75,
      map: sparkTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkPoints);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(cur.ambient, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(cur.primary, 2.5);
    dirLight.position.set(12, 18, 14);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(cur.secondary, 3.0, 35);
    pointLight.position.set(-12, -8, 8);
    scene.add(pointLight);

    // Mouse Tracking for dynamic interactive reaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      elements.forEach(item => {
        // Diverse custom rotation for each type
        if (item.type === 2) {
          // Leaf fluttering wave
          item.mesh.rotation.x = Math.sin(t * 1.5 + item.phase) * 0.6;
          item.mesh.rotation.y += item.rotSpeedY * 1.2;
          item.mesh.rotation.z = Math.cos(t * 1.2 + item.phase) * 0.4;
        } else if (item.type === 3) {
          // Gem fast shimmer spin
          item.mesh.rotation.x += item.rotSpeedX * 1.8;
          item.mesh.rotation.y += item.rotSpeedY * 1.8;
        } else {
          // Coffee bean tumble
          item.mesh.rotation.x += item.rotSpeedX;
          item.mesh.rotation.y += item.rotSpeedY;
          item.mesh.rotation.z += item.rotSpeedZ;
        }

        // Floating undulation
        item.mesh.position.y = item.baseY + Math.sin(t * item.floatFreq + item.phase) * item.floatAmp;
        
        // Interactive mouse parallax offset
        item.mesh.position.x = item.baseX + mouseX * 2.5 * (1 + (item.mesh.position.z / 16));
      });

      sparkPoints.rotation.y = t * 0.04 + mouseX * 0.2;
      sparkPoints.rotation.x = t * 0.02 - mouseY * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [colorTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}
