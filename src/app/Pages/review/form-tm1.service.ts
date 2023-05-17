import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_END_POINT } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormTm1Service {
  constructor(private http: HttpClient) {}
  API_URL: string = `${API_END_POINT}/forms`;
  getDataTm1FromApi(name: string, id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${name}/${id}`);
  }
}
