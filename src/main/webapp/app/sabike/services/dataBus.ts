import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class dataBusService {
  private bus = new Subject<any>();
  private isBike = Boolean();
  private type = String();

  constructor() {}

  getListByCategory(isBike: boolean, type: string): any {
    console.log('Fetching articles by category');
    //TODO: sql request
    let item1 = {
      title: 'item 1',
      prix: 50,
      enStock: true
    };

    let item2 = {
      title: 'item 2',
      prix: 254,
      enStock: true
    };

    return this.bus.next([item1, item2]);
  }

  listenBus(): Observable<any> {
    return this.bus.asObservable();
  }
}
