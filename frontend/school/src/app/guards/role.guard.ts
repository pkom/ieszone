import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { SelectUser } from '../setting/+state/config.selector';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanLoad {
  constructor(public store: Store, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkRole(route);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkRole(route);
  }

  checkRole(route: ActivatedRouteSnapshot | Route): Observable<boolean> {
    const { expectedRoles } = route.data;
    if (!expectedRoles) {
      return of(true);
    }

    return this.store.select(SelectUser).pipe(
      map((user) => {
        if (expectedRoles?.includes(user.role)) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }),
    );
  }
}
