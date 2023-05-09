import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_END_POINT } from 'src/environments/environment';
import { newParamValue } from '../models/newParamValue.model';

@Injectable({
  providedIn: 'root',
})
export class ParamValueService {
  constructor(private httpClient: HttpClient) {}
  API_URL: string = `${API_END_POINT}/param_value`;

  getParamValueByType(id: number): Observable<any> {
    return this.httpClient.get(`${this.API_URL}?type=${id}`);
  }

  addParamValue(id: number, data: newParamValue): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/${id}`, data);
  }
}
