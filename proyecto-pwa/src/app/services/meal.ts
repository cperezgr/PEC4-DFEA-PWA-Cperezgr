import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';
import { Meal } from '../models/meal';

@Injectable({ providedIn: 'root' })
export class MealService {
  private base = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  // Listado principal: todas las categorías
  getCategories(): Observable<Category[]> {
    return this.http
      .get<{ categories: Category[] }>(`${this.base}/categories.php`)
      .pipe(map((res) => res.categories));
  }

  // Recetas de una categoría (para el detalle)
  getMealsByCategory(category: string): Observable<Meal[]> {
    return this.http
      .get<{ meals: Meal[] }>(`${this.base}/filter.php?c=${category}`)
      .pipe(map((res) => res.meals ?? []));
  }

  // Detalle completo de una receta
  getMealById(id: string): Observable<Meal> {
    return this.http.get<{ meals: any[] }>(`${this.base}/lookup.php?i=${id}`).pipe(
      map((res) => {
        const m = res.meals[0];
        // Construimos el array de ingredientes a partir de los 20 campos
        const ingredients: { name: string; measure: string }[] = [];
        for (let i = 1; i <= 20; i++) {
          const name = m[`strIngredient${i}`];
          const measure = m[`strMeasure${i}`];
          if (name && name.trim()) {
            ingredients.push({ name: name.trim(), measure: measure?.trim() ?? '' });
          }
        }
        return { ...m, ingredients } as Meal;
      }),
    );
  }
}
