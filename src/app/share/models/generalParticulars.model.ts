import { ship } from './ship.model';

export interface GeneralParticular {
  ship: ship;
  // shipName: string;
  // imoNumber: number;
  // absIdentification: number;
  // portOfRegistry: string;
  // grossTons: number;
  // deadweight: number;
  // dateOfBuild: Date;
  // classificationSociety: string;
  // nameOfCompanyPerformingThicknessMeasurement: string;
  // thicknessMeasurementCompanCertifiedBy: string;
  certificateNo: string;
  // certificateValidFrom: Date;
  placeOfMeasurement: string;
  firstDateOfMeasurement: Date;
  lastDateOfMeasurement: Date;
  specialSurvey: string;
  measurementEquipmentInfo: string;
  // qualificationOfoperator: string;
  reportNo: string;
  numberOfSheets: number;
  nameOfOperator: string;
  nameOfSurveyor: string;
  // signatureOfOperator: string;
  // signatureOfSurveyor: string;
  // companyOfficialStamp: string;
  // classificationSocietyOfficialStamp: string;
}
