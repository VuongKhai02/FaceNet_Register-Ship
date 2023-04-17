import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ship } from '../models/ship.model';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  constructor(private http: HttpClient) {}
  API_URL: string = 'http://222.252.25.37:9080/api/v1/ships';

  ships: ship[] = [];

  /**
   * Hàm dùng để lấy dữ liệu từ API
   * @returns Trả về mảng thông tin của ship
   */
  getShipsFromAPI(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  /**
   * Hàm dùng để thêm dữ liệu vào mảng qua API
   * @param data : Dữ liệu thêm mới từ input
   * @returns
   */
  addShipsToAPI(data: ship): Observable<any> {
    return this.http.post(this.API_URL, data);
  }

  /**
   * Hàm dùng để xóa sách trong mảng dữ liệu
   * @param id : Id của ship cần xóa
   * @returns
   */
  deleteShipsFormAPI(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  /**
   * Hàm dùng để sửa thông tin sách trong mảng dữ liệu
   * @param id : Id của sách cần sửa
   * @param data : Thông tin của sách cần sửa
   * @returns
   */
  updateShipsToAPI(id: string, data: ship): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  getShips(): ship[] {
    return this.ships;
  }
}
