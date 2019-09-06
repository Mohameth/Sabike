export const enum SABIKEPartCategory {
  TRANSMISSION = 'TRANSMISSION',
  DIRECTION = 'DIRECTION'
}

export const enum SABIKEPartCategoryType {
  GUIDON = 'GUIDON',
  POTENCE = 'POTENCE',
  CHAINE = 'CHAINE',
  PEDALIER = 'PEDALIER'
}

export interface ISABIKEPart {
  id?: number;
  category?: SABIKEPartCategory;
  type?: SABIKEPartCategoryType;
}

export class SABIKEPart implements ISABIKEPart {
  constructor(public id?: number, public category?: SABIKEPartCategory, public type?: SABIKEPartCategoryType) {}
}
