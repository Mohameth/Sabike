import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { Account } from 'app/core/user/account.model';
import { JhiTrackerService } from '../tracker/tracker.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private _userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();

  constructor(private http: HttpClient, private trackerService: JhiTrackerService) {}

  fetch(): Observable<HttpResponse<Account>> {
    return this.http.get<Account>(SERVER_API_URL + 'api/account', { observe: 'response' });
  }

  save(account: any): Observable<HttpResponse<any>> {
    return this.http.post(SERVER_API_URL + 'api/account', account, { observe: 'response' });
  }

  authenticate(identity) {
    this._userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this._userIdentity);
  }

  hasAnyAuthority(authorities: string[]): boolean {
    if (!this.authenticated || !this._userIdentity || !this._userIdentity.authorities) {
      return false;
    }

    for (let i = 0; i < authorities.length; i++) {
      if (this._userIdentity.authorities.includes(authorities[i])) {
        return true;
      }
    }

    return false;
  }

  hasAuthority(authority: string): Promise<boolean> {
    if (!this.authenticated) {
      return Promise.resolve(false);
    }

    return this.identity().then(
      id => {
        return Promise.resolve(id.authorities && id.authorities.includes(authority));
      },
      () => {
        return Promise.resolve(false);
      }
    );
  }

  identity(force?: boolean): Promise<Account> {
    if (force) {
      this._userIdentity = undefined;
    }

    // check and see if we have retrieved the userIdentity data from the server.
    // if we have, reuse it by immediately resolving
    if (this._userIdentity) {
      return Promise.resolve(this._userIdentity);
    }

    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.fetch()
      .toPromise()
      .then(response => {
        const account: Account = response.body;
        if (account) {
          this._userIdentity = account;
          this.authenticated = true;
          this.trackerService.connect();
          console.log('============>', this._userIdentity);
        } else {
          this._userIdentity = null;
          this.authenticated = false;
        }
        this.authenticationState.next(this._userIdentity);
        return this._userIdentity;
      })
      .catch(err => {
        if (this.trackerService.stompClient && this.trackerService.stompClient.connected) {
          this.trackerService.disconnect();
        }
        this._userIdentity = null;
        this.authenticated = false;
        this.authenticationState.next(this._userIdentity);
        return null;
      });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(): boolean {
    return this._userIdentity !== undefined;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  getImageUrl(): string {
    return this.isIdentityResolved() ? this._userIdentity.imageUrl : null;
  }

  // SABIKE
  get userIdentityId(): number {
    return this._userIdentity.id;
  }

  // set userIdentity(value: any) {
  //   this._userIdentity = value;
  // }
}
