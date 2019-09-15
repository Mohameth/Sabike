import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'app/shared/model/product.model';

@Component({
  selector: 'jhi-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss']
})
export class CardArticleComponent implements OnInit {
  @Input() product: IProduct;
  constructor() {}

  ngOnInit() {}

  onButtonSeeDetailsClick(articleId: number) {}
}
