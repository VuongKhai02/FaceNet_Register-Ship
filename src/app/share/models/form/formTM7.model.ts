import { frameNumberTM7 } from './frameNumberTM7.model';

export interface formTM7 {
  code: string;
  description: string;
  name: string;
  frameNumberList: frameNumberTM7[];
}
