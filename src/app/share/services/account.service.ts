import { API_END_POINT } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { accounts } from '../datas/local.data';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  accounts: Account[] = accounts;
  constructor(private http: HttpClient) {}
  API_URL: string = `${API_END_POINT}/auth`;

  postAccount(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data);
  }

  changePassword(data: {
    oldPassword: string;
    newPassword: string;
  }): Observable<any> {
    return this.http.put(`${this.API_URL}/password`, data);
  }

  getGeneralParticularsFromAPI(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  getAccounts(): Account[] {
    return this.accounts;
  }
}
