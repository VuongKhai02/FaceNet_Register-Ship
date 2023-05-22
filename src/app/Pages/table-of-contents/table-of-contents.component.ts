import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
            this.parts.splice(0, this.parts.length);
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
            }
            this.parts = this.parts.sort((a, b) => a.partIndex - b.partIndex);
          },
          (err) => {
            console.log(err);
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
    if (num === 0) {
      this.message.create('error', 'This is the first part');
    } else {
      // let temporaryPart: partLocal = this.parts[num - 1];
      // this.parts.splice(num - 1, 1, this.parts[num]);
      // this.parts.splice(num, 1, temporaryPart);
      // this.message.create('success', 'Move up success');
      let rIUpId: { id: number; name: string; index: number } = {
        id: this.parts[num - 1].id,
        name: this.parts[num - 1].partName,
        index: this.parts[num - 1].partIndex,
      };
      let rIDownId: { id: number; name: string; index: number } = {
        id: this.parts[num].id,
        name: this.parts[num].partName,
        index: this.parts[num].partIndex,
      };
      this.reportIndexService
        .updateReportIndexToAPI(rIUpId.id, {
          item: rIUpId.name,
          partIndex: rIDownId.index,
        })
        .subscribe(
          (data) => {
            this.reportIndexService
              .updateReportIndexToAPI(rIDownId.id, {
                item: rIDownId.name,
                partIndex: rIUpId.index,
              })
              .subscribe((data) => {
                this.ngOnInit();
              });
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  tmName: string = '';

  moveUpForm(i: number, j: number) {
    let changeForm: { type: string; id: number; index: number }[] = [];
    changeForm.push({
      type: this.parts[i].forms[i].name,
      id: this.parts[i].forms[j].formID,
      index: this.parts[i].forms[j].index,
    });
    changeForm.push({
      type: this.parts[i].forms[j - 1].name,
      id: this.parts[i].forms[j - 1].formID,
      index: this.parts[i].forms[j - 1].index,
    });
    if (this.parts[i].forms[i].name === 'FORM TM1') {
      this.tmName = 'tm1';
    } else if (
      this.parts[i].forms[i].name === 'FORM TM2' ||
      this.parts[i].forms[i].name === 'FORM TM2(I)' ||
      this.parts[i].forms[i].name === 'FORM TM2(II)'
    ) {
      this.tmName = 'tm2';
    } else if (this.parts[i].forms[i].name === 'FORM TM3') {
      this.tmName = 'tm3';
    } else if (this.parts[i].forms[i].name === 'FORM TM4') {
      this.tmName = 'tm4';
    } else if (this.parts[i].forms[i].name === 'FORM TM5') {
      this.tmName = 'tm5';
    } else if (this.parts[i].forms[i].name === 'FORM TM6') {
      this.tmName = 'tm6';
    } else if (this.parts[i].forms[i].name === 'FORM TM7') {
      this.tmName = 'tm7';
    }
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

  editPart(i: number) {
    this.parts[i].edit = true;
  }

  savePart(i: number) {
    this.parts[i].edit = false;
    this.reportIndexService
      .updateReportIndexToAPI(this.parts[i].id, {
        item: this.parts[i].partName,
        partIndex: this.parts[i].partIndex,
      })
      .subscribe((data) => {});
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex < event.currentIndex) {
      let temporaryParts: { id: number; name: string; index: number }[] = [];
      for (let i: number = event.previousIndex; i <= event.currentIndex; i++) {
        if (i === event.previousIndex) {
          temporaryParts.push({
            id: this.parts[i].id,
            name: this.parts[i].partName,
            index: this.parts[event.currentIndex].partIndex,
          });
        } else {
          temporaryParts.push({
            id: this.parts[i].id,
            name: this.parts[i].partName,
            index: this.parts[i].partIndex - 1,
          });
        }
      }
      for (let i: number = 0; i < temporaryParts.length; i++) {
        this.reportIndexService
          .updateReportIndexToAPI(temporaryParts[i].id, {
            item: temporaryParts[i].name,
            partIndex: temporaryParts[i].index,
          })
          .subscribe((data) => {
            this.ngOnInit();
          });
      }
    } else {
      let temporaryParts: { id: number; name: string; index: number }[] = [];
      for (let i: number = event.previousIndex; i >= event.currentIndex; i--) {
        if (i === event.previousIndex) {
          temporaryParts.push({
            id: this.parts[i].id,
            name: this.parts[i].partName,
            index: this.parts[event.currentIndex].partIndex,
          });
        } else {
          temporaryParts.push({
            id: this.parts[i].id,
            name: this.parts[i].partName,
            index: this.parts[i].partIndex + 1,
          });
        }
      }
      for (let i: number = 0; i < temporaryParts.length; i++) {
        this.reportIndexService
          .updateReportIndexToAPI(temporaryParts[i].id, {
            item: temporaryParts[i].name,
            partIndex: temporaryParts[i].index,
          })
          .subscribe((data) => {
            this.ngOnInit();
          });
      }
    }
  }

  dropForm(event: CdkDragDrop<string[]>) {}

  cancel() {}
}
