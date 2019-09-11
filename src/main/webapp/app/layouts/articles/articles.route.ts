import { Routes } from '@angular/router';

import { ListArticlesComponent } from 'app/layouts/articles/list-articles/list-articles.component';
import { DetailsArticleComponent } from 'app/layouts/articles/details-article/details-article.component';

export const articlesRoute: Routes = [
  {
    path: 'articles/:name',
    component: ListArticlesComponent
  },
  {
    path: 'articles/:name/:articleId',
    component: DetailsArticleComponent
  }
];
