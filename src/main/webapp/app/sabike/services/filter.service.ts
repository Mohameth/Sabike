import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filter = new Subject<Filter>();

  constructor() {}

  listenFilter(): Observable<any> {
    return this.filter.asObservable();
  }

  handleFilter(value: Filter) {
    this.filter.next(value);
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
