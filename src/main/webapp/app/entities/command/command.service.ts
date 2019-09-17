import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { Command, ICommand } from 'app/shared/model/command.model';
import { IProduct } from 'app/shared/model/product.model';
import { OrderItems } from 'app/shared/model/order-items.model';
import { AccountService } from 'app/core';

type EntityResponseType = HttpResponse<ICommand>;
type EntityArrayResponseType = HttpResponse<ICommand[]>;

@Injectable({ providedIn: 'root' })
export class CommandService {
  public resourceUrl = SERVER_API_URL + 'api/commands';

  // >>>>> Sabike
  // Timer
  readonly INITIAL_TIME_LEFTcart: number = 60;
  private timeLeft = -1;
  private interval;

  // Cart - will become command once state will change
  private cart: ICommand = null;

  // total items count for toolbar
  private totalCount = 0;
  private totalNewCount = new Subject<number>();

  // Sabike <<<<<

  constructor(protected http: HttpClient, private accountService: AccountService) {}

  create(command: ICommand): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(command);
    return this.http
      .post<ICommand>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(command: ICommand): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(command);
    return this.http
      .put<ICommand>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICommand>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommand[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(command: ICommand): ICommand {
    const copy: ICommand = Object.assign({}, command, {
      orderDate: command.orderDate != null && command.orderDate.isValid() ? command.orderDate.format(DATE_FORMAT) : null,
      paymentDate: command.paymentDate != null && command.paymentDate.isValid() ? command.paymentDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.orderDate = res.body.orderDate != null ? moment(res.body.orderDate) : null;
      res.body.paymentDate = res.body.paymentDate != null ? moment(res.body.paymentDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((command: ICommand) => {
        command.orderDate = command.orderDate != null ? moment(command.orderDate) : null;
        command.paymentDate = command.paymentDate != null ? moment(command.paymentDate) : null;
      });
    }
    return res;
  }

  // SABIKE

  get getCart(): ICommand {
    return this.cart;
  }

  manageTimer() {
    if (this.timeLeft === -1) {
      this.startTimer();
    }
  }

  private startTimer() {
    this.timeLeft = this.INITIAL_TIME_LEFTcart;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        console.log('time left .... ', this.timeLeft);
      } else {
        console.log('time is done.....');
        this.timeLeft = -1;
        // TODO logic quantity ++ and reset CART
        // cartProducts empty it!
      }
    }, 1000);
  }

  addToCart(product: IProduct, quantity: number) {
    if (this.cart === null) {
      this.initCart();
    }

    let i = 0;
    let found = false;

    let itemIndex = 0;
    let itemAlreadyInCart = this.cart.orderItems.find((element, index, obj) => {
      if (element.product.name === product.name) {
        itemIndex = index;
        return true;
      }
    });

    if (itemAlreadyInCart) {
      this.cart.orderItems[itemIndex].quantity++;
    } else {
      this.cart.orderItems.push(new OrderItems(null, quantity, quantity * product.price, this.cart, product));
    }

    this.totalCount += quantity;
    this.totalNewCount.next(this.totalCount);

    if (this.accountService.isAuthenticated()) {
      // save cart to REST
    }
  }

  private initCart() {
    this.cart = new Command();
    // Cart ID = user id
    if (this.accountService.isAuthenticated()) {
      this.cart.id = this.accountService.userIdentityId;
    } else {
      this.cart.id = null;
    }
    // Cart Time TODO
    // this.cart.expireOn = null;
    // Cart Order Items
    this.cart.orderItems = [];
  }

  listenTotalCount(): Observable<any> {
    return this.totalNewCount.asObservable();
  }
}
