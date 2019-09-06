import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SabikeSharedModule } from 'app/shared';
import {
  SABIKECartComponent,
  SABIKECartDetailComponent,
  SABIKECartUpdateComponent,
  SABIKECartDeletePopupComponent,
  SABIKECartDeleteDialogComponent,
  sABIKECartRoute,
  sABIKECartPopupRoute
} from './';

const ENTITY_STATES = [...sABIKECartRoute, ...sABIKECartPopupRoute];

@NgModule({
  imports: [SabikeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SABIKECartComponent,
    SABIKECartDetailComponent,
    SABIKECartUpdateComponent,
    SABIKECartDeleteDialogComponent,
    SABIKECartDeletePopupComponent
  ],
  entryComponents: [SABIKECartComponent, SABIKECartUpdateComponent, SABIKECartDeleteDialogComponent, SABIKECartDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SabikeSABIKECartModule {}
