import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { Command, ICommand, OrderState } from 'app/shared/model/command.model';
import { IProduct } from 'app/shared/model/product.model';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';
import { AccountService } from 'app/core';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';
import { OrderItemsService } from 'app/entities/order-items';

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

  constructor(protected http: HttpClient, private accountService: AccountService, private clientService: ClientService) {
    this.cart = new Command();
    this.cart.orderItems = [];
  }

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

  hasCart(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommand>(`${this.resourceUrl}/${id}/hascart`, { observe: 'response' });
  }

  hasCartAsPromise(id: number): Promise<EntityResponseType> {
    return this.http
      .get<ICommand>(`${this.resourceUrl}/${id}/hascart`, { observe: 'response' })
      .toPromise()
      .then(msg => {
        return Promise.resolve(msg);
      })
      .catch(error => {
        return Promise.reject(error.json().error);
      });
  }

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
    console.log('ADDTOCART in command service');
    let itemAlreadyInCart;
    let itemIndex = 0;

    if (this.cart === null) {
      console.log('cart is null yeah');
      this.initCart(true, product, quantity);
    }

    console.log('AFTER INITCART');

    if (this.cart !== null) {
      itemAlreadyInCart = this.cart.orderItems.find((element, index, obj) => {
        if (element.product.name === product.name) {
          itemIndex = index;
          return true;
        }
      });
    }

    console.log('THIS CART BEFORE IF', this.cart);
    if (itemAlreadyInCart) {
      console.log('IN itemAlreadyInCart');
      this.cart.orderItems[itemIndex].quantity++;
      this.cart.orderItems[itemIndex].paidPrice += this.cart.orderItems[itemIndex].product.price;
    } else {
      console.log('ELSE itemAlreadyInCart');
      this.cart.orderItems.push(new OrderItems(null, quantity, quantity * product.price, this.cart, product));
      console.log('PUSH', this.cart.orderItems);
    }

    // this.totalCount += quantity;
    this.totalCount = 0;
    this.cart.orderItems.map(item => (this.totalCount += item.quantity));
    this.totalNewCount.next(this.totalCount);

    if (this.accountService.isAuthenticated()) {
    }
  }

  updateToCart(product: IProduct, quantity: number) {
    let itemIndex = 0;
    const itemAlreadyInCart = this.cart.orderItems.find((element, index, obj) => {
      if (element.product.name === product.name) {
        itemIndex = index;
        return true;
      }
    });

    if (itemAlreadyInCart) {
      this.cart.orderItems[itemIndex].quantity = quantity;
      this.cart.orderItems[itemIndex].paidPrice = this.cart.orderItems[itemIndex].product.price * quantity;
    } else {
      this.cart.orderItems.push(new OrderItems(null, quantity, quantity * product.price, this.cart, product));
    }

    this.totalCount = 0;
    this.cart.orderItems.map(item => (this.totalCount += item.quantity));
    this.totalNewCount.next(this.totalCount);
  }

  createCommandCart(client1: IClient): ICommand {
    return {
      ...new Command(),
      id: undefined,
      state: OrderState.CART,
      orderDate: null,
      totalAmount: 0,
      paymentDate: undefined,
      client: client1,
      orderItems: []
    };
  }

  createOrderItem(product1: IProduct, quantity1: number, paidPrice1: number, command1: ICommand): IOrderItems {
    return {
      ...new OrderItems(),
      id: undefined,
      quantity: quantity1,
      paidPrice: paidPrice1,
      command: command1,
      product: product1
    };
  }

  initCart(loggedIn: boolean, product: IProduct, quantity: number) {
    this.cart = new Command();
    this.cart.state = OrderState.CART;
    this.cart.orderItems = [];
    this.cart.paymentDate = null;
    this.cart.totalAmount = 0;
    this.cart.client = null;

    console.log('IN INITCART');
    if (this.accountService.isAuthenticated()) {
      console.log('IN INITCART AFTER AUTH');
      // this.hasCart(this.accountService.userIdentityId).subscribe(msg => {
      //   console.log('IN INITCAR AFTER AUTH AFTER HASCART and msg => ', msg);
      //   if (msg.body) {
      //     this.clientService.find(this.accountService.userIdentityId).subscribe(client => {
      //       console.log('on A LE CLIENT! :', client, this.cart);
      //       const createCart = this.createCommandCart(client.body);
      //       console.log('TYPE CART :', typeof this.cart, this.cart);
      //       this.create(createCart).subscribe(message => {
      //         console.log('___________---______ CREATED CART', message);
      //       });
      //     });
      //   }
      // });
      this.clientService
        .find(this.accountService.userIdentityId)
        .toPromise()
        .then(client => {
          console.log('client PROMISE:', client);
          const createCart = this.createCommandCart(client.body);

          this.create(createCart)
            .toPromise()
            .then(responseServer => {
              console.log('Response Server :', responseServer);
              const orderItem = this.createOrderItem(product, quantity, product.price * quantity, responseServer.body);
              // });
              // this.orderitemsService
              //   .create(orderItem)
              //   .toPromise()
              //   .then(orderResponse => {
              //     console.log('order Server :', orderResponse);
              //   });
              // createCart.orderItems.push(orderItem);
              // let serverCart = responseServer.body;
              // let orderItem = this.createOrderItem(product, quantity, product.price * quantity, serverCart);
              // serverCart.orderItems.push(orderItem);
              // this.update(orderItem).toPromise().then( responseItemUpdate => {
              //   console.log('responseItemUpdate :', responseItemUpdate);
              // });
            });
        });
      // this.hasCartAsPromise(this.accountService.userIdentityId)
      //   .then(
      //     hasCartAsPromiseResponse => {
      //       console.log('+++++++++++++++++ PROMISE', hasCartAsPromiseResponse);
      //       if (hasCartAsPromiseResponse === null) {
      //         console.log('+++++++++++++++++ PROMISE 2', hasCartAsPromiseResponse);
      //         // const cartToPush = this.createCommandCart(hasCartAsPromiseResponse);
      //         // this.create(cartToPush).toPromise().then(msg => console.log('AFTER 1st promise :', msg));
      //       }
      //       },
      //     failure => {
      //       console.log('-----------------', failure);
      //     }
      //   );
    } else {
      this.cart.id = null;
      console.log('IN INITCART ELSE NOT AUTH');
    }
    // Cart Time TODO
    // this.cart.expireOn = null;
    // Cart Order Items
  }

  // when client has a cart and reconnects
  reloadCart(orderItems: OrderItems[]) {
    console.log('on est dans RELOADCART');
    this.cart = new Command();
    this.cart.orderItems = orderItems;

    // update badge
    this.totalCount = 0;
    this.cart.orderItems.map(item => (this.totalCount += item.quantity));
    this.totalNewCount.next(this.totalCount);
  }

  // when client disconnect
  emptyCart() {
    this.cart = null;
    this.totalCount = 0;
    this.totalNewCount.next(this.totalCount);
  }

  listenTotalCount(): Observable<any> {
    return this.totalNewCount.asObservable();
  }

  addToLocalCart(item: IOrderItems) {
    this.cart.orderItems.push(item);
  }
}
