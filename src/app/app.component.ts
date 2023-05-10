import { Router } from '@angular/router';
import { PartsService } from 'src/app/share/services/parts.service';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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

  addForm(i: number) {
    for (let j: number = 0; j < this.formSelect.length; j++) {
      this.parts[i].forms.push({ index: -1, name: this.formSelect[j] });
    }
  }

  change(value: boolean): void {
    console.log(value);
  }

  ngOnInit(): void {
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
                index: this.reportIndex.parts[i].index,
                partName: this.reportIndex.parts[i].item,
                forms: this.reportIndex.parts[i].forms,
                visible: false,
              });
            }
            console.log(this.reportIndex);
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
  }

  deleteTm(i: number, j: number) {
    this.parts[i].forms.splice(j, 1);
    console.log('ok');
  }

  deletePart(i: number) {
    this.parts.splice(i, 1);
  }

  link(id: number, info: Form) {
    if (info.name === 'FORM TM1') {
      this.tmName = 'tm1';
    } else if (info.name === 'FORM TM2') {
      this.tmName = 'tm2';
    } else if (info.name === 'FORM TM2(I)') {
      this.tmName = 'tm2(i)';
    } else if (info.name === 'FORM TM2(II)') {
      this.tmName = 'tm2(ii)';
    } else if (info.name === 'FORM TM3') {
      this.tmName = 'tm3';
    } else if (info.name === 'FORM TM4') {
      this.tmName = 'tm4';
    } else if (info.name === 'FORM TM5') {
      this.tmName = 'tm5';
    } else if (info.name === 'FORM TM6') {
      this.tmName = 'tm6';
    } else if (info.name === 'FORM TM7') {
      this.tmName = 'tm7';
    }
    this.router.navigate(['part', id, this.tmName, info.index]);
  }

  cancel() {}
}
