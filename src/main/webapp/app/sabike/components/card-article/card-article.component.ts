import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss']
})
export class CardArticleComponent implements OnInit {
  @Input() product: IProduct;

  constructor(private service: ProductService, private router: Router) {}

  ngOnInit() {
    console.log('++++++++++++++++++++');
    console.log('++++++++++++++++++++');
    console.log('++++++++++++++++++++');
    console.log(this.product);
  }

  onButtonSeeDetailsClick() {
    this.service.requestDetails(this.product);
  }
}
