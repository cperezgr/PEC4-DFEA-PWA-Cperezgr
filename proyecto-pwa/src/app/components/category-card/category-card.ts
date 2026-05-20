import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../models/category';

import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, SlicePipe],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {
  @Input() category!: Category;
  @Output() cardClick = new EventEmitter<string>();
}
