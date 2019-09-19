import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { Cart, ICart } from 'app/shared/model/cart.model';
import { ProductService } from 'app/entities/product';
import { IProduct } from 'app/shared/model/product.model';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';
import { ICommand } from 'app/shared/model/command.model';
import { AccountService } from 'app/core';

type EntityResponseType = HttpResponse<ICart>;
type EntityArrayResponseType = HttpResponse<ICart[]>;

@Injectable({ providedIn: 'root' })
export class CartService {
  public resourceUrl = SERVER_API_URL + 'api/carts';

  // >>>>> Sabike
  readonly INITIAL_TIME_LEFT_CART: number = 60;
  private timeLeft = -1;
  private interval;
  private _cart: ICart = null;
  private command: ICommand = null;

  // total count for toolbar
  private totalCount = 0;
  private totalNewCount = new Subject<number>();

  // Sabike <<<<<
  constructor(protected http: HttpClient, private productService: ProductService, private accountService: AccountService) {}

  create(cart: ICart): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cart);
    return this.http
      .post<ICart>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cart: ICart): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cart);
    return this.http
      .put<ICart>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICart>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICart[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cart: ICart): ICart {
    const copy: ICart = Object.assign({}, cart, {
      expireOn: cart.expireOn != null && cart.expireOn.isValid() ? cart.expireOn.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.expireOn = res.body.expireOn != null ? moment(res.body.expireOn) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cart: ICart) => {
        cart.expireOn = cart.expireOn != null ? moment(cart.expireOn) : null;
      });
    }
    return res;
  }

  // SABIKE

  get cart(): ICart {
    return this._cart;
  }

  manageTimer() {
    if (this.timeLeft === -1) {
      this.startTimer();
    }
  }

  private startTimer() {
    this.timeLeft = this.INITIAL_TIME_LEFT_CART;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        // console.log('time left .... ', this.timeLeft);
      } else {
        // console.log('time is done.....');
        this.timeLeft = -1;
        // TODO logic quantity ++ and reset CART
        // cartProducts empty it!
      }
    }, 1000);
  }

  addToCart(product: IProduct, quantity: number) {
    if (this._cart === null) {
      this.initCart();
    }

    const i = 0;
    let found = false;

    console.log('AVANT IF length : ', this._cart.orderItem.filter(name => name === product.name).length);

    let itemIndex = 0;
    const itemAlreadyInCart = this._cart.orderItem.find((element, index, obj) => {
      if (element.product.name === product.name) {
        itemIndex = index;
        return true;
      }
    });

    if (itemAlreadyInCart) {
      this._cart.orderItem[itemIndex].quantity++;
    } else {
      this._cart.orderItem.push(
        new OrderItems(
          null,
          quantity,
          quantity * product.price,
          this.command, // TODO
          product
        )
      );
    }

    console.log('BITE', this.totalCount);

    this.totalCount += quantity;
    this.totalNewCount.next(this.totalCount);

    console.log(this._cart);

    if (this.accountService.isAuthenticated()) {
      // save cart to REST
    }
  }

  private initCart() {
    this._cart = new Cart();
    // Cart ID = user id
    if (this.accountService.isAuthenticated()) {
      // this._cart.id = this.accountService.userIdentityId;
    } else {
      this._cart.id = null;
    }
    // Cart Time TODO
    this._cart.expireOn = null;
    // Cart Order Items - niiiice
    this._cart.orderItem = [];
  }

  listenTotalCount(): Observable<any> {
    return this.totalNewCount.asObservable();
  }
}
