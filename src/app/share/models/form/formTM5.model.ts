import { measurementTM5 } from './measurementTM5.model';

export interface formTM5 {
  code: string;
  description: string;
  name: string;
  locationOfStructure: string;
  tankHolDescription: string;
  frameNo: string;
  measurementTM5List: measurementTM5[];
}
