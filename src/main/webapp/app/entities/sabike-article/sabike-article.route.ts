import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SABIKEArticle } from 'app/shared/model/sabike-article.model';
import { SABIKEArticleService } from './sabike-article.service';
import { SABIKEArticleComponent } from './sabike-article.component';
import { SABIKEArticleDetailComponent } from './sabike-article-detail.component';
import { SABIKEArticleUpdateComponent } from './sabike-article-update.component';
import { SABIKEArticleDeletePopupComponent } from './sabike-article-delete-dialog.component';
import { ISABIKEArticle } from 'app/shared/model/sabike-article.model';

@Injectable({ providedIn: 'root' })
export class SABIKEArticleResolve implements Resolve<ISABIKEArticle> {
  constructor(private service: SABIKEArticleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISABIKEArticle> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SABIKEArticle>) => response.ok),
        map((sABIKEArticle: HttpResponse<SABIKEArticle>) => sABIKEArticle.body)
      );
    }
    return of(new SABIKEArticle());
  }
}

export const sABIKEArticleRoute: Routes = [
  {
    path: '',
    component: SABIKEArticleComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEArticles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SABIKEArticleDetailComponent,
    resolve: {
      sABIKEArticle: SABIKEArticleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEArticles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SABIKEArticleUpdateComponent,
    resolve: {
      sABIKEArticle: SABIKEArticleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEArticles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SABIKEArticleUpdateComponent,
    resolve: {
      sABIKEArticle: SABIKEArticleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEArticles'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sABIKEArticlePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SABIKEArticleDeletePopupComponent,
    resolve: {
      sABIKEArticle: SABIKEArticleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEArticles'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
