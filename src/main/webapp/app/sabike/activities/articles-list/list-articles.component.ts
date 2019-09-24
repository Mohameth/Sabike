import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from 'app/sabike/services/navigation-service';
import { ProductService } from 'app/entities/product';
import { IProduct } from 'app/shared/model/product.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { CommunicationService } from 'app/sabike/services/communication.service';
import { NavigationError, NavigationStart } from '@angular/router';
import { PaginatorCustomComponent } from 'app/sabike/components/paginator-custom/paginator-custom.component';
import { CommandService } from 'app/entities/command';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilterLabels, FilterService } from 'app/sabike/services/filter.service';

@Component({
  selector: 'jhi-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit, AfterViewInit {
  selected: 'option1';
  products: IProduct[];
  productsBackup: IProduct[];
  private pageIndex = 0;
  private pageSize = 10;
  private totalNumberOfItems = -1;

  @ViewChild('p1', { static: false }) paginator: PaginatorCustomComponent;

  constructor(
    private productService: ProductService,
    protected jhiAlertService: JhiAlertService,
    private communication: CommunicationService,
    private navigationService: NavigationService,
    private filterServive: FilterService,
    private router: Router,
    private commandService: CommandService,
    private _snackBar: MatSnackBar,
    private eventManager: JhiEventManager
  ) {
    this.router.events.subscribe(m => {
      if (m instanceof NavigationStart) {
        // Show loading indicator
      }
      if (m instanceof ActivationEnd) {
        this.fetchProductsWithQuery();
      }

      if (m instanceof NavigationEnd) {
        // Hide loading indicator
        this.navigationService.addBikeFilters();
        this.filterServive.listenFilter().subscribe(m => {
          if (!this.productsBackup || this.productsBackup.length < this.products.length) this.productsBackup = this.products;
          console.log('filter processing ...', m);

          this.products = this.productsBackup.filter(
            product =>
              (!m.minPrice || (m.minPrice && product.price > m.minPrice)) &&
              (!m.maxPrice || (m.maxPrice && product.price < m.maxPrice)) &&
              (!m.bikeColor || (m.bikeColor && product.bikeColor === m.bikeColor)) &&
              (!m.bikeSize || (m.bikeSize && product.bikeSize === m.bikeSize)) &&
              (!m.inStock || (m.inStock && product.stock > 0))
          );

          console.log('Done with the filters', this.products);
        });
      }

      if (m instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(m.error);
      }
    });
  }

  ngOnInit(): void {
    this.communication.getSearchedValue().subscribe(msg => {
      if (this.router.url.split('/')[1] === 'search') {
        this.productService.getProductsNameLike(msg.valueOf()).subscribe(message => {
          this.products = message.body;
          console.log('msg value of : ', msg.valueOf());
          console.log('IN LIST message : ', message);
        });
      }
    });

    this.commandService.popSnackListener().subscribe(next => {
      this.openSnackBar('Added product ' + next.name + ' to cart', 'DISMISS');
    });

    this.eventManager.subscribe('popSnack', callback => {
      this.openSnackBar(callback.content.message, callback.content.action);
    });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000
    });
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  ngAfterViewInit(): void {
    this.paginator.event.subscribe(pageEvent => {
      this.pageSize = pageEvent.pageSize;
      this.pageIndex = pageEvent.pageIndex;
      this.fetchProductsWithQuery();
    });
  }

  setNumberOfItems(number) {
    this.totalNumberOfItems = number;
    this.paginator.setLength(this.totalNumberOfItems);
  }

  setBikeFilters() {
    let labels: FilterLabels = new FilterLabels();
    labels.color = new Array<string>();
    labels.size = new Array<string>();

    this.products.map(product => {
      if (labels.color.indexOf(product.bikeColor) < 0) {
        labels.color.push(product.bikeColor);
      }
      if (labels.size.indexOf(product.bikeSize) < 0) {
        labels.size.push(product.bikeSize);
      }
    });
    labels.color = labels.color.sort();
    labels.size = labels.size.sort();
    this.filterServive.setBikeFiltersLabels(labels);
  }

  fetchProductsWithQuery() {
    // LOAD here
    // sabike.com/articles/Bikes --> level 3, .../Parts/Steering --> level 4, etc.
    const levelOfRedirection = this.router.url.split('/').length;
    const parameter = this.router.url.split('/').reverse()[0];
    // Navigation switch
    switch (levelOfRedirection) {
      case 3:
        switch (parameter) {
          // All bikes
          case 'bikes':
            this.productService.getAllBikesCount().subscribe(message => {
              this.setNumberOfItems(message.body);
            });
            this.productService.getAllBikes(this.pageIndex, this.pageSize).subscribe(message => {
              this.products = message.body;
              this.setBikeFilters();
            });
            break;
          // All parts
          case 'parts':
            this.productService.getAllPartsCount().subscribe(message => {
              this.setNumberOfItems(message.body);
            });
            this.productService.getAllParts(this.pageIndex, this.pageSize).subscribe(message => {
              this.products = message.body;
            });
            break;
        }
        break;
      case 4:
        switch (parameter) {
          // Bikes category
          case 'mountain':

          case 'road':
          case 'city':
          case 'ebike':
          case 'bmx':
            console.log(parameter.toUpperCase());
            this.productService.getBikesByCategoryCount(parameter.toUpperCase()).subscribe(message => {
              this.setNumberOfItems(message.body);
            });
            this.productService.getBikesByCategory(this.pageIndex, this.pageSize, parameter.toUpperCase()).subscribe(message => {
              this.products = message.body;
              this.setBikeFilters();
            });
            break;
          // Parts category
          case 'steering':
          case 'saddle':
          case 'drivetrain':
          case 'wheels':
          case 'brakes':
          case 'frames':
            this.productService.getPartsByCategoryCount(parameter.toUpperCase()).subscribe(message => {
              this.setNumberOfItems(message.body);
            });
            this.productService.getPartsByCategory(this.pageIndex, this.pageSize, parameter.toUpperCase()).subscribe(message => {
              this.products = message.body;
            });
            break;
        }
        break;
      case 5:
        switch (parameter) {
          // Parts - Steering (direction en fr)
          case 'stems':
          case 'handlebars':
          case 'headset':
          // Parts - Saddle / seatpost (assise en fr)
          case 'saddle':
          case 'seat-post':
          case 'seat-clamp':
          // Parts - Drivetrain
          case 'derailleur':
          case 'chains':
          case 'cranksets':
          case 'pedals':
          case 'straps':
          // Parts - Wheels / tyres
          case 'tyres':
          case 'alloy-carbon-wheels':
          case 'wire-spoked-wheels':
          case 'boyaux':
          // Parts - Brakes
          case 'brake-levers':
          case 'brake-cables':
          case 'brake-calipers':
          case 'brake-pads':
          // Parts - Frames / Forks
          case 'frame-kits':
          case 'frames':
          case 'forks':
            this.productService.getPartsByCategoryTypeCount(parameter.toUpperCase()).subscribe(message => {
              this.setNumberOfItems(message.body);
            });
            this.productService
              .getPartsByCategoryType(this.pageIndex, this.pageSize, parameter.toUpperCase().replace('-', '_'))
              .subscribe(message => {
                this.products = message.body;
              });
            break;
        }
        break;
    }
  }
}
