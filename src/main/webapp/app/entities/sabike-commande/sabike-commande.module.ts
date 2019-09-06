import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SabikeSharedModule } from 'app/shared';
import {
  SABIKECommandeComponent,
  SABIKECommandeDetailComponent,
  SABIKECommandeUpdateComponent,
  SABIKECommandeDeletePopupComponent,
  SABIKECommandeDeleteDialogComponent,
  sABIKECommandeRoute,
  sABIKECommandePopupRoute
} from './';

const ENTITY_STATES = [...sABIKECommandeRoute, ...sABIKECommandePopupRoute];

@NgModule({
  imports: [SabikeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SABIKECommandeComponent,
    SABIKECommandeDetailComponent,
    SABIKECommandeUpdateComponent,
    SABIKECommandeDeleteDialogComponent,
    SABIKECommandeDeletePopupComponent
  ],
  entryComponents: [
    SABIKECommandeComponent,
    SABIKECommandeUpdateComponent,
    SABIKECommandeDeleteDialogComponent,
    SABIKECommandeDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SabikeSABIKECommandeModule {}
