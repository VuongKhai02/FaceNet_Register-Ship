import { Injectable } from '@angular/core';
import { GeneralParticular } from '../models/generalParticulars.model';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  generalParticulars: GeneralParticular[] = [];

  getGeneralParticulars(): GeneralParticular[] {
    return this.generalParticulars;
  }

  constructor() {}
}
