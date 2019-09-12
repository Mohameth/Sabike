import { Component, OnInit } from '@angular/core';
import { NavigationServiceService } from 'app/navigation/navigation-service.service';

@Component({
  selector: 'app-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {
  constructor(private service: NavigationServiceService) {}

  ngOnInit() {
    this.service.addFilters();
    // this.service.listenSubject().subscribe(
    //   message => {
    //     console.log('Test', message);
    //   }
    // );
  }
}
