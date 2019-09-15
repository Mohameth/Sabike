import { Component, Input, OnInit } from '@angular/core';
import { dataBusService } from 'app/sabike/services/dataBus';
import { CardArticleComponent } from 'app/sabike/components/card-article/card-article.component';
import { ProductService } from 'app/entities/product';
import { IProduct } from 'app/shared/model/product.model';

@Component({
  selector: 'jhi-grid-article',
  templateUrl: './grid-article.component.html',
  styleUrls: ['./grid-article.component.scss']
})
export class GridArticleComponent implements OnInit {
  @Input() products: IProduct[];

  // private listOfCards;
  constructor(private service: ProductService) {
    // console.log('constructing a grid ... ');
    // this.listOfCards = [];
    this.service.getBikes('ROAD').subscribe(m => {
      // console.log('Listening to the bus :', m);
      this.products = m.body;
    });
  }

  ngOnInit() {
    // console.log('grid fetch');
    // this.serviceData.getListByCategory(true, '');
    // console.log(' --- > ', this.listOfItems);
    // for (let d of this.listOfItems) {
    //   let card = new CardArticleComponent();
    //   console.log(' **** test *** ', d);
    //   //card.setData(d);
    //   this.listOfCards.push(card);
    // }
    // console.log('data fetched', this.listOfCards);
  }
}
