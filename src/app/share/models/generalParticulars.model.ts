export interface GeneralParticular {
  shipName: string;
  imoNumber: number;
  absIdentification: number;
  portOfRegistry: string;
  grossTons: number;
  deadweight: number;
  dateOfBuild: Date;
  classificationSociety: string;
  nameOfCompanyPerformingThicknessMeasurement: string;
  thicknessMeasurementCompanCertifiedBy: string;
  certificateNo: number;
  certificateValidFrom: Date;
  placeOfMeasurement: string;
  firstDateOfMeasurement: Date;
  lastDateOfMeasurement: Date;
  specialSurvey: string;
  detailsOfMeasurementEquipment: string;
  qualificationOfoperator: string;
  reportNumber: string;
  numberOfSheets: number;
  nameOfOperator: string;
  nameOfSurveyor: string;
  signatureOfOperator: string;
  signatureOfSurveyor: string;
  companyOfficialStamp: string;
  classificationSocietyOfficialStamp: string;
}
