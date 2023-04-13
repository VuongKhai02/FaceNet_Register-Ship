export interface GeneralParticular {
  shipName: string;
  imoNumber: number;
  absIdentificationNumber: number;
  portOfRegistry: string;
  grossTons: number;
  deadweight: number;
  dateOfBuild: Date;
  classificationSociety: string;
  NameOfCompanyPerformingThicknessMeasurement: string;
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
