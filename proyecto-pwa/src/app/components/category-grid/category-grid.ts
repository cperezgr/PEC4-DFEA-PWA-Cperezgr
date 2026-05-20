import { Component, Input, OnChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from '../../models/category';

import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [MatTableModule, SlicePipe],
  templateUrl: './category-grid.html',
})
export class CategoryGrid implements OnChanges {
  @Input() categories: Category[] = [];
  displayedColumns = ['image', 'name', 'description'];
  dataSource: Category[] = [];

  constructor(private router: Router) {}

  ngOnChanges() {
    this.dataSource = this.categories;
  }

  goToDetail(name: string) {
    this.router.navigate(['/categories', name]);
  }
}
