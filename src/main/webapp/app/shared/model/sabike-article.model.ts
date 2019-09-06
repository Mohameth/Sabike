import { ISABIKECart } from 'app/shared/model/sabike-cart.model';

export interface ISABIKEArticle {
  id?: number;
  articleId?: number;
  price?: number;
  name?: string;
  stock?: number;
  picture?: number;
  cartIds?: ISABIKECart[];
}

export class SABIKEArticle implements ISABIKEArticle {
  constructor(
    public id?: number,
    public articleId?: number,
    public price?: number,
    public name?: string,
    public stock?: number,
    public picture?: number,
    public cartIds?: ISABIKECart[]
  ) {}
}
