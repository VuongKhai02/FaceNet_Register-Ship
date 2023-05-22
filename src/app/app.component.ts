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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
  isCollapsed = false;
  inLogIn: { Islogin: boolean; nameUser: string } = {
    Islogin: true,
    nameUser: 'Unknown',
  };

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
  }

  deleteTm(i: number, j: number, i2: number, j2: number) {
    if (j === -1) {
      this.parts[i2].forms.splice(j2, 1);
    } else
      this.reportIndexService.deleteForm(i, j).subscribe(
        (data) => {
          this.parts.splice(0, this.parts.length);
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deletePart(i: number) {
    this.reportIndexService.deleteReportIndexFormAPI(i).subscribe(
      (data) => {
        this.parts.splice(0, this.parts.length);
        this.ngOnInit();
      },
      (err) => {
        this.ngOnInit();
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
    } else {
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
    }
  }

  changelogOut($value: boolean): void {}

  accLose() {
    this.logOutVisible = false;
  }

  cancel() {}
}
