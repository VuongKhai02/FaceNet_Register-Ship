import { Component, EventEmitter, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { Account } from 'src/app/share/models/account.model';
import { AccountService } from 'src/app/share/services/account.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private accountSevice: AccountService,
    private message: NzMessageService
  ) {}
  @Output() out: EventEmitter<{ Islogin: boolean; nameUser: string }> =
    new EventEmitter();
  inLogIn: { Islogin: boolean; nameUser: string } = {
    Islogin: false,
    nameUser: '',
  };

  accounts: Account[] = [];

  ngOnInit(): void {
    this.accounts = this.accountSevice.getAccounts();
  }

  validateForm: FormGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
  });

  submitForm(): void {
    // for (let i: number = 0; i < this.accounts.length; i++) {
    //   if (
    //     this.validateForm.value.userName === this.accounts[i].accountName &&
    //     this.validateForm.value.password === this.accounts[i].password
    //   ) {
    //     this.inLogIn.Islogin = false;
    //     this.inLogIn.nameUser = this.accounts[i].name;
    //     this.out.emit(this.inLogIn);
    //     return;
    //   }
    // }
    // if ((this.inLogIn.Islogin = true)) {
    //   this.message.create('error', 'Account or password is incorrect');
    // }
    this.accountSevice
      .postAccount({
        username: this.validateForm.value.userName,
        password: this.validateForm.value.password,
      })
      .subscribe(
        (data) => {
          this.inLogIn.Islogin = false;
          this.inLogIn.nameUser = data.name;
          this.out.emit(this.inLogIn);
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('refreshtoken', data.refreshToken);
        },
        (err) => {
          this.message.create('error', 'Account or password is incorrect');
        }
      );
  }
}
