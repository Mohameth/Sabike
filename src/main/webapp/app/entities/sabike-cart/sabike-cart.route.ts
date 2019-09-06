import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SABIKECart } from 'app/shared/model/sabike-cart.model';
import { SABIKECartService } from './sabike-cart.service';
import { SABIKECartComponent } from './sabike-cart.component';
import { SABIKECartDetailComponent } from './sabike-cart-detail.component';
import { SABIKECartUpdateComponent } from './sabike-cart-update.component';
import { SABIKECartDeletePopupComponent } from './sabike-cart-delete-dialog.component';
import { ISABIKECart } from 'app/shared/model/sabike-cart.model';

@Injectable({ providedIn: 'root' })
export class SABIKECartResolve implements Resolve<ISABIKECart> {
  constructor(private service: SABIKECartService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISABIKECart> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SABIKECart>) => response.ok),
        map((sABIKECart: HttpResponse<SABIKECart>) => sABIKECart.body)
      );
    }
    return of(new SABIKECart());
  }
}

export const sABIKECartRoute: Routes = [
  {
    path: '',
    component: SABIKECartComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKECarts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SABIKECartDetailComponent,
    resolve: {
      sABIKECart: SABIKECartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKECarts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SABIKECartUpdateComponent,
    resolve: {
      sABIKECart: SABIKECartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKECarts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SABIKECartUpdateComponent,
    resolve: {
      sABIKECart: SABIKECartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKECarts'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sABIKECartPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SABIKECartDeletePopupComponent,
    resolve: {
      sABIKECart: SABIKECartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKECarts'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
