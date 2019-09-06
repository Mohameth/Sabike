export const enum SABIKEBikeType {
  VTT = 'VTT',
  COURSE = 'COURSE',
  VILLE = 'VILLE',
  BMX = 'BMX'
}

export interface ISABIKEBike {
  id?: number;
  type?: SABIKEBikeType;
  size?: number;
  speeds?: number;
  color?: string;
}

export class SABIKEBike implements ISABIKEBike {
  constructor(public id?: number, public type?: SABIKEBikeType, public size?: number, public speeds?: number, public color?: string) {}
}
