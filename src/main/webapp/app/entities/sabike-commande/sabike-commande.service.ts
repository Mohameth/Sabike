import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISABIKECommande } from 'app/shared/model/sabike-commande.model';

type EntityResponseType = HttpResponse<ISABIKECommande>;
type EntityArrayResponseType = HttpResponse<ISABIKECommande[]>;

@Injectable({ providedIn: 'root' })
export class SABIKECommandeService {
  public resourceUrl = SERVER_API_URL + 'api/sabike-commandes';

  constructor(protected http: HttpClient) {}

  create(sABIKECommande: ISABIKECommande): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sABIKECommande);
    return this.http
      .post<ISABIKECommande>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sABIKECommande: ISABIKECommande): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sABIKECommande);
    return this.http
      .put<ISABIKECommande>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISABIKECommande>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISABIKECommande[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(sABIKECommande: ISABIKECommande): ISABIKECommande {
    const copy: ISABIKECommande = Object.assign({}, sABIKECommande, {
      orderDate:
        sABIKECommande.orderDate != null && sABIKECommande.orderDate.isValid() ? sABIKECommande.orderDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.orderDate = res.body.orderDate != null ? moment(res.body.orderDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((sABIKECommande: ISABIKECommande) => {
        sABIKECommande.orderDate = sABIKECommande.orderDate != null ? moment(sABIKECommande.orderDate) : null;
      });
    }
    return res;
  }
}
