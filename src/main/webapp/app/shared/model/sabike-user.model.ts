import { ISABIKECart } from 'app/shared/model/sabike-cart.model';
import { ISABIKECommande } from 'app/shared/model/sabike-commande.model';

export interface ISABIKEUser {
  id?: number;
  userId?: number;
  password?: string;
  email?: string;
  first?: string;
  last?: string;
  isAdmin?: boolean;
  deliveryAddressNumber?: string;
  deliveryAddressStreet?: string;
  deliveryAddressCity?: string;
  deliveryAddressPostalCode?: string;
  deliveryAddressCountry?: string;
  billingAddressNumber?: string;
  billingAddressStreet?: string;
  billingAddressCity?: string;
  billingAddressPostalCode?: string;
  billingAddressCountry?: string;
  cartId?: ISABIKECart;
  orderId?: ISABIKECommande;
}

export class SABIKEUser implements ISABIKEUser {
  constructor(
    public id?: number,
    public userId?: number,
    public password?: string,
    public email?: string,
    public first?: string,
    public last?: string,
    public isAdmin?: boolean,
    public deliveryAddressNumber?: string,
    public deliveryAddressStreet?: string,
    public deliveryAddressCity?: string,
    public deliveryAddressPostalCode?: string,
    public deliveryAddressCountry?: string,
    public billingAddressNumber?: string,
    public billingAddressStreet?: string,
    public billingAddressCity?: string,
    public billingAddressPostalCode?: string,
    public billingAddressCountry?: string,
    public cartId?: ISABIKECart,
    public orderId?: ISABIKECommande
  ) {
    this.isAdmin = this.isAdmin || false;
  }
}
