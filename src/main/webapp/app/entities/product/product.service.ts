import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { BikeCategory, IProduct, PartCategory, PartCategoryType, Product, ProductType } from 'app/shared/model/product.model';
import { IClient } from 'app/shared/model/client.model';
import { Command, ICommand, OrderState } from 'app/shared/model/command.model';
import { IOrderItems } from 'app/shared/model/order-items.model';

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

  createProduct(product: IProduct): IProduct {
    return {
      ...new Product(),
      id: product.id,
      price: product.price,
      name: product.name,
      stock: product.stock,
      picture: product.picture,
      brand: product.brand,
      type: product.type,
      bikeCategory: product.bikeCategory,
      bikeSize: product.bikeSize,
      bikeSeeds: product.bikeSeeds,
      bikeColor: product.bikeColor,
      partCategory: product.partCategory,
      partCategoryType: product.partCategoryType,
      description: product.description,
      orderItems: product.orderItems
    };
  }

  getBikes(category: string): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/bybikecategory/${category}`, { observe: 'response' });
  }

  getAllBikes(): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/bikes/all`, { observe: 'response' });
  }

  getAllParts(): Observable<HttpResponse<any>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/parts/all`, { observe: 'response' });
  }

  // Details handler
  getProductsName(name: string): Observable<HttpResponse<IProduct[]>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/search/${name}`, { observe: 'response' });
  }

  getMyProducts(): Observable<HttpResponse<IProduct[]>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/search`, { observe: 'response' });
  }

  getProductsNameLike(name: string): Observable<HttpResponse<IProduct[]>> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/searchLike/${name}`, { observe: 'response' });
  }

  reserveQuantityProduct(productToUpdate: IProduct): Observable<EntityResponseType> {
    return this.http.put<IProduct>(this.resourceUrl, productToUpdate, { observe: 'response' });
  }

  updateQuantityProduct(productToUpdate: IProduct, quantity: number, newQuantity: number): Promise<EntityResponseType> {
    console.log('producToUpdate stock before : ', productToUpdate.stock);
    console.log('quantity : ', quantity);
    console.log('newQuantity: ', newQuantity);
    if (quantity > newQuantity) {
      productToUpdate.stock += quantity - newQuantity;
    } else {
      // TODO check if there is enough in stock
      // TODO check if qty > 5
      if (productToUpdate.stock < newQuantity - quantity) {
        return new Promise((resolve, reject) => {
          reject('Not enough quantity in the stock :/');
        });
      } else {
        productToUpdate.stock -= newQuantity - quantity;
      }
    }
    console.log('producToUpdate stock after : ', productToUpdate.stock);
    return this.reserveQuantityProduct(productToUpdate).toPromise();
  }

  unReserveQuantityProduct(productToUpdate: IProduct): Observable<EntityResponseType> {
    return this.http.put<IProduct>(this.resourceUrl, productToUpdate, { observe: 'response' });
  }

  // requestProductQuantity(productId: number): Promise<HttpResponse<number>> {
  //   return this.http.get<number>(`${this.resourceUrl}/request-stock/${productId}`, { observe: 'response' }).b.toPromise();
  // }
}
