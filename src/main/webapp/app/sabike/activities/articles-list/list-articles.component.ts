import { Component, OnInit } from '@angular/core';
import { NavigationServiceService } from 'app/navigation/navigation-service.service';
import { ProductService } from 'app/entities/product';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IClient } from 'app/shared/model/client.model';
import { IProduct } from 'app/shared/model/product.model';
import { JhiAlertService } from 'ng-jhipster';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {
  selected: 'option1';
  products: IProduct[];

  constructor(
    private service: NavigationServiceService,
    private productService: ProductService,
    protected jhiAlertService: JhiAlertService,
    private router: Router
  ) {}

  ngOnInit() {
    const parameter = this.router.url.split('/')[2].toLowerCase();
    console.log('+++++++++++++++++++++ ', parameter);
    if (parameter === 'mountain' || parameter === 'road' || parameter === 'bmx' || parameter === 'ebike' || parameter === 'city') {
      this.productService
        .getBikes('ROAD') // TODO not hardcode
        .subscribe(message => {
          this.products = message.body;
        });
    } else {
      // this.productService.getPart(parameter);
    }
    // console.log(hierarchy);
    // console.log(hierarchy[2]);

    // if (hierarchy.length )
    // this.productService.getBikes()
    {
      this.service.addFilters();
    }
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
