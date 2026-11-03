// src/config/chapters.ts

import { ChapterId } from '../types/scene.types';

export interface ChapterDescriptor {
  id: ChapterId;
  index: number;
  railLabel: string;
  shortTitle: string;
  fullTitle: string;
  sequence: 1 | 2 | 3;
}

export const CHAPTERS: ChapterDescriptor[] = [
  {
    id: 'PRELUDE',
    index: 0,
    railLabel: '✉',
    shortTitle: 'Invitation',
    fullTitle: 'The Little Invitation',
    sequence: 1,
  },
  {
    id: 'OPENING',
    index: 1,
    railLabel: '00',
    shortTitle: 'Opening',
    fullTitle: 'Enter My Universe',
    sequence: 1,
  },
  {
    id: 'ACT_1',
    index: 2,
    railLabel: '01',
    shortTitle: 'Act I',
    fullTitle: 'Two Countries, One Sky',
    sequence: 1,
  },
  {
    id: 'ACT_2',
    index: 3,
    railLabel: '02',
    shortTitle: 'Act II',
    fullTitle: 'The Little Things I Keep',
    sequence: 1,
  },
  {
    id: 'ACT_3',
    index: 4,
    railLabel: '03',
    shortTitle: 'Act III',
    fullTitle: 'The Secret Mirror',
    sequence: 2,
  },
  {
    id: 'ACT_4',
    index: 5,
    railLabel: '04',
    shortTitle: 'Act IV',
    fullTitle: 'The Two Sides of Us',
    sequence: 2,
  },
  {
    id: 'ACT_5',
    index: 6,
    railLabel: '05',
    shortTitle: 'Act V',
    fullTitle: 'The Uci Formula',
    sequence: 2,
  },
  {
    id: 'ACT_6',
    index: 7,
    railLabel: '06',
    shortTitle: 'Act VI',
    fullTitle: 'Even Across the Distance',
    sequence: 3,
  },
  {
    id: 'ACT_7',
    index: 8,
    railLabel: '07',
    shortTitle: 'Act VII',
    fullTitle: 'The Moonlit Birthday Wish',
    sequence: 3,
  },
  {
    id: 'FINAL_GIFT',
    index: 9,
    railLabel: 'GIFT',
    shortTitle: 'Climax',
    fullTitle: 'The Impossible Gift',
    sequence: 3,
  },
  {
    id: 'AFTER_CREDITS',
    index: 10,
    railLabel: 'VIP',
    shortTitle: 'Encore',
    fullTitle: 'After-Credits & VIP Vault',
    sequence: 3,
  },
  {
    id: 'FINAL_LOVE_LETTER',
    index: 11,
    railLabel: 'LOVE',
    shortTitle: 'Closing',
    fullTitle: 'The Last Little Universe — A Love Letter',
    sequence: 3,
  },
];

export const CHAPTER_IDS: ChapterId[] = CHAPTERS.map((c) => c.id);
