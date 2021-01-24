import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LibModule } from 'frontend/shared/src/lib/lib.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { InputFieldsComponent } from './input-fields/input-fields.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ChipTypesComponent } from './chip-types/chip-types.component';
import { GridComponent } from './grid/grid.component';
import { CardsModalsComponent } from './cards-modals/cards-modals.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { MiscComponent } from './misc/misc.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFieldsComponent,
    ButtonsComponent,
    DatePickerComponent,
    ChipTypesComponent,
    GridComponent,
    CardsModalsComponent,
    TabViewComponent,
    MiscComponent,
    MyCalendarComponent,
  ],
  imports: [BrowserModule, LibModule, BrowserAnimationsModule, LayoutModule],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000, horizontalPosition: 'end' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
