import { ICommand } from 'app/shared/model/command.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IOrderItems {
  id?: number;
  quantity?: number;
  paidPrice?: number;
  command?: ICommand;
  product?: IProduct;
}

export class OrderItems implements IOrderItems {
  constructor(
    public id?: number,
    public quantity?: number,
    public paidPrice?: number,
    public command?: ICommand,
    public product?: IProduct
  ) {}
}
