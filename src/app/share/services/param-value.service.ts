import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_END_POINT } from 'src/environments/environment';
import { newParamValue } from '../models/newParamValue.model';

@Injectable({
  providedIn: 'root',
})
export class ParamValueService {
  constructor(private http: HttpClient) {}
  API_URL: string = `${API_END_POINT}/param_value`;

  getParamValueByType(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}?type=${id}`);
  }

  addParamValue(data: newParamValue): Observable<any> {
    return this.http.post(`${this.API_URL}`, data);
  }

  deleteParamValue(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  updateParamValue(id: number, data: newParamValue): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }
}
