import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'sabike-user',
        loadChildren: () => import('./sabike-user/sabike-user.module').then(m => m.SabikeSABIKEUserModule)
      },
      {
        path: 'sabike-article',
        loadChildren: () => import('./sabike-article/sabike-article.module').then(m => m.SabikeSABIKEArticleModule)
      },
      {
        path: 'sabike-cart',
        loadChildren: () => import('./sabike-cart/sabike-cart.module').then(m => m.SabikeSABIKECartModule)
      },
      {
        path: 'sabike-commande',
        loadChildren: () => import('./sabike-commande/sabike-commande.module').then(m => m.SabikeSABIKECommandeModule)
      },
      {
        path: 'sabike-bike',
        loadChildren: () => import('./sabike-bike/sabike-bike.module').then(m => m.SabikeSABIKEBikeModule)
      },
      {
        path: 'sabike-part',
        loadChildren: () => import('./sabike-part/sabike-part.module').then(m => m.SabikeSABIKEPartModule)
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
