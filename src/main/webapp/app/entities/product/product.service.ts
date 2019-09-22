import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProduct } from 'app/shared/model/product.model';
import { ICart } from 'app/shared/model/cart.model';

type EntityResponseType = HttpResponse<IProduct>;
type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProductService {
  public resourceUrl = SERVER_API_URL + 'api/products';
  private currentProduct = new Subject<IProduct>();

  constructor(protected http: HttpClient) {}

  create(product: IProduct): Observable<EntityResponseType> {
    return this.http.post<IProduct>(this.resourceUrl, product, { observe: 'response' });
  }

  update(product: IProduct): Observable<EntityResponseType> {
    return this.http.put<IProduct>(this.resourceUrl, product, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  // SABIKE

  getBikesByCategory(page: number, size: number, category: string): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/bybikecategory/${category}?page=${page}&size=${size}`, { observe: 'response' });
  }

  getBikesByCategoryCount(category: string): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/bybikecategory/${category}/count`, { observe: 'response' });
  }

  getAllBikes(page: number, size: number): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/bikes/all?page=${page}&size=${size}`, { observe: 'response' });
  }

  getAllBikesCount(): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/bikes/all/count`, { observe: 'response' });
  }

  getPartsByCategory(page: number, size: number, category: string): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/bypartcategory/${category}?page=${page}&size=${size}`, { observe: 'response' });
  }

  getPartsByCategoryCount(category: string): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/bypartcategory/${category}/count`, { observe: 'response' });
  }

  getPartsByCategoryType(page: number, size: number, categoryType: string): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/bypartcategorytype/${categoryType}?page=${page}&size=${size}`, {
      observe: 'response'
    });
  }

  getPartsByCategoryTypeCount(category: string): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/bypartcategorytype/${category}/count`, { observe: 'response' });
  }

  getAllParts(page: number, size: number): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/parts/all?page=${page}&size=${size}`, { observe: 'response' });
  }

  getAllPartsCount(): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/parts/all/count`, { observe: 'response' });
  }

  // Details handler
  requestDetails(product: IProduct) {
    console.log('CHANGIN PRODUCT ', this.currentProduct);
    console.log('with  ', product);
    this.currentProduct.next(product);
    console.log('to ', this.currentProduct);
  }

  requestDetailsListener(): Observable<IProduct> {
    return this.currentProduct.asObservable();
  }

  getProductsName(name: string): Observable<HttpResponse<IProduct[]>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/search/${name}`, { observe: 'response' });
  }

  getMyProducts(): Observable<HttpResponse<IProduct[]>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/search`, { observe: 'response' });
  }

  getProductsNameLike(name: string): Observable<HttpResponse<IProduct[]>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/searchLike/${name}`, { observe: 'response' });
  }

  // SABIKE
  reserveQuantityProduct(productToUpdate: IProduct): Observable<EntityResponseType> {
    return this.http.put<IProduct>(this.resourceUrl, productToUpdate, { observe: 'response' });
  }
}
