import { ISABIKEUser } from 'app/shared/model/sabike-user.model';
import { ISABIKEArticle } from 'app/shared/model/sabike-article.model';

export interface ISABIKECart {
  id?: number;
  cartId?: number;
  userId?: ISABIKEUser;
  articleIds?: ISABIKEArticle[];
}

export class SABIKECart implements ISABIKECart {
  constructor(public id?: number, public cartId?: number, public userId?: ISABIKEUser, public articleIds?: ISABIKEArticle[]) {}
}
