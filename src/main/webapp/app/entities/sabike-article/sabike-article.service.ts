import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISABIKEArticle } from 'app/shared/model/sabike-article.model';

type EntityResponseType = HttpResponse<ISABIKEArticle>;
type EntityArrayResponseType = HttpResponse<ISABIKEArticle[]>;

@Injectable({ providedIn: 'root' })
export class SABIKEArticleService {
  public resourceUrl = SERVER_API_URL + 'api/sabike-articles';

  constructor(protected http: HttpClient) {}

  create(sABIKEArticle: ISABIKEArticle): Observable<EntityResponseType> {
    return this.http.post<ISABIKEArticle>(this.resourceUrl, sABIKEArticle, { observe: 'response' });
  }

  update(sABIKEArticle: ISABIKEArticle): Observable<EntityResponseType> {
    return this.http.put<ISABIKEArticle>(this.resourceUrl, sABIKEArticle, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISABIKEArticle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISABIKEArticle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
