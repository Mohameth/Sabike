import { Component, Input, OnInit } from '@angular/core';
import { IProduct, Product } from 'app/shared/model/product.model';
import { CartService } from 'app/entities/cart';
import { ProductService } from 'app/entities/product';
import { timer } from 'rxjs';
import { CommandService } from 'app/entities/command';

@Component({
  selector: 'jhi-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss']
})
export class CardArticleComponent implements OnInit {
  @Input() product: Product;

  private i_product: IProduct;
  isDisabled = false;
  isInStock = 'In stock';

  constructor(private productService: ProductService, private commandService: CommandService) {}

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

          this.commandService.addToCart(this.i_product, quantity);

          console.log(response);
        });
      }
    });
  }

  PasDeStock() {}
}
