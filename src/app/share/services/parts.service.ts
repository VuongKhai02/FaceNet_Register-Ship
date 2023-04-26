import { Injectable } from '@angular/core';
import { part } from '../models/part.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_END_POINT } from 'src/environments/environment';
import { main } from '../models/local.model';
import { mainData } from '../datas/local.data';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  mainData: main = mainData;
  constructor(private http: HttpClient) {}
  Parts: part[] = [];
  API_URL: string = `${API_END_POINT}/report-indexes/${this.mainData.mainId}/report-indexes`;
  // API_URL2: string = `${API_END_POINT}/generals_particulars/${this.mainData.mainId}/report_indexes`;

  /**
   * Hàm dùng để lấy dữ liệu part từ API
   * @returns Trả về mảng thông tin của part
   */
  getPartsFromApi(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  /**
   * Hàm dùng để thêm dữ liệu vào mảng qua API
   * @param data : Dữ liệu thêm mới từ input
   * @returns
   */
  addPartsToAPI(data: { partIndex: number; item: string }): Observable<any> {
    return this.http.post(
      `${API_END_POINT}/generals_particulars/${this.mainData.mainId}/report_indexes`,
      data
    );
  }

  /**
   * Hàm dùng để xóa part trong mảng dữ liệu
   * @param id : Id của part cần xóa
   * @returns
   */
  deletePartsFormAPI(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  /**
   * Hàm dùng để sửa thông tin part trong mảng dữ liệu
   * @param id : Id của part cần sửa
   * @param data : Thông tin của part cần sửa
   * @returns
   */
  updatePartsToAPI(id: string, data: part): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  setParts(): part[] {
    return this.Parts;
  }
}
