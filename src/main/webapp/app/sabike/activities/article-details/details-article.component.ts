import { Component, Input, OnInit } from '@angular/core';
import { NavigationServiceService } from 'app/navigation/navigation-service.service';
import { ProductService } from 'app/entities/product';
import { IProduct, Product } from 'app/shared/model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.scss']
})
export class DetailsArticleComponent implements OnInit {
  selectedQuantity = '1';

  @Input() private product: Product;

  constructor(private navigationServiceService: NavigationServiceService, private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.navigationServiceService.removeFilters();

    // Load the article details / just a common get from service
    const splitter = this.router.url.split('/');
    // console.log(splitter[splitter.length - 1]);
    this.productService.find(Number(splitter[splitter.length - 1])).subscribe(message => {
      this.product = message.body;
    });
  }
}
