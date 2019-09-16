import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigation = new Subject<any>();
  private subject = new Subject<boolean>();

  constructor() {}

  selectVelos(value: string) {
    console.log('from service changing');
    this.navigation.next(value);
  }

  listenNavigation(): Observable<any> {
    return this.navigation.asObservable();
  }

  removeFilters() {
    console.log('removing filters');
    this.subject.next(true);
  }

  addFilters() {
    console.log('removing filters');
    this.subject.next(false);
  }

  listenSubject(): Observable<any> {
    return this.subject.asObservable();
  }
}
