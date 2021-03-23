import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromConfig from '../../../setting/+state/config.selector';

@Component({
  selector: 'iz-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  config$ = this.store.select(fromConfig.getConfig);

  constructor(private store: Store) {}
}
