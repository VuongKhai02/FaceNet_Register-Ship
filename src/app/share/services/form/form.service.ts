import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralParticular } from '../../models/generalParticulars.model';
import { LocalService } from '../local.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(
    private httpClient: HttpClient,
    private localService: LocalService
  ) {}

  generalParticular: GeneralParticular[] = [];

  // Check arguments are qualified for calculation
  // Condition:
  //   - Not null
  //   - Greater than 0
  //   - originalThickness is greater than gauged
  checkBeforeCalculate(originalThickness: string, gauged: string): boolean {
    if (
      originalThickness !== '' &&
      gauged !== '' &&
      Number(originalThickness) > 0 &&
      Number(gauged) > 0 &&
      Number(originalThickness) > Number(gauged)
    )
      return true;
    return false;
  }

  // Calculate for column mm
  calculateForMm(originalThickness: string, gauged: string): string {
    return (Number(originalThickness) - Number(gauged)).toFixed(1);
  }

  // Calculate for column %
  calculateForPercent(originalThickness: string, gauged: string): string {
    return (
      ((Number(originalThickness) - Number(gauged)) /
        Number(originalThickness)) *
      100
    ).toFixed(1);
  }

  // Calculate for column Mean Diminution
  calculateAveragePercent(
    originalThickness: string,
    frGauged: string,
    arGauged: string
  ): String {
    return (
      (Number(this.calculateForPercent(originalThickness, frGauged)) +
        Number(this.calculateForPercent(originalThickness, arGauged))) /
      2
    ).toFixed(1);
  }

  // Calculate for column Max Alwb Dim
  calculateForMaxAlwbDim(originalThickness: string, percent: number): string {
    switch (Number(percent)) {
      case 1:
        return (Number(originalThickness) * 0.2).toFixed(1);
      case 2:
        return (Number(originalThickness) * 0.2 + 1).toFixed(1);
      case 3:
        return (Number(originalThickness) * 0.25).toFixed(1);
      case 4:
        return (Number(originalThickness) * 0.3).toFixed(1);
      default:
        return '';
    }
  }

  threePartsFourOfMaxAlwbDim(MaxAlwbDim: string): string {
    return (Number(MaxAlwbDim) * 0.75).toString();
  }

  addFormToAPI(API_URL: string, data: any): Observable<any> {
    return this.httpClient.post(API_URL, data);
  }

  getDataForm(formName: string, tmId: string): Observable<any> {
    return this.httpClient.get(
      `http://222.252.25.37:9080/api/v1/forms/${formName}/${tmId}`
    );
  }

  updateForm(formName: string, tmId: string, newData: any): Observable<any> {
    return this.httpClient.put(
      `http://222.252.25.37:9080/api/v1/forms/${formName}/${tmId}`,
      newData
    );
  }

  importExcel(url: string, fileExcel: any): Observable<any> {
    return this.httpClient.post(url, fileExcel);
  }

  getParticularData() {
    this.httpClient
      .get<GeneralParticular[]>(
        `http://222.252.25.37:9080/api/v1/generals_particulars`
      )
      .subscribe((data) => {
        this.generalParticular = data;
      });

    if (this.localService.getId())
      return this.generalParticular.filter(
        (element) => element.id === this.localService.getId()
      )[0];
    else return this.generalParticular[0];
  }
}
