import { Moment } from 'moment';
import { IClient } from 'app/shared/model/client.model';
import { IOrderItems } from 'app/shared/model/order-items.model';

export const enum OrderState {
  CART = 'CART',
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  SHIPPED = 'SHIPPED',
  RECEIVED = 'RECEIVED'
}

export interface ICommand {
  id?: number;
  state?: OrderState;
  orderDate?: Moment;
  totalAmount?: number;
  paymentDate?: Moment;
  client?: IClient;
  orderItems?: IOrderItems[];
}

export class Command implements ICommand {
  constructor(
    public id?: number,
    public state?: OrderState,
    public orderDate?: Moment,
    public totalAmount?: number,
    public paymentDate?: Moment,
    public client?: IClient,
    public orderItems?: IOrderItems[]
  ) {}
}
