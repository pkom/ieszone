import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { environment } from '@env';
import { map, switchMap, tap, shareReplay, catchError } from 'rxjs/operators';
import { PersistanceService } from './persistance.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly baseUrl;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private localStore: PersistanceService,
  ) {
    this.baseUrl = environment.REST_CORE; //..baseUrl;
  }

  login(data): Observable<boolean> {
    return this.httpClient.post<any>(`${this.baseUrl}auth/login`, data).pipe(
      tap((tokens) => this.doLoginUser(data.email, tokens)),
      map((res) => {
        return res;
      }),
      catchError((error) => {
        alert(error.error);
        return of(false);
      }),
    );
  }

  logout() {
    this.loggedUser = null;
    this.doLogoutUser();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.httpClient
      .post<any>(`${this.baseUrl}auth/refresh/token`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens) => {
          this.storeTokens(tokens);
        }),
        catchError((error) => {
          this.doLogoutUser();
          return of(false);
        }),
      );
  }

  getJwtToken() {
    return this.localStore.get(this.JWT_TOKEN);
  }

  private doLoginUser(username?: string, tokens?) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
    this.router.navigate(['/']);
  }

  private getRefreshToken() {
    return this.localStore.get(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    this.localStore.set(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens) {
    this.localStore.set(this.JWT_TOKEN, tokens['result'].accessToken);
    this.localStore.set(this.REFRESH_TOKEN, tokens['result'].refreshToken);
  }

  private removeTokens() {
    this.localStore.remove(this.JWT_TOKEN);
    this.localStore.remove(this.REFRESH_TOKEN);
  }
}
