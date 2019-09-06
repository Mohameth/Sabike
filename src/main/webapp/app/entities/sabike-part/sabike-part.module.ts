import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SabikeSharedModule } from 'app/shared';
import {
  SABIKEPartComponent,
  SABIKEPartDetailComponent,
  SABIKEPartUpdateComponent,
  SABIKEPartDeletePopupComponent,
  SABIKEPartDeleteDialogComponent,
  sABIKEPartRoute,
  sABIKEPartPopupRoute
} from './';

const ENTITY_STATES = [...sABIKEPartRoute, ...sABIKEPartPopupRoute];

@NgModule({
  imports: [SabikeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SABIKEPartComponent,
    SABIKEPartDetailComponent,
    SABIKEPartUpdateComponent,
    SABIKEPartDeleteDialogComponent,
    SABIKEPartDeletePopupComponent
  ],
  entryComponents: [SABIKEPartComponent, SABIKEPartUpdateComponent, SABIKEPartDeleteDialogComponent, SABIKEPartDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SabikeSABIKEPartModule {}
