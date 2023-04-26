import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseServiceService {
  constructor(private httpClient: HttpClient) {}

  postMethod(data: any, url: string): Observable<any> {
    return this.httpClient.post(url, data);
  }
}
