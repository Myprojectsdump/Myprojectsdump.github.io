// src/config/act5Ingredients.ts
// Synchronized with centralized STORY_DATA.alchemyIngredients (20% / 20% / 20% / 40% Bedroom Menace & Mischief)

import { STORY_DATA } from '../data/storyData';
import { Act5IngredientItem } from '../types/story';

export type Act5Ingredient = Act5IngredientItem;

export const ACT5_INGREDIENTS: Act5Ingredient[] = STORY_DATA.alchemyIngredients;
export const ACT5_OVERHEAT_WARNING: string = STORY_DATA.alchemyOverheatWarning;
