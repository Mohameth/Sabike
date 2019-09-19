import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterEventService {
  private events = new Subject<Observable<Event>>();
  private navEnd = new Subject<NavigationEnd>();

  constructor() {}

  listenEvents(): Observable<any> {
    return this.events.asObservable();
  }

  listenNavigationEndEvent(): Observable<NavigationEnd> {
    return this.navEnd.asObservable();
  }

  handleNavigationEndEvent(event: NavigationEnd) {
    this.navEnd.next(event);
  }

  handleEvents(value) {
    this.events.next(value);
  }
}
