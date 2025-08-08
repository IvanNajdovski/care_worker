export interface IAcumaticaDataItem {
  id: string;
  rowNumber: number;
  note: any;
  AddressLine1: AddressLine1;
  AddressLine2: AddressLine2;
  Appraisal: Appraisal;
  AppraisalDate: AppraisalDate;
  AppraisalPreparedBy: AppraisalPreparedBy;
  AppraisalSignature: AppraisalSignature;
  Brand: Brand;
  City: City;
  CustomerID: CustomerId;
  CustomerName: CustomerName;
  IncludePhoto: IncludePhoto;
  IncludeSignature: IncludeSignature;
  State: State;
  Title: Title;
  ZipCode: ZipCode;
  custom: Custom;
}

export interface AddressLine1 {
  value?: string;
}

export interface AddressLine2 {
  value?: string;
}

export interface Appraisal {
  value?: string;
}

export interface AppraisalDate {
  value?: string;
}

export interface AppraisalPreparedBy {
  value?: string;
}

export interface AppraisalSignature {
  value?: string;
}

export interface Brand {
  value?: string;
}

export interface City {
  value?: string;
}

export interface CustomerId {
  value?: string;
}

export interface CustomerName {
  value?: string;
}

export interface IncludePhoto {
  value?: string;
}

export interface IncludeSignature {
  value?: string;
}

export interface State {
  value?: string;
}

export interface Title {
  value?: string;
}

export interface ZipCode {
  value?: string;
}

export interface Custom {
  value?: string;
}
