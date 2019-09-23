import { IOrderItems } from 'app/shared/model/order-items.model';

export const enum ProductType {
  BIKE = 'BIKE',
  PART = 'PART'
}

export const enum BikeCategory {
  MOUNTAIN = 'MOUNTAIN',
  ROAD = 'ROAD',
  EBIKE = 'EBIKE',
  BMX = 'BMX',
  CITY = 'CITY'
}

export const enum PartCategory {
  STEERING = 'STEERING',
  SADDLE_SEATPOST = 'SADDLE_SEATPOST',
  DRIVETRAIN = 'DRIVETRAIN',
  WHEELS_TYRES = 'WHEELS_TYRES',
  BRAKES = 'BRAKES',
  FRAMES_FORKS = 'FRAMES_FORKS'
}

export const enum PartCategoryType {
  STEMS = 'STEMS',
  HANDLEBARS = 'HANDLEBARS',
  HEADSET = 'HEADSET',
  SADDLE = 'SADDLE',
  SEAT_POST = 'SEAT_POST',
  SEAT_CLAMP = 'SEAT_CLAMP',
  DERAILLEUR = 'DERAILLEUR',
  CHAINS = 'CHAINS',
  CRANKSETS = 'CRANKSETS',
  PEDALS = 'PEDALS',
  STRAPS = 'STRAPS',
  TYRES = 'TYRES',
  ALLOY_CARBON_WHEELS = 'ALLOY_CARBON_WHEELS',
  WIRE_SPOKED_WHEELS = 'WIRE_SPOKED_WHEELS',
  BOYAUX = 'BOYAUX',
  BRAKE_LEVERS = 'BRAKE_LEVERS',
  BRAKE_CABLES = 'BRAKE_CABLES',
  BRAKE_CALIPERS = 'BRAKE_CALIPERS',
  BRAKE_PADS = 'BRAKE_PADS',
  FRAME_KITS = 'FRAME_KITS',
  FRAMES = 'FRAMES',
  FORKS = 'FORKS'
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
  description?: string;
  orderItems?: IOrderItems[];
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
    public description?: string,
    public orderItems?: IOrderItems[]
  ) {}
}
