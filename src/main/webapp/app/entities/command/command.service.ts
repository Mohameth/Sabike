import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICommand } from 'app/shared/model/command.model';

type EntityResponseType = HttpResponse<ICommand>;
type EntityArrayResponseType = HttpResponse<ICommand[]>;

@Injectable({ providedIn: 'root' })
export class CommandService {
  public resourceUrl = SERVER_API_URL + 'api/commands';

  constructor(protected http: HttpClient) {}

  create(command: ICommand): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(command);
    return this.http
      .post<ICommand>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(command: ICommand): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(command);
    return this.http
      .put<ICommand>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICommand>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommand[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(command: ICommand): ICommand {
    const copy: ICommand = Object.assign({}, command, {
      orderDate: command.orderDate != null && command.orderDate.isValid() ? command.orderDate.format(DATE_FORMAT) : null,
      paymentDate: command.paymentDate != null && command.paymentDate.isValid() ? command.paymentDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.orderDate = res.body.orderDate != null ? moment(res.body.orderDate) : null;
      res.body.paymentDate = res.body.paymentDate != null ? moment(res.body.paymentDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((command: ICommand) => {
        command.orderDate = command.orderDate != null ? moment(command.orderDate) : null;
        command.paymentDate = command.paymentDate != null ? moment(command.paymentDate) : null;
      });
    }
    return res;
  }
}
