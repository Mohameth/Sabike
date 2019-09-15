import { Component, Input, OnInit } from '@angular/core';
import { IProduct, Product } from 'app/shared/model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss']
})
export class CardArticleComponent implements OnInit {
  @Input() product: IProduct;

  constructor(private router: Router) {}

  ngOnInit() {}

  // setData(dataArticle) {
  //   this.data = dataArticle;
  // }

  onButtonSeeDetailsClick(articleId: number) {}

  testRouter() {
    console.log(this.router.url);
    console.log(this.router.url.length);
    console.log(this.router.url.split('/').length);
  }
}
