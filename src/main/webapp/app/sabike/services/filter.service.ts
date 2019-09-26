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

  listenFilter(): Observable<Filter> {
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

export enum FilterType {
  PRICE,
  BIKE_COLOR,
  BIKE_SIZE,
  STOCK
}

export class Filter {
  typeFilter: FilterType;
  minPrice?: number;
  maxPrice?: number;
  bikeSize?: [string, boolean];
  bikeColor?: [string, boolean];
  brand?: string;
  inStock?: boolean = false;

  constructor(type: FilterType) {
    this.typeFilter = type;
  }
}

export class FilterLabels {
  color?: Array<string>;
  size?: Array<string>;
}
