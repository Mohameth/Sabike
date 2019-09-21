import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
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
  private localCart: ICommand;

  // total items count for toolbar
  private totalCount = 0;
  private totalNewCount = new Subject<number>();

  // Sabike <<<<<

  constructor(
    protected http: HttpClient,
    private accountService: AccountService,
    private clientService: ClientService,
    private orderItemsService: OrderItemsService
  ) {
    this.localCart = new Command();
    this.localCart.orderItems = [];
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
  createCommandCart(client: IClient): ICommand {
    return {
      ...new Command(),
      id: undefined,
      state: OrderState.CART,
      orderDate: null,
      totalAmount: 0,
      paymentDate: undefined,
      client: client,
      orderItems: []
    };
  }

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
    return this.localCart;
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

  updateCartProduct(product: IProduct, quantity: number) {
    if (this.accountService.isAuthenticated()) {
      // Check if localCart is not empty, it means we already fetched
      // from remote or already added a product to cart
      console.log('+++++ this.localCart.orderItems.length', this.localCart.orderItems.length);
      if (this.localCart.orderItems.length === 0) {
        // create remote cart
        this.clientService.get(this.accountService.userIdentityId).then(client => {
          console.log('----------------------', client);
          this.createRemoteCart(client).then(() => {
            // we can push an item inside the new cart, but we need to push it to remote
            // so each orderitem has its OWN id
            this.orderItemsService.createAndPushToServer(product, quantity, this.localCart).then(orderItem => {
              // push to cart
              this.localCart.orderItems.push(orderItem);
              // update cart
              this.update(this.localCart)
                .toPromise()
                .then(cartWasUpdated => {
                  console.log('++++++++++++++++++++++++', cartWasUpdated);
                });
            });
          });
        });
      } else {
        console.log('ELSE', this.localCart.orderItems.length);
        // check if there is already this Product inside
        // if yes just add to quantity of the OrderItem
        this.updateToCart(product, quantity);
        this.update(this.localCart)
          .toPromise()
          .then(updatedCart => {
            console.log('++++++++++++++++++++++++', updatedCart);
          })
          .catch(error => console.log(error));
      }
    } else {
      // Local cart only

      // Check if local cart is empty => init localCart
      if (this.localCart.orderItems.length === 0) {
        // then push the OrderItem inside
        // and that's it
      }
    }
    // Update badge  [...].next(...);
  }

  private alreadyInCart(product: IProduct): boolean {
    let itemIndex = 0;
    const itemAlreadyInCart = this.localCart.orderItems.find((element, index, obj) => {
      if (element.product.name === product.name) {
        itemIndex = index;
        return true;
      }
    });
    return false;
  }

  updateToCart(product: IProduct, quantity: number) {
    let itemIndex = 0;
    const itemAlreadyInCart = this.localCart.orderItems.find((element, index, obj) => {
      if (element.product.name === product.name) {
        itemIndex = index;
        return true;
      }
    });

    if (itemAlreadyInCart) {
      console.log('++++++++++++++++++++++++ itemAlreadyInCart');
      // Item is already in cart - do LOCALLY
      if (quantity != 1) {
        this.localCart.orderItems[itemIndex].quantity = quantity;
        this.localCart.orderItems[itemIndex].paidPrice = this.localCart.orderItems[itemIndex].product.price * quantity;
      } else {
        this.localCart.orderItems[itemIndex].quantity++;
        this.localCart.orderItems[itemIndex].paidPrice += this.localCart.orderItems[itemIndex].product.price;
      }
      if (this.accountService.isAuthenticated()) {
        // Item is already in cart - do REMOTELY
        this.update(this.localCart)
          .toPromise()
          .then(updatedCart => {
            console.log('++++++++++++++++++++++++ itemAlreadyInCart updateToCart', updatedCart);
          });
      }
    } else {
      if (this.accountService.isAuthenticated()) {
        // Item is not in cart - do REMOTELY
        this.orderItemsService.createAndPushToServer(product, quantity, this.localCart).then(serverOrderItem => {
          this.localCart.orderItems.push(serverOrderItem);
          this.update(this.localCart)
            .toPromise()
            .then(updatedCart => {
              console.log('++++++++++++++++++++++++ NOT itemAlreadyInCart updateToCart', updatedCart);
            });
        });
      } else {
        // Item is not in cart - do LOCALLY
        // TODO mergeCart when you reconnect (id undefined + create orderItems remotely)
        this.localCart.orderItems.push(this.orderItemsService.createOrderItem(product, quantity, quantity * product.price, this.localCart));
      }
    }

    // Badge
    this.totalCount = 0;
    this.localCart.orderItems.map(item => (this.totalCount += item.quantity));
    this.totalNewCount.next(this.totalCount);
  }

  initCart(loggedIn: boolean, product: IProduct, quantity: number) {
    this.localCart = new Command();
    this.localCart.state = OrderState.CART;
    this.localCart.orderItems = [];
    this.localCart.paymentDate = null;
    this.localCart.totalAmount = 0;
    this.localCart.client = null;

    console.log('IN INITCART');
    if (this.accountService.isAuthenticated()) {
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
              this.orderItemsService.createOrderItem(product, quantity, product.price * quantity, responseServer.body);
            });
        });
    } else {
      // TODO
      this.localCart.id = null;
      console.log('IN INITCART ELSE NOT AUTH');
    }
  }

  // when client has a cart and reconnects
  reloadCart(orderItems: OrderItems[]) {
    console.log('on est dans RELOADCART');
    this.localCart = new Command();
    this.localCart.orderItems = orderItems;

    // update badge
    this.totalCount = 0;
    this.localCart.orderItems.map(item => (this.totalCount += item.quantity));
    this.totalNewCount.next(this.totalCount);
  }

  // when client disconnect
  emptyCart() {
    this.localCart = null;
    this.totalCount = 0;
    this.totalNewCount.next(this.totalCount);
  }

  listenTotalCount(): Observable<any> {
    return this.totalNewCount.asObservable();
  }

  addToLocalCart(item: IOrderItems) {
    this.localCart.orderItems.push(item);
  }

  private createRemoteCart(client: IClient): Promise<ICommand> {
    const localCart = this.createCommandCart(client);
    console.log('++++++++++++++++++++++++ bite', localCart);
    // the cart is created but has no id, will update after
    return this.create(localCart)
      .toPromise()
      .then(serverCart => {
        console.log('++++++++++++++++++++++++ bite du serveur', serverCart);
        // Update local ID
        this.localCart = serverCart.body;
        return Promise.resolve(serverCart.body);
        // then we push orderitems later after the promise
      })
      .catch(error => {
        console.log('++++++++++++++++++++++++ bite du serveur error');
        return Promise.reject(error);
      });
  }
}
