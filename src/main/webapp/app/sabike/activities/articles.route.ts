import { Routes } from '@angular/router';

import { ListArticlesComponent } from 'app/sabike/activities/articles-list/list-articles.component';
import { DetailsArticleComponent } from 'app/sabike/activities/article-details/details-article.component';

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
