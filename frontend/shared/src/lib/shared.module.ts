import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [SharedComponent],
  imports: [MaterialModule],
  exports: [SharedComponent, MaterialModule],
})
export class SharedModule {}
