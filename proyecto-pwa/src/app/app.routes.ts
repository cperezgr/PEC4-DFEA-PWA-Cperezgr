import { Routes } from '@angular/router';
import { CategoryDetail } from './pages/category-detail/category-detail';
import { CategoryList } from './pages/category-list/category-list';

export const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories', component: CategoryList },
  { path: 'categories/:name', component: CategoryDetail },
  { path: '**', redirectTo: 'categories' },
];
