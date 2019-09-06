/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { SABIKEUserService } from 'app/entities/sabike-user/sabike-user.service';
import { ISABIKEUser, SABIKEUser } from 'app/shared/model/sabike-user.model';

describe('Service Tests', () => {
  describe('SABIKEUser Service', () => {
    let injector: TestBed;
    let service: SABIKEUserService;
    let httpMock: HttpTestingController;
    let elemDefault: ISABIKEUser;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(SABIKEUserService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new SABIKEUser(
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a SABIKEUser', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new SABIKEUser(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a SABIKEUser', async () => {
        const returnedFromService = Object.assign(
          {
            userId: 1,
            password: 'BBBBBB',
            email: 'BBBBBB',
            first: 'BBBBBB',
            last: 'BBBBBB',
            isAdmin: true,
            deliveryAddressNumber: 'BBBBBB',
            deliveryAddressStreet: 'BBBBBB',
            deliveryAddressCity: 'BBBBBB',
            deliveryAddressPostalCode: 'BBBBBB',
            deliveryAddressCountry: 'BBBBBB',
            billingAddressNumber: 'BBBBBB',
            billingAddressStreet: 'BBBBBB',
            billingAddressCity: 'BBBBBB',
            billingAddressPostalCode: 'BBBBBB',
            billingAddressCountry: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of SABIKEUser', async () => {
        const returnedFromService = Object.assign(
          {
            userId: 1,
            password: 'BBBBBB',
            email: 'BBBBBB',
            first: 'BBBBBB',
            last: 'BBBBBB',
            isAdmin: true,
            deliveryAddressNumber: 'BBBBBB',
            deliveryAddressStreet: 'BBBBBB',
            deliveryAddressCity: 'BBBBBB',
            deliveryAddressPostalCode: 'BBBBBB',
            deliveryAddressCountry: 'BBBBBB',
            billingAddressNumber: 'BBBBBB',
            billingAddressStreet: 'BBBBBB',
            billingAddressCity: 'BBBBBB',
            billingAddressPostalCode: 'BBBBBB',
            billingAddressCountry: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
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

      it('should delete a SABIKEUser', async () => {
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
