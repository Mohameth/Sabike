import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SabikeSharedModule } from 'app/shared';
import {
  SABIKEBikeComponent,
  SABIKEBikeDetailComponent,
  SABIKEBikeUpdateComponent,
  SABIKEBikeDeletePopupComponent,
  SABIKEBikeDeleteDialogComponent,
  sABIKEBikeRoute,
  sABIKEBikePopupRoute
} from './';

const ENTITY_STATES = [...sABIKEBikeRoute, ...sABIKEBikePopupRoute];

@NgModule({
  imports: [SabikeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SABIKEBikeComponent,
    SABIKEBikeDetailComponent,
    SABIKEBikeUpdateComponent,
    SABIKEBikeDeleteDialogComponent,
    SABIKEBikeDeletePopupComponent
  ],
  entryComponents: [SABIKEBikeComponent, SABIKEBikeUpdateComponent, SABIKEBikeDeleteDialogComponent, SABIKEBikeDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SabikeSABIKEBikeModule {}
