import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, AuthResponse } from '@iz/interface';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  login(user: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('v1/auth', user);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
