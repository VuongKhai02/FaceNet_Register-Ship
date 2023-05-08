import { ship } from './ship.model';

export interface GeneralParticularPush {
  ship: ship;
  certificateNo: string;
  placeOfMeasurement: string;
  firstDateOfMeasurement: Date;
  lastDateOfMeasurement: Date;
  measurementEquipmentInfo: string;
  surveyType: string;
  reportNo: string;
  nameOfOperator: string;
  surveyorInfo: string;
}
