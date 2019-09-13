import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SabikeSharedModule } from 'app/shared';
import {
  OrderItemsComponent,
  OrderItemsDetailComponent,
  OrderItemsUpdateComponent,
  OrderItemsDeletePopupComponent,
  OrderItemsDeleteDialogComponent,
  orderItemsRoute,
  orderItemsPopupRoute
} from './';

const ENTITY_STATES = [...orderItemsRoute, ...orderItemsPopupRoute];

@NgModule({
  imports: [SabikeSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrderItemsComponent,
    OrderItemsDetailComponent,
    OrderItemsUpdateComponent,
    OrderItemsDeleteDialogComponent,
    OrderItemsDeletePopupComponent
  ],
  entryComponents: [OrderItemsComponent, OrderItemsUpdateComponent, OrderItemsDeleteDialogComponent, OrderItemsDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SabikeOrderItemsModule {}
