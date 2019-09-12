import { Routes } from '@angular/router';

import { ListArticlesComponent } from 'app/sabike/activities/articles-list/list-articles.component';
import { DetailsArticleComponent } from 'app/sabike/activities/article-details/details-article.component';
import { CartComponent } from 'app/sabike/activities/cart/cart.component';

export const activitiesRoute: Routes = [
  {
    path: 'articles/:name',
    component: ListArticlesComponent
  },
  {
    path: 'articles/:name/:articleId',
    component: DetailsArticleComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];
