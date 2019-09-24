import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavigationPanelComponent } from 'app/sabike/components/navigationpanel/navigation-panel.component';
import { Breadcrumb } from 'app/sabike/components/breadcrumb/breadcrumb.component';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigation = new Subject<any>();
  private subjectBreadcrumb = new Subject<any>();
  private subject = new Subject<String>();
  private requestLoginFromCheckout = false;

  constructor() {}

  expandCategory(value: string) {
    this.navigation.next(value);
  }

  listenNavigation(): Observable<any> {
    return this.navigation.asObservable();
  }

  removeFilters() {
    console.log('removing filters');
    this.subject.next(null);
  }

  addBikeFilters() {
    console.log('adding bike filters');
    this.subject.next('bike');
  }

  addPartFilters() {
    console.log('adding part filters');
    this.subject.next('part');
  }

  listenSubject(): Observable<any> {
    return this.subject.asObservable();
  }

  listenBreadcrumb(): Observable<any> {
    return this.subjectBreadcrumb.asObservable();
  }

  handleBreadcrumb(breadcrumbs: Breadcrumb[]) {
    this.subjectBreadcrumb.next(breadcrumbs);
  }

  requestLoginFromCheckoutCall(request: boolean) {
    this.requestLoginFromCheckout = request;
  }

  checkIfLoginFromCheckoutCall() {
    return this.requestLoginFromCheckout;
  }
}
