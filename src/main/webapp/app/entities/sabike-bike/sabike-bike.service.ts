import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISABIKEBike } from 'app/shared/model/sabike-bike.model';

type EntityResponseType = HttpResponse<ISABIKEBike>;
type EntityArrayResponseType = HttpResponse<ISABIKEBike[]>;

@Injectable({ providedIn: 'root' })
export class SABIKEBikeService {
  public resourceUrl = SERVER_API_URL + 'api/sabike-bikes';

  constructor(protected http: HttpClient) {}

  create(sABIKEBike: ISABIKEBike): Observable<EntityResponseType> {
    return this.http.post<ISABIKEBike>(this.resourceUrl, sABIKEBike, { observe: 'response' });
  }

  update(sABIKEBike: ISABIKEBike): Observable<EntityResponseType> {
    return this.http.put<ISABIKEBike>(this.resourceUrl, sABIKEBike, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISABIKEBike>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISABIKEBike[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
