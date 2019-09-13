import { Component, OnInit } from '@angular/core';
import { dataBusService } from 'app/sabike/services/dataBus';
import { CardArticleComponent } from 'app/sabike/components/card-article/card-article.component';

@Component({
  selector: 'app-grid-article',
  templateUrl: './grid-article.component.html',
  styleUrls: ['./grid-article.component.scss']
})
export class GridArticleComponent implements OnInit {
  private listOfItems;
  private listOfCards;
  constructor(private serviceData: dataBusService) {
    console.log('constructing a grid ... ');
    this.listOfCards = [];
    this.serviceData.listenBus().subscribe(m => {
      console.log('Listening to the bus :', m);
      this.listOfItems = m;
    });
  }

  ngOnInit() {
    console.log('grid fetch');
    this.serviceData.getListByCategory(true, '');
    console.log(' --- > ', this.listOfItems);
    for (let d of this.listOfItems) {
      let card = new CardArticleComponent();
      console.log(' **** test *** ', d);
      //card.setData(d);
      this.listOfCards.push(card);
    }
    console.log('data fetched', this.listOfCards);
  }
}
