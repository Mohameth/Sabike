/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SABIKECommandeService } from 'app/entities/sabike-commande/sabike-commande.service';
import { ISABIKECommande, SABIKECommande, SABIKECommandeStatus } from 'app/shared/model/sabike-commande.model';

describe('Service Tests', () => {
  describe('SABIKECommande Service', () => {
    let injector: TestBed;
    let service: SABIKECommandeService;
    let httpMock: HttpTestingController;
    let elemDefault: ISABIKECommande;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(SABIKECommandeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new SABIKECommande(0, 0, 'AAAAAAA', SABIKECommandeStatus.PENDING, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            orderDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a SABIKECommande', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            orderDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            orderDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new SABIKECommande(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a SABIKECommande', async () => {
        const returnedFromService = Object.assign(
          {
            orderId: 1,
            number: 'BBBBBB',
            status: 'BBBBBB',
            orderDate: currentDate.format(DATE_FORMAT),
            orderItems: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            orderDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of SABIKECommande', async () => {
        const returnedFromService = Object.assign(
          {
            orderId: 1,
            number: 'BBBBBB',
            status: 'BBBBBB',
            orderDate: currentDate.format(DATE_FORMAT),
            orderItems: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            orderDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SABIKECommande', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
