import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from 'app/sabike/services/navigation-service';
import { ProductService } from 'app/entities/product';
import { IProduct } from 'app/shared/model/product.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { ActivationEnd, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { CommunicationService } from 'app/sabike/services/communication.service';
import { PaginatorCustomComponent } from 'app/sabike/components/paginator-custom/paginator-custom.component';
import { CommandService } from 'app/entities/command';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filter, FilterLabels, FilterService, FilterType } from 'app/sabike/services/filter.service';

@Component({
  selector: 'jhi-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit, AfterViewInit {
  selected = 'ascendingName';
  products: IProduct[];
  allProducts: IProduct[];
  currentFilters: Array<Filter> = new Array<Filter>();
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
      if (m instanceof ActivationEnd) {
        this.fetchProductsWithQuery();
      }

      if (m instanceof NavigationEnd) {
        // Hide loading indicator
        this.navigationService.addBikeFilters();
        this.filterServive.listenFilter().subscribe(newFilter => {
          this.showProducts(this.filter(newFilter));
        });
      }
    });
  }

  filter(newFilter: Filter): IProduct[] {
    // We update our current list of filter
    if (newFilter) {
      this.updateCurrentFilter(newFilter);
    }

    return this.allProducts.filter(
      product => this.crossFilters(this.currentFilters.map(f => this.filterProduct(f, product))) || this.currentFilters.length === 0
    );
  }

  /** Return true if the product meet the criteria of the filter */
  filterProduct(filter: Filter, product: IProduct): boolean {
    return (
      (!filter.minPrice || (filter.minPrice && product.price > filter.minPrice)) && // We include objects with the right prices
      (!filter.maxPrice || (filter.maxPrice && product.price < filter.maxPrice)) &&
      (!filter.bikeColor || (filter.bikeColor[1] && product.bikeColor === filter.bikeColor[0])) && // We add object with right color
      (!filter.bikeSize || (filter.bikeSize[1] && product.bikeSize === filter.bikeSize[0])) &&
      (!filter.inStock || (filter.inStock && product.stock > 0))
    );
  }

  /** Take in input an array of booleans corresponding to the currentFilters (array[i] == true <==> currentFilters[i] met */
  crossFilters(array: Array<boolean>) {
    let meetPriceCriterion: boolean = undefined;
    let meetSizeCriterion: boolean = undefined;
    let meetColorCriterion: boolean = undefined;
    let meetStockCriterion: boolean = undefined;

    let i = 0;
    this.currentFilters.map(f => {
      if (f.typeFilter === FilterType.PRICE) {
        meetPriceCriterion = this.meetCriteria(array[i], meetPriceCriterion);
      } else if (f.typeFilter === FilterType.BIKE_COLOR) {
        meetColorCriterion = this.meetCriteria(array[i], meetColorCriterion);
      } else if (f.typeFilter === FilterType.BIKE_SIZE) {
        meetSizeCriterion = this.meetCriteria(array[i], meetSizeCriterion);
      } else if (f.typeFilter === FilterType.STOCK) {
        meetStockCriterion = this.meetCriteria(array[i], meetStockCriterion);
      }
      i++;
    });

    if (meetPriceCriterion === undefined) {
      meetPriceCriterion = true;
    }
    if (meetColorCriterion === undefined) {
      meetColorCriterion = true;
    }
    if (meetSizeCriterion === undefined) {
      meetSizeCriterion = true;
    }
    if (meetStockCriterion === undefined) {
      meetStockCriterion = true;
    }

    return meetPriceCriterion && meetSizeCriterion && meetColorCriterion && meetStockCriterion;
  }

  private meetCriteria(value: boolean, criteria: boolean): boolean {
    if (value || criteria) {
      return true;
    } else {
      return false;
    }
  }

  updateCurrentFilter(newFilter: Filter) {
    this.currentFilters = this.currentFilters.filter(
      f =>
        !(
          newFilter.typeFilter === f.typeFilter &&
          (f.typeFilter === FilterType.PRICE || // If there is already a price filter we remove it
          (f.typeFilter === FilterType.BIKE_COLOR && f.bikeColor[0] === newFilter.bikeColor[0]) || // if the newFilter refers to the same color
            (f.typeFilter === FilterType.BIKE_SIZE && f.bikeSize[0] === newFilter.bikeSize[0]))
        ) // Or the same size we remove it
    );

    // We don't add the new filter if the checkbox is empty
    if (!((newFilter.bikeSize && newFilter.bikeSize[1] === false) || (newFilter.bikeColor && newFilter.bikeColor[1] === false))) {
      this.currentFilters.push(newFilter);
    }
  }

  ngOnInit(): void {
    this.commandService.popSnackListener().subscribe(next => {
      this.openSnackBar('Added product ' + next.name + ' to cart', 'DISMISS');
    });

    this.commandService.popSnackMessageListener().subscribe(next => {
      this.openSnackBar(next, 'DISMISS');
    });

    this.eventManager.subscribe('popSnack', callback => {
      this.openSnackBar(callback.content.message, callback.content.action);
    });

    this.communication.getSearchedValue().subscribe(msg => {
      this.productService
        .getProductsNameLike(msg.valueOf())
        .toPromise()
        .then(message => {
          // this.products = message.body;
          this.showProducts(message.body);
        });
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
      // this.fetchProductsWithQuery();
      this.setAndShowProducts(this.allProducts);
    });
  }

  setNumberOfItems(number) {
    this.totalNumberOfItems = number;
    this.paginator.setLength(this.totalNumberOfItems);
  }

  setAndShowProducts(products) {
    // We update the products and the paginator
    this.allProducts = products;
    this.showProducts(products);
  }

  showProducts(products) {
    this.setNumberOfItems(products.length);

    // We show the correct number of items
    this.products = products.slice(this.pageIndex * this.pageSize, this.pageSize * (this.pageIndex + 1));
  }

  setBikeFilters() {
    const labels: FilterLabels = new FilterLabels();
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

  changeSorting() {
    console.log(this.selected);
    if (this.selected === 'ascendingPrice') {
      this.allProducts.sort((p1, p2) => p1.price - p2.price);
    } else if (this.selected === 'descendingPrice') {
      this.allProducts.sort((p1, p2) => p2.price - p1.price);
    } else if (this.selected === 'ascendingName') {
      this.allProducts.sort((p1, p2) => {
        const nameP1 = p1.name.toUpperCase();
        const nameP2 = p2.name.toUpperCase();

        if (nameP1 < nameP2) {
          return -1;
        } else if (nameP1 > nameP2) {
          return 1;
        }

        return 0;
      });
    } else if (this.selected === 'descendingName') {
      this.allProducts.sort((p1, p2) => {
        const nameP1 = p1.name.toUpperCase();
        const nameP2 = p2.name.toUpperCase();

        if (nameP1 > nameP2) {
          return -1;
        } else if (nameP1 < nameP2) {
          return 1;
        }

        return 0;
      });
    }

    this.showProducts(this.filter(null));
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
            // this.productService.getAllBikesCount().subscribe(message => {
            //   this.setNumberOfItems(message.body);
            // });
            this.productService.getAllBikes(this.pageIndex, this.pageSize).subscribe(message => {
              this.setAndShowProducts(message.body);
              this.setBikeFilters();
            });
            break;
          // All parts
          case 'parts':
            // this.productService.getAllPartsCount().subscribe(message => {
            //   this.setNumberOfItems(message.body);
            // });
            this.productService.getAllParts(this.pageIndex, this.pageSize).subscribe(message => {
              this.setAndShowProducts(message.body);
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
            this.productService.getBikesByCategoryCount(parameter.toUpperCase()).subscribe(message => {
              this.setNumberOfItems(message.body);
            });
            this.productService.getBikesByCategory(this.pageIndex, this.pageSize, parameter.toUpperCase()).subscribe(message => {
              this.setAndShowProducts(message.body);
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
            // this.productService.getPartsByCategoryCount(parameter.toUpperCase()).subscribe(message => {
            //   this.setNumberOfItems(message.body);
            // });
            this.productService.getPartsByCategory(this.pageIndex, this.pageSize, parameter.toUpperCase()).subscribe(message => {
              this.setAndShowProducts(message.body);
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
            // this.productService.getPartsByCategoryTypeCount(parameter.toUpperCase()).subscribe(message => {
            //   this.setNumberOfItems(message.body);
            // });
            this.productService
              .getPartsByCategoryType(this.pageIndex, this.pageSize, parameter.toUpperCase().replace('-', '_'))
              .subscribe(message => {
                this.setAndShowProducts(message.body);
              });
            break;
        }
        break;
    }
  }
}
