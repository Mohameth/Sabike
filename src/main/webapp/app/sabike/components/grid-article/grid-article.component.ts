import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'app/shared/model/product.model';

@Component({
  selector: 'app-grid-article',
  templateUrl: './grid-article.component.html',
  styleUrls: ['./grid-article.component.scss']
})
export class GridArticleComponent implements OnInit {
  @Input() products: Array<IProduct>;
  constructor() {}

  ngOnInit() {}
}
