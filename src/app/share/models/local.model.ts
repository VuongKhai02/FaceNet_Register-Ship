import { Form } from './form.model';

export interface main {
  editMode: boolean;
  reportNumber: string;
  mainId: number;
  loading: boolean;
}

export interface partLocal {
  id: number;
  partIndex: number;
  partName: string;
  forms: Form[];
  visible: boolean;
  edit: boolean;
}
