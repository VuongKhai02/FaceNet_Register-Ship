import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_END_POINT } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SketchService {
  constructor(private http: HttpClient) {}
  API_URL: string = `${API_END_POINT}/sketches`;

  getSketchFromApi(formType: string, formId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${formType}/${formId}`);
  }
}
