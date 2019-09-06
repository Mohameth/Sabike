import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISABIKEUser } from 'app/shared/model/sabike-user.model';

type EntityResponseType = HttpResponse<ISABIKEUser>;
type EntityArrayResponseType = HttpResponse<ISABIKEUser[]>;

@Injectable({ providedIn: 'root' })
export class SABIKEUserService {
  public resourceUrl = SERVER_API_URL + 'api/sabike-users';

  constructor(protected http: HttpClient) {}

  create(sABIKEUser: ISABIKEUser): Observable<EntityResponseType> {
    return this.http.post<ISABIKEUser>(this.resourceUrl, sABIKEUser, { observe: 'response' });
  }

  update(sABIKEUser: ISABIKEUser): Observable<EntityResponseType> {
    return this.http.put<ISABIKEUser>(this.resourceUrl, sABIKEUser, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISABIKEUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISABIKEUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
