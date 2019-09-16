import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/entities/product';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    this.communication.setSearchedValue(this.searched);

    let numberOfResults = 0;
    this.productService.getProductsNameLike(this.searched).subscribe(msg => {
      this.products = msg.body;

      numberOfResults = this.products.length;
      if (numberOfResults === 1) {
        this.router.navigate([`./search/${this.searched}/${this.products[0].id}`], { relativeTo: this.route });
      } else {
        this.router.navigate([`./search/${this.searched}`], { relativeTo: this.route });
      }
    });
  }

  printValue() {
    console.log(this.searched);
  }
}
