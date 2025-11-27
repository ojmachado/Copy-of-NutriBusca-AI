export type Language = 'pt-BR' | 'en-US';

export interface NutritionData {
  foodName: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g: number;
  servingSize: string;
}

export interface Translations {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchButton: string;
  loading: string;
  errorGeneric: string;
  errorNotFound: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sugar: string;
  servingSize: string;
  nutritionalInfo: string;
  macrosBreakdown: string;
}
