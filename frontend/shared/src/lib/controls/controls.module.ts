import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { InputControl } from './input/input.control';
import { ButtonControl, ButtonToggleControl } from './button/button.control';
import { ModalControl } from './modal/modal.control';
import { TableControl } from './table/table.control';
import { TabControl } from './tab/tab.control';
import { SelectControl } from './select/select.control';
import { RadioControl } from './radio/radio.control';
import { LevelControl } from './level/level.control';
import { ChipControl, ChipListControl } from './chip/chip.control';
import { DateControl, DateRangeControl } from './date/date.control';
import { TextareaControl } from './textarea/textarea.control';
import { DisableControlDirective } from './common.control';
import { CardControl } from './card/card.control';
import { CheckboxControl } from './checkbox/checkbox.control';
import { LoaderControl } from './loader/loader.control';
import { SpinnerControl } from './spinner/spinner.control';
import { ExpandControl } from './expand/expand.control';
import { RouterModule } from '@angular/router';
import { ListControl, ListSelectionControl } from './list/list.control';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarControl } from './calendar/calendar.control';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

const declareAndExport = [
  InputControl,
  ButtonControl,
  ButtonToggleControl,
  ModalControl,
  TableControl,
  TabControl,
  SelectControl,
  RadioControl,
  LevelControl,
  ChipControl,
  CardControl,
  ChipListControl,
  DateControl,
  DateRangeControl,
  TextareaControl,
  CheckboxControl,
  LoaderControl,
  SpinnerControl,
  ExpandControl,
  ListControl,
  CalendarControl,
  ListSelectionControl,
  DisableControlDirective,
];

@NgModule({
  declarations: [...declareAndExport],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FullCalendarModule,
  ],
  exports: [...declareAndExport, RouterModule],
})
export class ControlsModule {}
