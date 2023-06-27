import { Form } from './form.model';

export interface main {
  editMode: boolean;
  reportNumber: string;
  mainId: number;
  loading: boolean;
  surveyorSign: boolean;
}

export interface FormLocal {
  formID: number;
  index: number;
  name: string;
  type: string;
  edit: boolean;
}

export interface partLocal {
  id: number;
  partIndex: number;
  partName: string;
  forms: FormLocal[];
  visible: boolean;
  edit: boolean;
}
