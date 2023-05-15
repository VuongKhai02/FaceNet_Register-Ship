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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  logOutVisible: boolean = false;
  reportIndex!: ReportIndex;
  parts: partLocal[] = [];
  formSelect: string[] = [];
  mainData!: main;
  tmName: string = '';
  constructor(
    private partsService: PartsService,
    private localService: LocalService,
    private reportIndexService: ReportIndexesService,
    private router: Router
  ) {}

  clickMe(i: number): void {
    this.parts[i].visible = false;
  }

  addForm(i: number, formName: string) {
    // for (let j: number = 0; j < this.formSelect.length; j++) {
    //   this.parts[i].forms.push({ index: -1, name: this.formSelect[j] });
    // }
    this.parts[i].forms.push({ formID: -1, index: -1, name: formName });
    this.parts[i].visible = false;
  }

  change(value: boolean): void {}

  ngOnInit(): void {
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
                index: this.reportIndex.parts[i].index,
                partName: this.reportIndex.parts[i].item,
                forms: this.reportIndex.parts[i].forms,
                visible: false,
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  reset() {
    window.location.reload();
    // this.mainData.editMode = false;
    // this.mainData.mainId = 0;
    // this.mainData.reportNumber = '';
    // this.parts = [];
  }

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isCollapsed = false;
  Islogin: boolean = false;

  logIn(title: boolean): void {
    this.Islogin = title;
  }

  logOut(): void {
    this.Islogin = true;
    this.logOutVisible = false;
  }

  deleteTm(i: number, j: number) {
    this.parts[i].forms.splice(j, 1);
    console.log('ok');
  }

  deletePart(i: number) {
    // this.parts.splice(i, 1);
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
    if (formName === 'FORM TM1') {
      this.tmName = 'tm1';
    } else if (formName === 'FORM TM2') {
      this.tmName = 'tm2';
    } else if (formName === 'FORM TM2(I)') {
      this.tmName = 'tm2i';
    } else if (formName === 'FORM TM2(II)') {
      this.tmName = 'tm2ii';
    } else if (formName === 'FORM TM3') {
      this.tmName = 'tm3';
    } else if (formName === 'FORM TM4') {
      this.tmName = 'tm4';
    } else if (formName === 'FORM TM5') {
      this.tmName = 'tm5';
    } else if (formName === 'FORM TM6') {
      this.tmName = 'tm6';
    } else if (formName === 'FORM TM7') {
      this.tmName = 'tm7';
    }
    this.router.navigate(['part', id, this.tmName, formIndex]);
  }

  changelogOut($value: boolean): void {}

  accLose() {
    this.logOutVisible = false;
  }

  cancel() {}
}
