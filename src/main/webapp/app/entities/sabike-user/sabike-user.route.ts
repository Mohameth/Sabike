import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SABIKEUser } from 'app/shared/model/sabike-user.model';
import { SABIKEUserService } from './sabike-user.service';
import { SABIKEUserComponent } from './sabike-user.component';
import { SABIKEUserDetailComponent } from './sabike-user-detail.component';
import { SABIKEUserUpdateComponent } from './sabike-user-update.component';
import { SABIKEUserDeletePopupComponent } from './sabike-user-delete-dialog.component';
import { ISABIKEUser } from 'app/shared/model/sabike-user.model';

@Injectable({ providedIn: 'root' })
export class SABIKEUserResolve implements Resolve<ISABIKEUser> {
  constructor(private service: SABIKEUserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISABIKEUser> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SABIKEUser>) => response.ok),
        map((sABIKEUser: HttpResponse<SABIKEUser>) => sABIKEUser.body)
      );
    }
    return of(new SABIKEUser());
  }
}

export const sABIKEUserRoute: Routes = [
  {
    path: '',
    component: SABIKEUserComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SABIKEUserDetailComponent,
    resolve: {
      sABIKEUser: SABIKEUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SABIKEUserUpdateComponent,
    resolve: {
      sABIKEUser: SABIKEUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SABIKEUserUpdateComponent,
    resolve: {
      sABIKEUser: SABIKEUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEUsers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sABIKEUserPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SABIKEUserDeletePopupComponent,
    resolve: {
      sABIKEUser: SABIKEUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEUsers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
