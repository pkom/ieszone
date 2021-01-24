import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LibModule } from 'frontend/shared/src/lib/lib.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LibModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent],
})
export class TodoModule {
  static forRoot() {
    return {
      ngModule: TodoModule,
      providers: [],
    };
  }
}
