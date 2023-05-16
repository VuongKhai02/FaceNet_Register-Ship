import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_END_POINT } from 'src/environments/environment';
import { ReportIndex } from '../models/report-index.model';
import { ReportIndexPush } from '../models/report-indexPush.model';

@Injectable({
  providedIn: 'root',
})
export class ReportIndexesService {
  constructor(private http: HttpClient) {}
  API_URL: string = `${API_END_POINT}/generals_particulars`;

  getReportIndexFromAPI(id: number): Observable<any> {
    return this.http.get(
      `${API_END_POINT}/generals_particulars/${id}/report-indexes`
    );
  }

  addReportIndexToAPI(id: number, data: ReportIndexPush): Observable<any> {
    return this.http.post(
      `${API_END_POINT}/generals_particulars/${id}/report-indexes`,
      data
    );
  }

  deleteReportIndexFormAPI(id: number): Observable<any> {
    return this.http.delete(`${API_END_POINT}/report-indexes/${id}`);
  }

  deleteForm(id: number, index: number): Observable<any> {
    return this.http.delete(
      `${API_END_POINT}/report-indexes/${id}/form/${index}`
    );
  }

  updateReportIndexToAPI(
    id: number,
    data: { item: string; partIndex: number }
  ): Observable<any> {
    return this.http.put(`${API_END_POINT}/report-indexes/${id}`, data);
  }
}
