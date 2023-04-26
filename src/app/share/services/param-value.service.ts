import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { paramValue } from '../models/paramValue.model';

@Injectable({
  providedIn: 'root',
})
export class ParamValueService {
  constructor(private httpClient: HttpClient) {}

  getParamValueByType(id: number): Observable<any> {
    return this.httpClient.get<paramValue[]>(
      `http://222.252.25.37:9080/api/v1/param_value?type=${id}`
    );
  }

  addParamValue(data: any): Observable<any> {
    return this.httpClient.post(
      `http://222.252.25.37:9080/api/v1/param_value`,
      data
    );
  }
}
