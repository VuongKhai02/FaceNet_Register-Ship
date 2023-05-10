import { Form } from './form.model';

export interface main {
  editMode: boolean;
  reportNumber: string;
  mainId: number;
}

export interface partLocal {
  index: number;
  partName: string;
  forms: Form[];
  visible: boolean;
}
