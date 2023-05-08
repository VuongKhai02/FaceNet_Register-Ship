import { Injectable } from '@angular/core';
import { GeneralParticular } from '../models/generalParticulars.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_END_POINT } from 'src/environments/environment';
import { GeneralParticularPush } from '../models/generalParticularsPush.model';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private http: HttpClient) {}
  API_URL: string = `${API_END_POINT}/generals_particulars`;

  generalParticulars: GeneralParticular[] = [];

  /**
   * Hàm dùng để lấy dữ liệu từ API
   * @returns Trả về mảng thông tin của  general particular
   */
  getGeneralParticularsFromAPI(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  /**
   * Hàm dùng để thêm dữ liệu vào mảng qua API
   * @param data : Dữ liệu thêm mới từ input
   * @returns
   */
  addGeneralParticularsToAPI(data: GeneralParticularPush): Observable<any> {
    return this.http.post(this.API_URL, data);
  }

  /**
   * Hàm dùng để xóa  general particular trong mảng dữ liệu
   * @param id : Id của sản  general particular cần xóa
   * @returns
   */
  deleteGeneralParticularsFormAPI(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  /**
   * Hàm dùng để sửa thông tin  general particular trong mảng dữ liệu
   * @param id : Id của  general particular cần sửa
   * @param data : Thông tin của  general particular cần sửa
   * @returns
   */
  updateGeneralParticularsToAPI(
    id: string,
    data: GeneralParticular
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  getGeneralParticulars(): GeneralParticular[] {
    return this.generalParticulars;
  }
}
