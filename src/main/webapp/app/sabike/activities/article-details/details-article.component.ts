import { Component, OnInit } from '@angular/core';
import { NavigationServiceService } from 'app/navigation/navigation-service.service';

@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.scss']
})
export class DetailsArticleComponent implements OnInit {
  selectedQuantity = '1';

  constructor(private navigationServiceService: NavigationServiceService) {}

  ngOnInit() {
    this.navigationServiceService.removeFilters();
  }
}
