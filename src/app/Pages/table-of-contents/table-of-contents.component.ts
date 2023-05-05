import { GeneralParticular } from './../../share/models/generalParticulars.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { part } from 'src/app/share/models/part.model';
import { PartsService } from 'src/app/share/services/parts.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReportIndex } from 'src/app/share/models/report-index.model';
import { ReportIndexesService } from 'src/app/share/services/report-indexes.service';
import { main } from 'src/app/share/models/local.model';
import { LocalService } from 'src/app/share/services/local.service';
import { Form } from 'src/app/share/models/form.model';
import { GetDataService } from 'src/app/share/services/get-data.service';
import { partLocal } from 'src/app/share/models/local.model';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.css'],
})
export class TableOfContentsComponent implements OnInit {
  generalParticulars: GeneralParticular[] = [];
  parts: partLocal[] = [];
  mainData!: main;
  reportIndex!: ReportIndex;
  outShipName: string = '';
  outIMO: string = '';
  outClass: string = '';
  outReport: string = '';
  outSurvey: string = '';

  @ViewChild('myElement')
  myElement!: ElementRef;

  constructor(
    private partsService: PartsService,
    private message: NzMessageService,
    private reportIndexService: ReportIndexesService,
    private localService: LocalService,
    private generalSevice: GetDataService
  ) {}

  ngOnInit(): void {
    this.parts = this.partsService.setParts();

    this.mainData = this.localService.getMainData();

    if (this.mainData.editMode === true) {
      this.reportIndexService
        .getReportIndexFromAPI(this.mainData.mainId)
        .subscribe(
          (data) => {
            this.reportIndex = data;
            console.log('Data:', data);
            console.log('Report Index:', this.reportIndex);
          },
          (err) => {
            console.log(err);
            console.log('error');
          }
        );
      this.generalSevice.getGeneralParticularsFromAPI().subscribe(
        (data) => {
          this.generalParticulars = data;
          this.generalParticulars = this.generalParticulars.filter(
            (x) => x.id === this.mainData.mainId
          );
          this.outShipName = this.generalParticulars[0].shipInfo.name;
          this.outIMO = this.generalParticulars[0].shipInfo.imoNumber;
          this.outClass =
            this.generalParticulars[0].shipInfo.classificationSociety;
          this.outReport = this.generalParticulars[0].reportNo;
          this.outSurvey = this.generalParticulars[0].surveyType;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  moveUpPart(num: any) {
    // if (num === 0) {
    //   this.message.create('error', 'This is the first part');
    // } else {
    //   let temporaryPart: part = this.parts[num - 1];
    //   this.parts.splice(num - 1, 1, this.parts[num]);
    //   this.parts.splice(num, 1, temporaryPart);
    //   this.message.create('success', 'Move up success');
    // }
  }

  moveUpForm(num1: any, num2: any) {
    // if (num2 === 0) {
    //   this.message.create('error', 'This is the first form of part');
    // } else {
    //   let temporaryForm: string = this.parts[num1].forms[num2 - 1];
    //   this.parts[num1].forms.splice(num2 - 1, 1, this.parts[num1].forms[num2]);
    //   this.parts[num1].forms.splice(num2, 1, temporaryForm);
    //   this.message.create('success', 'Move up success');
    // }
  }

  moveDownPart(num: any) {
    // if (num === this.parts.length - 1) {
    //   this.message.create('error', 'This is the last part');
    // } else {
    //   let temporaryPart: part = this.parts[num + 1];
    //   this.parts.splice(num + 1, 1, this.parts[num]);
    //   this.parts.splice(num, 1, temporaryPart);
    //   this.message.create('success', 'Move down success');
    // }
  }

  moveDownForm(num1: any, num2: any) {
    // if (num2 === this.parts[num1].forms.length - 1) {
    //   this.message.create('error', 'This is the last form of part');
    // } else {
    //   let temporaryForm: string = this.parts[num1].forms[num2 + 1];
    //   this.parts[num1].forms.splice(num2 + 1, 1, this.parts[num1].forms[num2]);
    //   this.parts[num1].forms.splice(num2, 1, temporaryForm);
    //   this.message.create('success', 'Move down success');
    // }
  }

  cancel() {}
}
