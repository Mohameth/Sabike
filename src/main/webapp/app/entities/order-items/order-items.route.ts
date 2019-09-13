import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrderItems } from 'app/shared/model/order-items.model';
import { OrderItemsService } from './order-items.service';
import { OrderItemsComponent } from './order-items.component';
import { OrderItemsDetailComponent } from './order-items-detail.component';
import { OrderItemsUpdateComponent } from './order-items-update.component';
import { OrderItemsDeletePopupComponent } from './order-items-delete-dialog.component';
import { IOrderItems } from 'app/shared/model/order-items.model';

@Injectable({ providedIn: 'root' })
export class OrderItemsResolve implements Resolve<IOrderItems> {
  constructor(private service: OrderItemsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrderItems> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OrderItems>) => response.ok),
        map((orderItems: HttpResponse<OrderItems>) => orderItems.body)
      );
    }
    return of(new OrderItems());
  }
}

export const orderItemsRoute: Routes = [
  {
    path: '',
    component: OrderItemsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrderItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrderItemsDetailComponent,
    resolve: {
      orderItems: OrderItemsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrderItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrderItemsUpdateComponent,
    resolve: {
      orderItems: OrderItemsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrderItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrderItemsUpdateComponent,
    resolve: {
      orderItems: OrderItemsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrderItems'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const orderItemsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrderItemsDeletePopupComponent,
    resolve: {
      orderItems: OrderItemsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OrderItems'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
