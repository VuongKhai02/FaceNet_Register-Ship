import { Injectable } from '@angular/core';
import { partLocal } from '../models/local.model';
import { partsData } from '../datas/local.data';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  Parts: partLocal[] = partsData;
  constructor() {}

  setParts(): partLocal[] {
    return this.Parts;
  }
}
