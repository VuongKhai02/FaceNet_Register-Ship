import { ship } from './ship.model';
import { certificate } from './certificate.model';

export interface GeneralParticular {
  shipInfo: ship;
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
  certificateDTO: certificate;
  // certificateValidFrom: Date;
  placeOfMeasurement: string;
  firstDateOfMeasurement: Date;
  lastDateOfMeasurement: Date;
  measurementEquipmentInfo: string;
  // qualificationOfoperator: string;
  surveyType: string;
  reportNo: string;
  numberOfSheets: number;
  nameOfOperator: string;
  nameOfSurveyor: string;
  // signatureOfOperator: string;
  // signatureOfSurveyor: string;
  // companyOfficialStamp: string;
  // classificationSocietyOfficialStamp: string;
}
