import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { LibModule } from 'frontend/shared/src/lib/lib.module';
import { RouterModule, Route } from '@angular/router';
import { InputFieldsComponent } from '../input-fields/input-fields.component';
import { ButtonsComponent } from '../buttons/buttons.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { ChipTypesComponent } from '../chip-types/chip-types.component';
import { GridComponent } from '../grid/grid.component';
import { CardsModalsComponent } from '../cards-modals/cards-modals.component';
import { TabViewComponent } from '../tab-view/tab-view.component';
import { MiscComponent } from '../misc/misc.component';
import { MyCalendarComponent } from '../my-calendar/my-calendar.component';

const routes: Route[] = [
  { path: '', component: InputFieldsComponent },
  { path: 'button', component: ButtonsComponent },
  { path: 'date', component: DatePickerComponent },
  { path: 'chip', component: ChipTypesComponent },
  { path: 'table', component: GridComponent },
  { path: 'modal', component: CardsModalsComponent },
  { path: 'tab', component: TabViewComponent },
  { path: 'misc', component: MiscComponent },
  { path: 'calendar', component: MyCalendarComponent },
];

@NgModule({
  declarations: [LayoutComponent, NavComponent],
  imports: [CommonModule, LibModule, RouterModule.forRoot(routes)],
  exports: [LayoutComponent, RouterModule],
})
export class LayoutModule {}
