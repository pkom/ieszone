import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LibModule } from 'frontend/shared/src/lib/lib.module';
import { LayoutModule } from './layout/layout.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EntityDataModule } from '@ngrx/data';
import { SettingModule } from './setting/setting.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideMockStore } from '@ngrx/store/testing';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './+state';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        LibModule,
        LayoutModule,
        ServiceWorkerModule,
        StoreModule.forRoot(reducers, {
          metaReducers,
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          },
        }),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot(entityConfig),
        SettingModule,
        StoreDevtoolsModule.instrument(),
      ],
      providers: [provideMockStore({})],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
