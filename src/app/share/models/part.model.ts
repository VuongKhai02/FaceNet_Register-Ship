// export interface part {
//   partName: any;
//   forms: any;
//   visible: boolean;
// }

import { Form } from './form.model';

export interface part {
  id: number;
  partIndex: number;
  item: string;
  forms: Form[];
  visible: boolean;
}
