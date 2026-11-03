// src/config/act4ConstellationLayout.ts

export interface ConstellationPosition {
  slot: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  id: string;
  romanticTitle: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  labelAnchor: 'start' | 'middle' | 'end';
}

// Fixed 8-node heart silhouette constellation geometry per approved reference specification
export const CONSTELLATION_LAYOUT: Record<string, ConstellationPosition> = {
  eyes: {
    slot: 1,
    id: 'eyes',
    romanticTitle: 'Our First Spark',
    x: 250,
    y: 80,
    labelX: 250,
    labelY: 55,
    labelAnchor: 'middle',
  },
  laugh: {
    slot: 2,
    id: 'laugh',
    romanticTitle: 'The Silly Us',
    x: 400,
    y: 165,
    labelX: 400,
    labelY: 140,
    labelAnchor: 'middle',
  },
  voice: {
    slot: 3,
    id: 'voice',
    romanticTitle: 'The Calm in Chaos',
    x: 550,
    y: 80,
    labelX: 550,
    labelY: 55,
    labelAnchor: 'middle',
  },
  heart: {
    slot: 4,
    id: 'heart',
    romanticTitle: 'The Late Night Us',
    x: 655,
    y: 155,
    labelX: 675,
    labelY: 155,
    labelAnchor: 'start',
  },
  lips: {
    slot: 5,
    id: 'lips',
    romanticTitle: 'Things I Crave',
    x: 535,
    y: 275,
    labelX: 555,
    labelY: 275,
    labelAnchor: 'start',
  },
  waist: {
    slot: 6,
    id: 'waist',
    romanticTitle: 'Promises',
    x: 400,
    y: 350,
    labelX: 400,
    labelY: 380,
    labelAnchor: 'middle',
  },
  bites: {
    slot: 7,
    id: 'bites',
    romanticTitle: 'The Little Fights',
    x: 265,
    y: 275,
    labelX: 245,
    labelY: 275,
    labelAnchor: 'end',
  },
  neck: {
    slot: 8,
    id: 'neck',
    romanticTitle: 'Our Safe Space',
    x: 145,
    y: 155,
    labelX: 125,
    labelY: 155,
    labelAnchor: 'end',
  },
};

// Smooth heart connection path following 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 01
export const CONSTELLATION_HEART_PATH = `
  M 250,80
  C 290,110 350,150 400,165
  C 450,150 510,110 550,80
  C 600,105 640,125 655,155
  C 625,200 585,245 535,275
  C 490,305 440,335 400,350
  C 360,335 310,305 265,275
  C 215,245 175,200 145,155
  C 160,125 200,105 250,80 Z
`.trim();
