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
import { error } from 'util';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss']
})
export class CardArticleComponent implements OnInit {
  @Input() product: Product;

  private i_product: IProduct; // TODO virer le doublon
  isDisabled = false;
  isInStock = 'In stock';

  constructor(private productService: ProductService, private commandService: CommandService, private eventManager: JhiEventManager) {
    //
  }

  ngOnInit() {
    this.productService.find(this.product.id).subscribe(message => {
      this.i_product = message.body;
      // now we can decrease
      if (this.i_product.stock === 0) {
        console.log('++++++ NOPE ++++++');
        this.isInStock = 'Out of stock';
        this.isDisabled = true;
      }
    });
  }

  addToCart(productId: number, isInSelect: boolean) {
    // first check if less than 5
    if (this.commandService.hasLessThanFive(productId)) {
      // now check stock
      // ** in this component the quantity is always one **
      this.productService
        .find(productId)
        .toPromise()
        .then(product => {
          this.i_product = product.body;
          if (this.i_product.stock === 0) {
            // out of stock
            this.isDisabled = true;
            this.isInStock = 'Out of stock';
          } else {
            // now we can decrease stock
            this.i_product.stock = this.i_product.stock - 1; // locally
            this.productService // then push to server the new stock
              .reserveQuantityProduct(this.i_product)
              .toPromise()
              .then(response => {
                // once stock is changed add product to cart
                // this.commandService.manageTimer(); // TODO ?
                this.commandService.updateCartProduct(this.i_product, 1, isInSelect);
              })
              .catch(error => console.log(error));
          }
        })
        .catch(error => console.log(error));
    } else {
      // toast it
      // already 5
      this.eventManager.broadcast({
        name: 'popSnack',
        content: {
          message: 'Already 5 ' + this.i_product.name + ' in the cart.',
          action: 'DISMISS'
        }
      });
    }
  }
}
