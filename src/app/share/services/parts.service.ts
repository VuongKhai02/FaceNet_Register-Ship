import { Injectable } from '@angular/core';
import { part } from '../models/part.model';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  parts: part[] = [];

  setParts(): part[] {
    return this.parts;
  }

  constructor() {}
}
