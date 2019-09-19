import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private searchedValue = new Subject<string>();

  constructor() {}

  setSearchedValue(searched: string) {
    this.searchedValue.next(searched);
  }

  getSearchedValue(): Observable<string> {
    return this.searchedValue.asObservable();
  }
}
