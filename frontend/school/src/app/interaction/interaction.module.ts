import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum/forum.component';
import { Routes, RouterModule } from '@angular/router';
import { ControlsModule } from 'frontend/shared/src/lib/controls/controls.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ForumComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [ForumComponent],
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class InteractionModule {}
