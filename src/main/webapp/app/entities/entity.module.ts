import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.SabikeClientModule)
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.SabikeAddressModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.SabikeProductModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.SabikeCartModule)
      },
      {
        path: 'command',
        loadChildren: () => import('./command/command.module').then(m => m.SabikeCommandModule)
      },
      {
        path: 'order-items',
        loadChildren: () => import('./order-items/order-items.module').then(m => m.SabikeOrderItemsModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SabikeEntityModule {}
