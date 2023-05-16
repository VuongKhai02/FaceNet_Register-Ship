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
  API_URL: string = `${API_END_POINT}/certificates`;

  getAccounts(): Account[] {
    return this.accounts;
  }
}
