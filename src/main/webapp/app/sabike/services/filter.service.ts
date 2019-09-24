import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filter = new Subject<Filter>();
  private bikeFiltersLabels = new Subject<FilterLabels>();

  constructor() {}

  listenFilter(): Observable<any> {
    return this.filter.asObservable();
  }

  handleFilter(value: Filter) {
    this.filter.next(value);
  }

  listenBikeFiltersLabels(): Observable<FilterLabels> {
    return this.bikeFiltersLabels.asObservable();
  }

  setBikeFiltersLabels(filtersLabels: FilterLabels) {
    this.bikeFiltersLabels.next(filtersLabels);
  }
}

export class Filter {
  minPrice?: number;
  maxPrice?: number;
  bikeSize?: string;
  bikeColor?: string;
  brand?: string;
  inStock?: boolean = false;
}

export class FilterLabels {
  color?: Array<string>;
  size?: Array<string>;
}
