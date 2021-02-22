import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '@core/auth.service';
import { HttpService } from '@core/http.service';
import { RoleGuardService } from '@core/role-guard.service';
import { TokenInterceptor } from '@core/token.interceptor';
import { GeneralService } from '@core/general.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, MatSnackBarModule],
  providers: [
    AuthService,
    HttpService,
    RoleGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    GeneralService,
  ],
})
export class CoreModule {}
