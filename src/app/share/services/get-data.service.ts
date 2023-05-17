import { Injectable, OnInit } from '@angular/core';
import { GeneralParticular } from '../models/generalParticulars.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_END_POINT } from 'src/environments/environment';
import { GeneralParticularPush } from '../models/generalParticularsPush.model';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private http: HttpClient, private localService: LocalService) {}

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
    // const header = new HttpHeaders();
    // header.set('Authentication', `${sessionStorage.getItem('Token')}`);
    // return this.http.post(this.API_URL, data, { headers: header });
    // sessionStorage.setItem('Token', data.accessToken)
    // sessionStorage.setItem('RefreshToken', data.refreshToken)
    // sessionStorage.getItem('Token')
    return this.http.post(`${this.API_URL}`, data);
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
    id: number,
    data: GeneralParticularPush
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  getGeneralParticulars(): GeneralParticular[] {
    this.getGeneralParticularsFromAPI().subscribe((data) => {
      this.generalParticulars = data;
    });
    this.generalParticulars = this.generalParticulars.filter((e) => {
      return e.id === this.localService.getId();
    });
    return this.generalParticulars;
  }
}
