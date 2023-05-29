import { StructuralTM5List } from './structuralTM5List.model';

export interface formTM5 {
  code: string;
  locationOfStructure: string;
  tankHolDescription: string;
  frameNo: string;
  structuralTM5List: StructuralTM5List[];
}
