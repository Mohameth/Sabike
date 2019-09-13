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
  selector: 'app-articles',
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
    // console.log('================================================ 1');
    this.productService
      .query()
      .pipe(
        filter((res: HttpResponse<IProduct[]>) => res.ok),
        map((res: HttpResponse<IProduct[]>) => res.body)
      )
      .subscribe(
        (res: IProduct[]) => {
          this.products = res;
          console.log('================================================ 2');
          console.log(this.products);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    // this.productService.find(1).subscribe(
    //   message => console.log(message)
    // );

    // console.log();
    const parameter = this.router.url.split('/')[2];
    if (parameter === 'VTT' || parameter === 'Route') {
      // this.productService
      //   .getBikes('ROAD')
      //   // .pipe(
      //   //   filter((res: HttpResponse<IProduct[]>) => res.ok),
      //   //   map((res: HttpResponse<IProduct[]>) => res.body)
      //   // )
      //   .subscribe(
      //     message => {
      //       console.log(message);
      //     }
      //   );
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
