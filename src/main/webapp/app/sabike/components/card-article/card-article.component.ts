import { Component, Input, OnInit } from '@angular/core';
import { IProduct, Product } from 'app/shared/model/product.model';
import { CartService } from 'app/entities/cart';
import { ProductService } from 'app/entities/product';
import { timer } from 'rxjs';
import { CommandService } from 'app/entities/command';
import { OrderItemsService } from 'app/entities/order-items';
import { AccountService } from 'app/core';
import { ClientService } from 'app/entities/client';
import { IClient } from 'app/shared/model/client.model';
import { Command, ICommand, OrderState } from 'app/shared/model/command.model';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';

@Component({
  selector: 'jhi-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss']
})
export class CardArticleComponent implements OnInit {
  @Input() product: Product;

  private i_product: IProduct;
  private cart: ICommand;
  isDisabled = false;
  isInStock = 'In stock';

  constructor(
    private productService: ProductService,
    private commandService: CommandService,
    private orderItemService: OrderItemsService,
    private accountService: AccountService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.productService.find(this.product.id).subscribe(message => {
      this.i_product = message.body;
      // now we can decrease
      if (this.i_product.stock === 0) {
        // NOpe
        console.log('++++++ NOPE ++++++');
        this.isInStock = 'Out of stock';
        this.isDisabled = true;
      }
    });
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

  addToCart(productId: number, quantity: number) {
    this.productService.find(productId).subscribe(message => {
      this.i_product = message.body;
      // now we can decrease
      if (this.i_product.stock < quantity) {
        // NOpe
        console.log('++++++ NOPE ++++++');
        this.isDisabled = true;
        this.isInStock = 'Out of stock';
      } else {
        console.log('++++++ WILL DECREASE ++++++');
        this.i_product.stock = this.i_product.stock - quantity;
        this.productService.reserveQuantityProduct(this.i_product).subscribe(response => {
          console.log('++++++ DECREASED ++++++');

          this.commandService.manageTimer();

          // Client
          this.clientService
            .find(this.accountService.userIdentityId)
            .toPromise()
            .then(serverClient => {
              // Cart
              console.log('Found client', serverClient);
              console.log('Now creating a command');
              let localCart = this.createCommandCart(serverClient.body);
              this.commandService
                .create(localCart)
                .toPromise()
                .then(serverCart => {
                  // OrderItem
                  console.log('Command added', serverCart);
                  let localOrderItem = this.createOrderItem(this.i_product, quantity, quantity * this.i_product.price, serverCart.body);
                  this.orderItemService
                    .create(localOrderItem)
                    .toPromise()
                    .then(serverOrderItem => {
                      // Should be done
                      console.log('OrderItem added to Command', serverOrderItem);
                      this.commandService.addToLocalCart(serverOrderItem.body);
                    });
                });
            });

          // this.commandService.addToCart(this.i_product, quantity);

          console.log(response);
        });
      }
    });
  }

  PasDeStock() {}
}
