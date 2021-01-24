import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { TimetableComponent } from './timetable/timetable.component';
import { SyllabusComponent } from './syllabus/syllabus.component';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { ResultComponent } from './result/result.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: QuickViewComponent,
  },
  { path: 'timetable', component: TimetableComponent },
  { path: 'syllabus', component: SyllabusComponent },
  { path: 'examschedule', component: ExamScheduleComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  declarations: [
    QuickViewComponent,
    TimetableComponent,
    SyllabusComponent,
    ExamScheduleComponent,
    ResultComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
