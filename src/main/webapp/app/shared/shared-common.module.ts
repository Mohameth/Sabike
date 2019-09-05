import { NgModule } from '@angular/core';

import { SabikeSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [SabikeSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [SabikeSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SabikeSharedCommonModule {}
