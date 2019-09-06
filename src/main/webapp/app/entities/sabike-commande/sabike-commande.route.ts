import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SABIKECommande } from 'app/shared/model/sabike-commande.model';
import { SABIKECommandeService } from './sabike-commande.service';
import { SABIKECommandeComponent } from './sabike-commande.component';
import { SABIKECommandeDetailComponent } from './sabike-commande-detail.component';
import { SABIKECommandeUpdateComponent } from './sabike-commande-update.component';
import { SABIKECommandeDeletePopupComponent } from './sabike-commande-delete-dialog.component';
import { ISABIKECommande } from 'app/shared/model/sabike-commande.model';

@Injectable({ providedIn: 'root' })
export class SABIKECommandeResolve implements Resolve<ISABIKECommande> {
  constructor(private service: SABIKECommandeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISABIKECommande> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SABIKECommande>) => response.ok),
        map((sABIKECommande: HttpResponse<SABIKECommande>) => sABIKECommande.body)
      );
    }
    return of(new SABIKECommande());
  }
}

export const sABIKECommandeRoute: Routes = [
  {
    path: '',
    component: SABIKECommandeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKECommandes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SABIKECommandeDetailComponent,
    resolve: {
      sABIKECommande: SABIKECommandeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKECommandes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SABIKECommandeUpdateComponent,
    resolve: {
      sABIKECommande: SABIKECommandeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKECommandes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SABIKECommandeUpdateComponent,
    resolve: {
      sABIKECommande: SABIKECommandeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKECommandes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sABIKECommandePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SABIKECommandeDeletePopupComponent,
    resolve: {
      sABIKECommande: SABIKECommandeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SABIKECommandes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
