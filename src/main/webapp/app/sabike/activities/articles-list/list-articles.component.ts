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
    const parameter = this.router.url.split('/')[2];
    console.log('+++++++++++++++++++++ ', parameter);

    // Navigation switch
    switch (parameter) {
      // Bikes categories
      case 'mountain':
      case 'road':
      case 'city':
      case 'ebike':
      case 'bmx':
        this.productService.getBikes(parameter.toLocaleUpperCase()).subscribe(message => {
          this.products = message.body;
        });
        break;

      // Parts - Steering (direction en fr)
      case 'stems': {
        break;
      }
      case 'handlebars': {
        break;
      }
      case 'headset': {
        break;
      }
      // Parts - Saddle / seatpost (assise en fr)
      case 'saddle': {
        break;
      }
      case 'seat-posts': {
        break;
      }
      case 'seat-clamps': {
        break;
      }
      // Parts - Drivetrain
      case 'derailleur': {
        break;
      }
      case 'chains': {
        break;
      }
      case 'cranksets': {
        break;
      }
      case 'pedals': {
        break;
      }
      case 'straps': {
        break;
      }
      // Parts - Wheels / tyres
      case 'tyres': {
        break;
      }
      case 'alloy-carbon-wheels': {
        break;
      }
      case 'wire-spoked-wheels': {
        break;
      }
      case 'boyaux': {
        break;
      }
      // Parts - Brakes
      case 'brake-levers': {
        break;
      }
      case 'brake-cables': {
        break;
      }
      case 'brake-calipers': {
        break;
      }
      case 'brake-pads': {
        break;
      }
      // Parts - Frames / Forks
      case 'frame-kits': {
        break;
      }
      case 'frames': {
        break;
      }
      case 'forks': {
        break;
      }
    }
    if (parameter === 'mountain' || parameter === 'road' || parameter === 'bmx' || parameter === 'ebike' || parameter === 'city') {
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
