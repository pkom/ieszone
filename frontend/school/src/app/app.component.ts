import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadConfig } from './setting/+state/config.action';
import * as fromConfig from './setting/+state/config.selector';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'iz-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
  constructor(private store: Store) {
    this.store
      .select(fromConfig.getStatus)
      .pipe(filter((val) => !!val))
      .subscribe((status) => {
        console.info(status?.message);
      });
  }

  ngOnInit() {
    this.store.dispatch(LoadConfig());
  }
}
