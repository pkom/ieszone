import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRouteComponent } from './my-route/my-route.component';
import { SchoolBusComponent } from './school-bus/school-bus.component';
import { FieldTripComponent } from './field-trip/field-trip.component';
import { Routes, RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';

const routes: Routes = [
  { path: '', component: MyRouteComponent },
  { path: 'schoolbus', component: SchoolBusComponent },
  { path: 'fieldtrip', component: FieldTripComponent },
];

@NgModule({
  declarations: [MyRouteComponent, SchoolBusComponent, FieldTripComponent],
  imports: [CommonModule, RouterModule.forChild(routes), GoogleMapsModule],
})
export class TravelModule {}
