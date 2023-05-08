import { ship } from './ship.model';
import { certificate } from './certificate.model';

export interface GeneralParticular {
  id: number;
  shipInfo: ship;
  certificateDTO: certificate;
  placeOfMeasurement: string;
  firstDateOfMeasurement: Date;
  lastDateOfMeasurement: Date;
  measurementEquipmentInfo: string;
  surveyType: string;
  reportNo: string;
  nameOfOperator: string;
  surveyorInfo: string;
}
