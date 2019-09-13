import { ICart } from 'app/shared/model/cart.model';
import { ICommand } from 'app/shared/model/command.model';
import { IAddress } from 'app/shared/model/address.model';
import { IUser } from 'app/core/user/user.model';

export interface IClient {
  id?: number;
  phoneNumber?: string;
  cart?: ICart;
  orders?: ICommand[];
  addresses?: IAddress[];
  user?: IUser;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public phoneNumber?: string,
    public cart?: ICart,
    public orders?: ICommand[],
    public addresses?: IAddress[],
    public user?: IUser
  ) {}
}
