import { ICart } from 'app/shared/model/cart.model';
import { ICommand } from 'app/shared/model/command.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IOrderItems {
  id?: number;
  quantity?: number;
  paidPrice?: number;
  // cart?: ICart;
  command?: ICommand;
  product?: IProduct;
}

export class OrderItems implements IOrderItems {
  constructor(
    public id?: number,
    public quantity?: number,
    public paidPrice?: number,
    // public cart?: ICart,
    public command?: ICommand,
    public product?: IProduct
  ) {}
}
