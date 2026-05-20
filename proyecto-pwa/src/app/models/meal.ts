export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strYoutube?: string;
  strTags?: string;
  // Ingredientes (la API devuelve strIngredient1..20 y strMeasure1..20)
  ingredients?: { name: string; measure: string }[];
}
