import { Moment } from 'moment';
import { IOrderItems } from 'app/shared/model/order-items.model';

export interface ICart {
  id?: number;
  expireOn?: Moment;
  orderItems?: IOrderItems[];
}

export class Cart implements ICart {
  constructor(public id?: number, public expireOn?: Moment, public orderItems?: IOrderItems[]) {}
}
