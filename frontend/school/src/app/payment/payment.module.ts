import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeComponent } from './fee/fee.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: FeeComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [FeeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PaymentModule {}
