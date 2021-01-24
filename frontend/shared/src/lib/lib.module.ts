import { NgModule } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { BrowserModule } from '@angular/platform-browser';
import { ControlsModule } from './controls/controls.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

const importAndExport = [
  ControlsModule,
  FormsModule,
  ReactiveFormsModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSidenavModule,
  BrowserAnimationsModule,
];
const declareAndExport = [LogoComponent];

const tokenGetter = () => localStorage.getItem('token');

@NgModule({
  imports: [
    ...importAndExport,
    BrowserModule,
    JwtModule.forRoot({ config: { tokenGetter: tokenGetter } }),
  ],
  exports: [...importAndExport, ...declareAndExport],
  declarations: [...declareAndExport],
})
export class LibModule {}
