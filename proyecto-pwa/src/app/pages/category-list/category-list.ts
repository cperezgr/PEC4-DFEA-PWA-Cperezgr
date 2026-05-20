import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { CategoryCard } from '../../components/category-card/category-card';
import { CategoryGrid } from '../../components/category-grid/category-grid';
import { Category } from '../../models/category';
import { MealService } from '../../services/meal';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CategoryCard,
    CategoryGrid,
  ],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList implements OnInit {
  categories = signal<Category[]>([]);
  loaded = signal(false);
  viewMode = signal<'cards' | 'table'>('cards');

  constructor(
    private mealService: MealService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.mealService.getCategories().subscribe((data) => {
      this.categories.set(data);
      this.loaded.set(true);
    });
  }

  goToDetail(name: string) {
    this.router.navigate(['/categories', name]);
  }
}
