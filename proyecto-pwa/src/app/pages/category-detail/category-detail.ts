import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Meal } from '../../models/meal';
import { MealService } from '../../services/meal';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatExpansionModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  templateUrl: './category-detail.html',
  styleUrl: './category-detail.scss',
})
export class CategoryDetail implements OnInit {
  categoryName = signal('');
  meals = signal<Meal[]>([]);
  selectedMeal = signal<Meal | null>(null);
  loaded = signal(false);
  showDetails = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealService: MealService,
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name') ?? '';
    this.categoryName.set(name);
    this.mealService.getMealsByCategory(name).subscribe((meals) => {
      this.meals.set(meals.slice(0, 12));
      this.loaded.set(true);
    });
  }

  selectMeal(meal: Meal) {
    this.showDetails.set(false);
    this.selectedMeal.set(null);
    this.mealService.getMealById(meal.idMeal).subscribe((full) => {
      this.selectedMeal.set(full);
    });
  }
}
