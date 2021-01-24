import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwardComponent } from './award/award.component';
import { ActivityComponent } from './activity/activity.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ActivityComponent, pathMatch: 'full' },
  { path: 'award', component: AwardComponent },
];

@NgModule({
  declarations: [AwardComponent, ActivityComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ActivityModule {}
