import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  $appSatus = this.http.get('/v1');

  constructor(private http: HttpClient) {}
}
