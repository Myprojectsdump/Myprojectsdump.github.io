// src/engine/webgl/AssetDisposal.ts

import * as THREE from 'three';

export class AssetDisposal {
  private static geometries = new Set<THREE.BufferGeometry>();
  private static materials = new Set<THREE.Material>();
  private static textures = new Set<THREE.Texture>();

  public static trackGeometry(geometry: THREE.BufferGeometry): THREE.BufferGeometry {
    this.geometries.add(geometry);
    return geometry;
  }

  public static trackMaterial<T extends THREE.Material>(material: T): T {
    this.materials.add(material);
    return material;
  }

  public static trackTexture<T extends THREE.Texture>(texture: T): T {
    this.textures.add(texture);
    return texture;
  }

  public static disposeAll(): void {
    this.geometries.forEach((g) => g.dispose());
    this.geometries.clear();

    this.materials.forEach((m) => m.dispose());
    this.materials.clear();

    this.textures.forEach((t) => t.dispose());
    this.textures.clear();
  }
}
