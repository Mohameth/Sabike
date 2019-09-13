import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-article',
  templateUrl: './card-article.component.html',
  styleUrls: ['./card-article.component.scss']
})
export class CardArticleComponent implements OnInit {
  private data: any;
  @Input() item: any;
  constructor() {}

  ngOnInit() {
    console.log('WE ARE IN THE CARD!', this.item);
  }

  setData(dataArticle) {
    this.data = dataArticle;
  }

  onButtonSeeDetailsClick(articleId: number) {}
}
