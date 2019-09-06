import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SABIKEBike } from 'app/shared/model/sabike-bike.model';
import { SABIKEBikeService } from './sabike-bike.service';
import { SABIKEBikeComponent } from './sabike-bike.component';
import { SABIKEBikeDetailComponent } from './sabike-bike-detail.component';
import { SABIKEBikeUpdateComponent } from './sabike-bike-update.component';
import { SABIKEBikeDeletePopupComponent } from './sabike-bike-delete-dialog.component';
import { ISABIKEBike } from 'app/shared/model/sabike-bike.model';

@Injectable({ providedIn: 'root' })
export class SABIKEBikeResolve implements Resolve<ISABIKEBike> {
  constructor(private service: SABIKEBikeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISABIKEBike> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SABIKEBike>) => response.ok),
        map((sABIKEBike: HttpResponse<SABIKEBike>) => sABIKEBike.body)
      );
    }
    return of(new SABIKEBike());
  }
}

export const sABIKEBikeRoute: Routes = [
  {
    path: '',
    component: SABIKEBikeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEBikes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SABIKEBikeDetailComponent,
    resolve: {
      sABIKEBike: SABIKEBikeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEBikes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SABIKEBikeUpdateComponent,
    resolve: {
      sABIKEBike: SABIKEBikeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEBikes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SABIKEBikeUpdateComponent,
    resolve: {
      sABIKEBike: SABIKEBikeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEBikes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sABIKEBikePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SABIKEBikeDeletePopupComponent,
    resolve: {
      sABIKEBike: SABIKEBikeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEBikes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
