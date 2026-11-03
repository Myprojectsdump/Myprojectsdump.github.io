// src/engine/webgl/materials/luxuryMaterials.ts

import * as THREE from 'three';
import { AssetDisposal } from '../AssetDisposal';

function createProceduralObsidianNormal(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#8080ff'; // Neutral normal base
    ctx.fillRect(0, 0, 256, 256);
    // Subtle anisotropic horizontal striations
    for (let i = 0; i < 256; i += 2) {
      const v = Math.floor(128 + (Math.sin(i * 0.4) + Math.random() * 0.4 - 0.2) * 20);
      ctx.fillStyle = `rgb(${v}, 128, 255)`;
      ctx.fillRect(0, i, 256, 1);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return AssetDisposal.trackTexture(texture);
}

function createProceduralGrooveBump(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 512, 512);
    const cx = 256;
    const cy = 256;
    // Radial micro-grooves
    for (let r = 50; r < 250; r += 1.5) {
      const intensity = Math.floor(128 + Math.sin(r * 2.2) * 120);
      ctx.strokeStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return AssetDisposal.trackTexture(texture);
}

// Singleton materials pool
export const MAT_BOROSILICATE_GLASS = AssetDisposal.trackMaterial(
  new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'),
    transmission: 0.92,
    opacity: 1,
    transparent: true,
    roughness: 0.08,
    ior: 1.52,
    thickness: 0.45,
    attenuationColor: new THREE.Color('#FDA4AF'),
    attenuationDistance: 2.4,
    depthWrite: false,
    side: THREE.FrontSide,
  })
);

export const MAT_BRUSHED_OBSIDIAN = AssetDisposal.trackMaterial(
  new THREE.MeshStandardMaterial({
    color: new THREE.Color('#07070C'),
    metalness: 0.82,
    roughness: 0.28,
    normalMap: createProceduralObsidianNormal(),
    normalScale: new THREE.Vector2(0.35, 0.35),
  })
);

export const MAT_CHAMPAGNE_GOLD = AssetDisposal.trackMaterial(
  new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FDE68A'),
    metalness: 0.94,
    roughness: 0.18,
  })
);

export const MAT_ROSE_GOLD_CORE = AssetDisposal.trackMaterial(
  new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F472B6'),
    emissive: new THREE.Color('#E11D48'),
    emissiveIntensity: 0.45,
    metalness: 0.88,
    roughness: 0.2,
  })
);

export const MAT_CRIMSON_SILK = AssetDisposal.trackMaterial(
  new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#E11D48'),
    roughness: 0.36,
    metalness: 0.12,
    sheen: 1.0,
    sheenRoughness: 0.25,
    sheenColor: new THREE.Color('#FDA4AF'),
  })
);

export const MAT_VINYL_GROOVE = AssetDisposal.trackMaterial(
  new THREE.MeshStandardMaterial({
    color: new THREE.Color('#050508'),
    metalness: 0.45,
    roughness: 0.22,
    bumpMap: createProceduralGrooveBump(),
    bumpScale: 0.08,
  })
);
