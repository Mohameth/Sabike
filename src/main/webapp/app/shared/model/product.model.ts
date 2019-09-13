import { IOrderItems } from 'app/shared/model/order-items.model';

export const enum ProductType {
  BIKE = 'BIKE',
  PART = 'PART'
}

export const enum BikeCategory {
  MOUNTAIN = 'MOUNTAIN',
  ROAD = 'ROAD',
  EBIKE = 'EBIKE',
  BMX = 'BMX'
}

export const enum PartCategory {
  TRANSMISSION = 'TRANSMISSION',
  DIRECTION = 'DIRECTION',
  WHEEL = 'WHEEL',
  FRAME = 'FRAME'
}

export const enum PartCategoryType {
  HANDLEBAR = 'HANDLEBAR',
  STEM = 'STEM',
  CHAIN = 'CHAIN',
  PEDAL = 'PEDAL',
  TIRE = 'TIRE',
  RIM = 'RIM',
  TOPTUBE = 'TOPTUBE',
  DOWNTUBE = 'DOWNTUBE'
}

export interface IProduct {
  id?: number;
  price?: number;
  name?: string;
  stock?: number;
  picture?: string;
  brand?: string;
  type?: ProductType;
  bikeCategory?: BikeCategory;
  bikeSize?: string;
  bikeSeeds?: number;
  bikeColor?: string;
  partCategory?: PartCategory;
  partCategoryType?: PartCategoryType;
  orderItems?: IOrderItems;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public price?: number,
    public name?: string,
    public stock?: number,
    public picture?: string,
    public brand?: string,
    public type?: ProductType,
    public bikeCategory?: BikeCategory,
    public bikeSize?: string,
    public bikeSeeds?: number,
    public bikeColor?: string,
    public partCategory?: PartCategory,
    public partCategoryType?: PartCategoryType,
    public orderItems?: IOrderItems
  ) {}
}
