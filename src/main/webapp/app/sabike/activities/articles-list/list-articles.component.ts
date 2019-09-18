import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'app/sabike/services/navigation-service';
import { ProductService } from 'app/entities/product';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IClient } from 'app/shared/model/client.model';
import { IProduct } from 'app/shared/model/product.model';
import { JhiAlertService } from 'ng-jhipster';
import {
  ActivationEnd,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  ResolveEnd,
  ResolveStart,
  Router,
  RoutesRecognized
} from '@angular/router';

@Component({
  selector: 'jhi-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {
  selected: 'option1';
  products: IProduct[];

  constructor(
    private navigationService: NavigationService,
    private productService: ProductService,
    protected jhiAlertService: JhiAlertService,
    private router: Router
  ) {
    this.router.events.subscribe(m => {
      if (m instanceof NavigationStart) {
        // Show loading indicator
      }
      if (m instanceof ActivationEnd) {
        // LOAD here
        const parameter = this.router.url.split('/').reverse()[0];
        // Navigation switch
        switch (parameter) {
          // Bikes categories
          case 'bikes':
            this.productService.getAllBikes().subscribe(message => {
              this.products = message.body;
            });
            break;
          case 'parts':
            this.productService.getAllParts().subscribe(message => {
              this.products = message.body;
            });
            break;
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
      }

      if (m instanceof NavigationEnd) {
        // Hide loading indicator
        this.navigationService.addFilters();
      }

      if (m instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(m.error);
      }
    });
  }

  ngOnInit() {
    //this.navigationService.getBreadcrumb();
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
