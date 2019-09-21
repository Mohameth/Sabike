import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';
import { IProduct } from 'app/shared/model/product.model';
import { ICommand } from 'app/shared/model/command.model';

type EntityResponseType = HttpResponse<IOrderItems>;
type EntityArrayResponseType = HttpResponse<IOrderItems[]>;

@Injectable({ providedIn: 'root' })
export class OrderItemsService {
  public resourceUrl = SERVER_API_URL + 'api/order-items';

  constructor(protected http: HttpClient) {}

  create(orderItems: IOrderItems): Observable<EntityResponseType> {
    return this.http.post<IOrderItems>(this.resourceUrl, orderItems, { observe: 'response' });
  }

  update(orderItems: IOrderItems): Observable<EntityResponseType> {
    return this.http.put<IOrderItems>(this.resourceUrl, orderItems, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrderItems>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrderItems[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  // Sabike
  createOrderItem(product: IProduct, quantity: number, paidPrice: number, command: ICommand): IOrderItems {
    return {
      ...new OrderItems(),
      id: undefined,
      quantity: quantity,
      paidPrice: paidPrice,
      command: command,
      product: product
    };
  }

  createAndPushToServer(product: IProduct, quantity: number, localCart: ICommand): Promise<IOrderItems> {
    let localOrderItem = this.createOrderItem(product, quantity, product.price * quantity, localCart);
    return this.create(localOrderItem)
      .toPromise()
      .then(serverOrderItem => {
        return Promise.resolve(serverOrderItem.body);
        // then we push orderitems later after the promise
      })
      .catch(error => {
        console.log('++++++++++++++++++++++++ order error');
        return Promise.reject(error);
      });
  }
}
