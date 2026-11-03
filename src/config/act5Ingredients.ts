// src/config/act5Ingredients.ts

export interface Act5Ingredient {
  id: string;
  slot: number;
  name: string;
  shortName: string;
  percentage: number;
  percentageLabel: string;
  color: string;
  glowColor: string;
  iconName: 'heart' | 'crown' | 'sparkles' | 'flame';
  description: string;
}

export const ACT5_INGREDIENTS: Act5Ingredient[] = [
  {
    id: 'vial-1',
    slot: 1,
    name: 'Pure Pacarku Sweetness',
    shortName: 'Pure Sweetness',
    percentage: 40,
    percentageLabel: '40%',
    color: '#FDA4AF',
    glowColor: 'rgba(253, 164, 175, 0.65)',
    iconName: 'heart',
    description: 'The innocent, soft-spoken baby voice that can make my entire world freeze in place.',
  },
  {
    id: 'vial-2',
    slot: 2,
    name: 'Effortless Goddess Radiance',
    shortName: 'Goddess Radiance',
    percentage: 30,
    percentageLabel: '30%',
    color: '#FDE68A',
    glowColor: 'rgba(253, 230, 138, 0.7)',
    iconName: 'crown',
    description: 'The jaw-dropping elegance, effortless glow, and magnetic poise that commands every gaze.',
  },
  {
    id: 'vial-3',
    slot: 3,
    name: 'Clingy Princess Energy',
    shortName: 'Clingy Princess',
    percentage: 20,
    percentageLabel: '20%',
    color: '#F472B6',
    glowColor: 'rgba(244, 114, 182, 0.65)',
    iconName: 'sparkles',
    description: 'Needy 2:00 AM cuddles, pouty lips, and wanting non-stop attention until you fall asleep.',
  },
  {
    id: 'vial-4',
    slot: 4,
    name: 'Late-Night Bedroom Menace',
    shortName: 'Bedroom Menace',
    percentage: 10,
    percentageLabel: '10%',
    color: '#E11D48',
    glowColor: 'rgba(225, 29, 72, 0.8)',
    iconName: 'flame',
    description: 'Dangerous whispers, sly grins, and knowing exactly how to make your boyfriend lose his mind.',
  },
];
