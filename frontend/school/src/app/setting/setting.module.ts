import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { SettingFeatureKey, settingReducer } from './+state/config.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConfigEffects } from './+state/config.effects';
import { GeneralComponent } from './general/general.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: GeneralComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [GeneralComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(SettingFeatureKey, settingReducer),
    EffectsModule.forFeature([ConfigEffects]),
    RouterModule.forChild(routes),
  ],
})
export class SettingModule {}
