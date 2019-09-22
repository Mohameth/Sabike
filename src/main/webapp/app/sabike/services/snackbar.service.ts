import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JhiEventManager } from 'ng-jhipster';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar, private eventManager: JhiEventManager) {
    eventManager.subscribe('popSnack', callback => {
      console.log('In SnackbarService ', callback);
    });
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
