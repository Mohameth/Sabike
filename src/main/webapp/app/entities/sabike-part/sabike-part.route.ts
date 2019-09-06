import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SABIKEPart } from 'app/shared/model/sabike-part.model';
import { SABIKEPartService } from './sabike-part.service';
import { SABIKEPartComponent } from './sabike-part.component';
import { SABIKEPartDetailComponent } from './sabike-part-detail.component';
import { SABIKEPartUpdateComponent } from './sabike-part-update.component';
import { SABIKEPartDeletePopupComponent } from './sabike-part-delete-dialog.component';
import { ISABIKEPart } from 'app/shared/model/sabike-part.model';

@Injectable({ providedIn: 'root' })
export class SABIKEPartResolve implements Resolve<ISABIKEPart> {
  constructor(private service: SABIKEPartService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISABIKEPart> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SABIKEPart>) => response.ok),
        map((sABIKEPart: HttpResponse<SABIKEPart>) => sABIKEPart.body)
      );
    }
    return of(new SABIKEPart());
  }
}

export const sABIKEPartRoute: Routes = [
  {
    path: '',
    component: SABIKEPartComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEParts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SABIKEPartDetailComponent,
    resolve: {
      sABIKEPart: SABIKEPartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEParts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SABIKEPartUpdateComponent,
    resolve: {
      sABIKEPart: SABIKEPartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEParts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SABIKEPartUpdateComponent,
    resolve: {
      sABIKEPart: SABIKEPartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEParts'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sABIKEPartPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SABIKEPartDeletePopupComponent,
    resolve: {
      sABIKEPart: SABIKEPartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKEParts'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
