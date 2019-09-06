import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SabikeSharedModule } from 'app/shared';
import {
  SABIKEArticleComponent,
  SABIKEArticleDetailComponent,
  SABIKEArticleUpdateComponent,
  SABIKEArticleDeletePopupComponent,
  SABIKEArticleDeleteDialogComponent,
  sABIKEArticleRoute,
  sABIKEArticlePopupRoute
} from './';

const ENTITY_STATES = [...sABIKEArticleRoute, ...sABIKEArticlePopupRoute];

@NgModule({
  imports: [SabikeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SABIKEArticleComponent,
    SABIKEArticleDetailComponent,
    SABIKEArticleUpdateComponent,
    SABIKEArticleDeleteDialogComponent,
    SABIKEArticleDeletePopupComponent
  ],
  entryComponents: [
    SABIKEArticleComponent,
    SABIKEArticleUpdateComponent,
    SABIKEArticleDeleteDialogComponent,
    SABIKEArticleDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SabikeSABIKEArticleModule {}
