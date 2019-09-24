import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/entities/product';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CommunicationService } from 'app/sabike/services/communication.service';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searched = '';
  products: IProduct[] = [];
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private communication: CommunicationService
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.productService.getMyProducts().subscribe(msg => {
      this.options = msg.body.map(product => product.name);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getValue() {
    let numberOfResults = 0;
    this.productService
      .getProductsNameLike(this.searched)
      .toPromise()
      .then(msg => {
        numberOfResults = msg.body.length;
        if (numberOfResults === 1) {
          let type = '';
          if (msg.body[0].bikeCategory !== null) {
            type = msg.body[0].bikeCategory.toString();
          } else {
            type = msg.body[0].partCategoryType.toString();
          }
          this.router.navigate([`./articles/details/${type}/${msg.body[0].id}`], { relativeTo: this.route }).then(navigated => {
            if (navigated) {
              this.communication.setSearchedValue(this.searched);
            }
          });
        } else {
          this.router.navigate([`./search/${this.searched}`], { relativeTo: this.route }).then(navigated => {
            if (navigated) {
              this.communication.setSearchedValue(this.searched);
            }
          });
        }
      });
  }

  printValue() {
    console.log(this.searched);
  }
}
