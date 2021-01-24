import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
// import { selectRouteData } from '../../../+state';

@Component({
  selector: 'iz-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss'],
})
export class SubnavComponent implements OnInit {
  date = new Date();
  // data$: Observable<Data> = this.store.select(selectRouteData);
  data$: Observable<Data>; // = this.store.select(selectRouteData);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
