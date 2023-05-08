import { mainData } from './../datas/local.data';
import { Injectable } from '@angular/core';
import { main } from '../models/local.model';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  mainData: main = mainData;
  constructor() {}

  getId(): number {
    return this.mainData.mainId;
  }

  getMainData(): main {
    return this.mainData;
  }

  changeStatus() {
    if (this.mainData.editMode === false) {
      this.mainData.editMode = true;
    } else {
      this.mainData.editMode = true;
    }
  }

  // pushMain(id: number, report: string) {
  //   this.mainData.mainId = id;
  //   this.mainData.reportNumber = report;
  // }

  getStatus(): boolean {
    return this.mainData.editMode;
  }

  report(): string {
    return this.mainData.reportNumber;
  }
}
