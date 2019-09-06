import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISABIKECart } from 'app/shared/model/sabike-cart.model';

type EntityResponseType = HttpResponse<ISABIKECart>;
type EntityArrayResponseType = HttpResponse<ISABIKECart[]>;

@Injectable({ providedIn: 'root' })
export class SABIKECartService {
  public resourceUrl = SERVER_API_URL + 'api/sabike-carts';

  constructor(protected http: HttpClient) {}

  create(sABIKECart: ISABIKECart): Observable<EntityResponseType> {
    return this.http.post<ISABIKECart>(this.resourceUrl, sABIKECart, { observe: 'response' });
  }

  update(sABIKECart: ISABIKECart): Observable<EntityResponseType> {
    return this.http.put<ISABIKECart>(this.resourceUrl, sABIKECart, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISABIKECart>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISABIKECart[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
