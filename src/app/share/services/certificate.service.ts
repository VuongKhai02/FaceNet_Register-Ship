import { API_END_POINT } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { certificate } from '../models/certificate.model';
import { certificatePush } from '../models/certificatePush.model';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(private http: HttpClient) {}
  API_URL: string = `${API_END_POINT}/certificates`;

  /**
   * Hàm dùng để lấy dữ liệu từ API
   * @returns Trả về mảng thông tin của certificate
   */
  getCertificateFromAPI(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  /**
   * Hàm dùng để thêm dữ liệu vào mảng qua API
   * @param data : Dữ liệu thêm mới từ input
   * @returns
   */
  addCertificateToAPI(data: certificatePush): Observable<any> {
    return this.http.post(this.API_URL, data);
  }

  /**
   * Hàm dùng để xóa certificate trong mảng dữ liệu
   * @param id : Id của certificate cần xóa
   * @returns
   */
  deleteCertificateFormAPI(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  /**
   * Hàm dùng để sửa thông tin certificate trong mảng dữ liệu
   * @param id : Id của certificate cần sửa
   * @param data : Thông tin của certificate cần sửa
   * @returns
   */
  updateCertificateToAPI(id: number, data: certificatePush): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }
}
