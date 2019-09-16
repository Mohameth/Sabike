import { Routes } from '@angular/router';

import { ListArticlesComponent } from 'app/sabike/activities/articles-list/list-articles.component';
import { DetailsArticleComponent } from 'app/sabike/activities/article-details/details-article.component';
import { CartComponent } from 'app/sabike/activities/cart/cart.component';
import { HomeComponent } from 'app/home';
import { NavbarComponent } from 'app/layouts';

export const activitiesRoute: Routes = [
  {
    path: 'articles/:category',
    component: ListArticlesComponent
  },
  {
    path: 'articles/:category/:articleId',
    component: DetailsArticleComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mycart',
    component: CartComponent
  },
  {
    path: 'search/:name',
    component: ListArticlesComponent
  },
  {
    path: 'search/:name/:articleId',
    component: DetailsArticleComponent
  }
];
