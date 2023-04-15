import { Injectable } from '@angular/core';
import { GeneralParticular } from '../models/generalParticulars.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private http: HttpClient) {}
  API_URL: string =
    'https://642e2c062b883abc64085347.mockapi.io/book/registryShipping';

  generalParticulars: GeneralParticular[] = [];

  /**
   * Hàm dùng để lấy dữ liệu từ API
   * @returns Trả về mảng thông tin của sách
   */
  getGeneralParticularsFromAPI(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  /**
   * Hàm dùng để thêm dữ liệu vào mảng qua API
   * @param data : Dữ liệu thêm mới từ input
   * @returns
   */
  addGeneralParticularsToAPI(data: GeneralParticular): Observable<any> {
    return this.http.post(this.API_URL, data);
  }

  /**
   * Hàm dùng để xóa sách trong mảng dữ liệu
   * @param id : Id của sản sách cần xóa
   * @returns
   */
  deleteGeneralParticularsFormAPI(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  /**
   * Hàm dùng để sửa thông tin sách trong mảng dữ liệu
   * @param id : Id của sách cần sửa
   * @param data : Thông tin của sách cần sửa
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
