import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISABIKEPart } from 'app/shared/model/sabike-part.model';

type EntityResponseType = HttpResponse<ISABIKEPart>;
type EntityArrayResponseType = HttpResponse<ISABIKEPart[]>;

@Injectable({ providedIn: 'root' })
export class SABIKEPartService {
  public resourceUrl = SERVER_API_URL + 'api/sabike-parts';

  constructor(protected http: HttpClient) {}

  create(sABIKEPart: ISABIKEPart): Observable<EntityResponseType> {
    return this.http.post<ISABIKEPart>(this.resourceUrl, sABIKEPart, { observe: 'response' });
  }

  update(sABIKEPart: ISABIKEPart): Observable<EntityResponseType> {
    return this.http.put<ISABIKEPart>(this.resourceUrl, sABIKEPart, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISABIKEPart>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISABIKEPart[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
