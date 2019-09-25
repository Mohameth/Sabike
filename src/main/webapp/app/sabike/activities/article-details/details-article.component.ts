import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from 'app/sabike/services/navigation-service';
import { ProductService } from 'app/entities/product';
import { IProduct, Product } from 'app/shared/model/product.model';
import { Router } from '@angular/router';
import { CommandService } from 'app/entities/command';
import { JhiEventManager } from 'ng-jhipster';
import { CommunicationService } from 'app/sabike/services/communication.service';

@Component({
  selector: 'jhi-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.scss']
})
export class DetailsArticleComponent implements OnInit {
  @Input() product: Product;
  isInStock = 'In stock';
  isDisabled = false;

  constructor(
    private navigationServiceService: NavigationService,
    private productService: ProductService,
    private router: Router,
    private commandService: CommandService,
    private eventManager: JhiEventManager,
    private communication: CommunicationService
  ) {
    //
  }

  ngOnInit() {
    this.navigationServiceService.removeFilters();

    // Load the article details / just a common get from service
    const splitter = this.router.url.split('/');
    // console.log(splitter[splitter.length - 1]);
    this.productService.find(Number(splitter[splitter.length - 1])).subscribe(message => {
      this.product = message.body;
    });

    this.communication.getSearchedValue().subscribe(msg => {
      this.productService
        .getProductsNameLike(msg.valueOf())
        .toPromise()
        .then(message => {
          this.product = message.body[0];
        });
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
          this.product = product.body;
          if (this.product.stock === 0) {
            // out of stock
            this.isDisabled = true;
            this.isInStock = 'Out of stock';
          } else {
            // now we can decrease stock
            this.product.stock = this.product.stock - 1; // locally
            this.productService // then push to server the new stock
              .reserveQuantityProduct(this.product)
              .toPromise()
              .then(response => {
                // once stock is changed add product to cart
                // this.commandService.manageTimer(); // TODO ?
                this.commandService.updateCartProduct(this.product, 1, isInSelect);
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
          message: 'Already 5 ' + this.product.name + ' in the cart.',
          action: 'DISMISS'
        }
      });
    }
  }
}
