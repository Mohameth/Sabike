import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SabikeSharedModule } from 'app/shared';
import {
  SABIKEUserComponent,
  SABIKEUserDetailComponent,
  SABIKEUserUpdateComponent,
  SABIKEUserDeletePopupComponent,
  SABIKEUserDeleteDialogComponent,
  sABIKEUserRoute,
  sABIKEUserPopupRoute
} from './';

const ENTITY_STATES = [...sABIKEUserRoute, ...sABIKEUserPopupRoute];

@NgModule({
  imports: [SabikeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SABIKEUserComponent,
    SABIKEUserDetailComponent,
    SABIKEUserUpdateComponent,
    SABIKEUserDeleteDialogComponent,
    SABIKEUserDeletePopupComponent
  ],
  entryComponents: [SABIKEUserComponent, SABIKEUserUpdateComponent, SABIKEUserDeleteDialogComponent, SABIKEUserDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SabikeSABIKEUserModule {}
