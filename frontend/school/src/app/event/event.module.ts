import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CalendarComponent, pathMatch: 'full' },
  { path: 'attendance', component: AttendanceComponent },
];

@NgModule({
  declarations: [CalendarComponent, AttendanceComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EventModule {}
