import { Moment } from 'moment';
import { ISABIKEUser } from 'app/shared/model/sabike-user.model';

export const enum SABIKECommandeStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  SHIPPED = 'SHIPPED',
  RECEIVED = 'RECEIVED'
}

export interface ISABIKECommande {
  id?: number;
  orderId?: number;
  number?: string;
  status?: SABIKECommandeStatus;
  orderDate?: Moment;
  orderItems?: string;
  userIds?: ISABIKEUser[];
}

export class SABIKECommande implements ISABIKECommande {
  constructor(
    public id?: number,
    public orderId?: number,
    public number?: string,
    public status?: SABIKECommandeStatus,
    public orderDate?: Moment,
    public orderItems?: string,
    public userIds?: ISABIKEUser[]
  ) {}
}
