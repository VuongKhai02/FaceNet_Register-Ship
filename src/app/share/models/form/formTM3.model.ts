import { measurementTM3 } from './measurementTM3.model';

export interface formTM3 {
  code: string;
  firstFrameNo: string;
  secondFrameNo: string;
  thirdFrameNo: string;
  measurementTM3List: measurementTM3[];
}
