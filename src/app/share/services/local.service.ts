import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  editMode: boolean = false;
  reportNumber: string = '';
  mainId: number = 0;
  constructor() {}

  getId(): number {
    return this.mainId;
  }

  getStatus(): boolean {
    return this.editMode;
  }

  report(): string {
    return this.reportNumber;
  }
}
