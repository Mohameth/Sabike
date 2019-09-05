import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SabikeSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [SabikeSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [SabikeSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SabikeSharedModule {
  static forRoot() {
    return {
      ngModule: SabikeSharedModule
    };
  }
}
