import { IClient } from 'app/shared/model/client.model';

export interface IAddress {
  id?: number;
  deliveryNumber?: string;
  deliveryStreet?: string;
  deliveryCity?: string;
  deliveryPostalCode?: string;
  deliveryCountry?: string;
  client?: IClient;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public deliveryNumber?: string,
    public deliveryStreet?: string,
    public deliveryCity?: string,
    public deliveryPostalCode?: string,
    public deliveryCountry?: string,
    public client?: IClient
  ) {}
}
