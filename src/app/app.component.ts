import { Router } from '@angular/router';
import { PartsService } from 'src/app/share/services/parts.service';
import {
  Component,
  ViewChild,
  OnInit,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { part } from './share/models/part.model';
import { SelectformComponent } from './Pages/selectform/selectform.component';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalService } from './share/services/local.service';
import { main } from './share/models/local.model';
import { ReportIndexesService } from './share/services/report-indexes.service';
import { ReportIndex } from './share/models/report-index.model';
import { partLocal } from './share/models/local.model';
import { Form } from './share/models/form.model';
import { Account } from './share/models/account.model';
import { AccountService } from './share/services/account.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  accounts: Account[] = [];
  oldPassword: string = '';
  newPassword: string = '';
  logOutVisible: boolean = false;
  changePassVisible: boolean = false;
  reportIndex!: ReportIndex;
  parts: partLocal[] = [];
  formSelect: string[] = [];
  mainData!: main;
  tmName: string = '';
  decode: any;
  isCollapsed = false;
  inLogIn: { Islogin: boolean; nameUser: string | null } = {
    Islogin: !this.tokenIsValid(),
    nameUser: localStorage.getItem('username'),
  };
  constructor(
    private accountSevice: AccountService,
    private message: NzMessageService,
    private partsService: PartsService,
    private localService: LocalService,
    private reportIndexService: ReportIndexesService,
    private router: Router
  ) {}

  clickMe(i: number): void {
    this.parts[i].visible = false;
  }

  addForm(i: number, formName: string) {
    this.parts[i].forms.push({
      formID: -1,
      index: -1,
      name: formName,
      type: formName,
    });
    this.parts[i].visible = false;
  }

  changeClose() {
    this.changePassVisible = false;
  }

  change(value: boolean): void {}

  ngOnInit(): void {
    this.accounts = this.accountSevice.getAccounts();
    this.parts = [];
    this.parts = this.partsService.setParts();
    this.mainData = this.localService.getMainData();
    if (this.mainData.editMode === true) {
      this.reportIndexService
        .getReportIndexFromAPI(this.mainData.mainId)
        .subscribe(
          (data) => {
            this.reportIndex = data;
            for (let i: number = 0; i < this.reportIndex.parts.length; i++) {
              this.parts.push({
                id: this.reportIndex.parts[i].id,
                partIndex: this.reportIndex.parts[i].partIndex,
                partName: this.reportIndex.parts[i].item,
                forms: this.reportIndex.parts[i].forms.sort(
                  (a, b) => a.index - b.index
                ),
                visible: false,
                edit: false,
              });
              this.parts = this.parts.sort((a, b) => a.partIndex - b.partIndex);
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  reset() {
    this.mainData.editMode = false;
    this.mainData.mainId = 0;
    this.mainData.reportNumber = '';
    this.parts.splice(0, this.parts.length);
    this.router.navigateByUrl('history');
  }

  title(title: any) {
    throw new Error('Method not implemented.');
  }

  tokenIsValid(): boolean {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      this.decode = jwtDecode(accessToken);
      const currentDate = Date.now() / 1000;
      localStorage.setItem('username', this.decode.sub);
      return currentDate < this.decode.exp;
    }
    return false;
  }

  logIn(title: { Islogin: boolean; nameUser: string }): void {
    this.inLogIn = title;
  }

  logOut(): void {
    this.inLogIn.Islogin = true;
    this.logOutVisible = false;
    this.mainData.editMode = false;
    this.mainData.mainId = 0;
    this.mainData.reportNumber = '';
    this.parts.splice(0, this.parts.length);

    localStorage.removeItem('token');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('username');
  }

  deletePart(i: number) {
    this.mainData.loading = true;
    this.reportIndexService.deleteReportIndexFormAPI(i).subscribe(
      (data) => {
        this.parts.splice(0, this.parts.length);
        this.reportIndexService
          .getReportIndexFromAPI(this.mainData.mainId)
          .subscribe(
            (data) => {
              this.reportIndex = data;
              for (let i: number = 0; i < this.reportIndex.parts.length; i++) {
                this.parts.push({
                  id: this.reportIndex.parts[i].id,
                  partIndex: this.reportIndex.parts[i].partIndex,
                  partName: this.reportIndex.parts[i].item,
                  forms: this.reportIndex.parts[i].forms.sort(
                    (a, b) => a.index - b.index
                  ),
                  visible: false,
                  edit: false,
                });
                this.parts = this.parts.sort(
                  (a, b) => a.partIndex - b.partIndex
                );
                this.mainData.loading = false;
              }
            },
            (err) => {
              this.mainData.loading = false;
              console.log(err);
              this.message.create('error', 'error');
            }
          );
      },
      (err) => {
        this.ngOnInit();
        this.mainData.loading = false;
        this.message.create('error', 'error');
      }
    );
  }

  link(id: number, formName: string, formIndex: number) {
    this.router.navigate([
      'part',
      id,
      formName.toLowerCase().replace(/[^\w\s]/gi, ''),
      formIndex,
    ]);
  }

  changePassword() {
    if (this.oldPassword === '' || this.newPassword === '') {
      this.message.create('error', 'Information not entered yet');
    } else if (this.newPassword.length < 8) {
      this.message.create('error', 'Password must be at least 8 characters');
    } else if (
      this.newPassword.match(/\d/g) &&
      this.newPassword.match(/[a-zA-Z]/g)
    ) {
      this.accountSevice
        .changePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
        .subscribe(
          (data) => {
            this.message.create('success', 'Change successful');
          },
          (err) => {
            console.log(err);
            if (err.error.text === 'Thay đổi mật khẩu thành công') {
              this.message.create('success', err.error.text);
              this.changePassVisible = false;
              this.oldPassword = '';
              this.newPassword = '';
            } else {
              this.message.create('error', err.error.text);
            }
          }
        );
    } else {
      this.message.create(
        'error',
        'Password must contain at least one letter, and at least one number'
      );
    }
  }

  changelogOut($value: boolean): void {}

  accLose() {
    this.logOutVisible = false;
  }

  cancel() {}
}
