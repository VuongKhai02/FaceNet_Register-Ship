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
            this.mainData.loading = false;
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
    this.mainData.loading = true;
    let changeForm: { type: string; id: number; index: number }[] = [];
    let type = this.parts[i].forms[j].type.toLowerCase();
    let type2 = this.parts[i].forms[j - 1].type.toLowerCase();
    let formType1 = `form_${
      type === 'tm2(i)' || type === 'tm2(ii)'
        ? 'tm2'
        : this.parts[i].forms[j].type.toLowerCase()
    }`;
    let formType2 = `form_${
      type2 === 'tm2(i)' || type2 === 'tm2(ii)'
        ? 'tm2'
        : this.parts[i].forms[j - 1].type.toLowerCase()
    }`;
    changeForm.push({
      type: formType1,
      id: this.parts[i].forms[j].formID,
      index: this.parts[i].forms[j].index,
    });
    changeForm.push({
      type: formType2,
      id: this.parts[i].forms[j - 1].formID,
      index: this.parts[i].forms[j - 1].index,
    });
    this.reportIndexService
      .putForm(changeForm[0].type, changeForm[0].id, changeForm[1].index)
      .subscribe(
        (data) => {
          this.reportIndexService
            .putForm(changeForm[1].type, changeForm[1].id, changeForm[0].index)
            .subscribe(
              (data) => {
                this.ngOnInit();
                this.mainData.loading = false;
              },
              (err) => {
                console.log(err);
                this.mainData.loading = false;
                this.message.create('error', 'error');
              }
            );
        },
        (err) => {
          console.log(err);
          this.mainData.loading = false;
          this.message.create('error', 'error');
        }
      );
  }

  moveDownForm(i: number, j: number) {
    this.mainData.loading = true;
    let changeForm: { type: string; id: number; index: number }[] = [];
    let type = this.parts[i].forms[j].type.toLowerCase();
    let type2 = this.parts[i].forms[j + 1].type.toLowerCase();
    let formType1 = `form_${
      type === 'tm2(i)' || type === 'tm2(ii)'
        ? 'tm2'
        : this.parts[i].forms[j].type.toLowerCase()
    }`;
    let formType2 = `form_${
      type2 === 'tm2(i)' || type2 === 'tm2(ii)'
        ? 'tm2'
        : this.parts[i].forms[j + 1].type.toLowerCase()
    }`;
    changeForm.push({
      type: formType1,
      id: this.parts[i].forms[j].formID,
      index: this.parts[i].forms[j].index,
    });
    changeForm.push({
      type: formType2,
      id: this.parts[i].forms[j + 1].formID,
      index: this.parts[i].forms[j + 1].index,
    });
    this.reportIndexService
      .putForm(changeForm[0].type, changeForm[0].id, changeForm[1].index)
      .subscribe(
        (data) => {
          this.reportIndexService
            .putForm(changeForm[1].type, changeForm[1].id, changeForm[0].index)
            .subscribe(
              (data) => {
                this.ngOnInit();
                this.mainData.loading = false;
              },
              (err) => {
                console.log(err);
                this.mainData.loading = false;
                this.message.create('error', 'error');
              }
            );
        },
        (err) => {
          console.log(err);
          this.mainData.loading = false;
          this.message.create('error', 'error');
        }
      );
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

  /**
   * Hàm đệ quy dùng để thay đổi vị trí các parts
   * @param temporaryParts : biến chứa các part cần thay đổi
   * @param j : biến đếm
   */
  changeLocationPart(
    temporaryParts: { id: number; name: string; index: number }[],
    j: number
  ) {
    this.reportIndexService
      .updateReportIndexToAPI(temporaryParts[j].id, {
        item: temporaryParts[j].name,
        partIndex: temporaryParts[j].index,
      })
      .subscribe((data) => {
        if (j === temporaryParts.length - 1) {
          this.ngOnInit();
        }
      });
    this.changeLocationPart(temporaryParts, j + 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    this.mainData.loading = true;
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
      this.changeLocationPart(temporaryParts, 0);
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
      this.changeLocationPart(temporaryParts, 0);
    }
  }

  deleteTm(i: number, j: number, i2: number, j2: number) {
    if (j === -1) {
      this.parts[i2].forms.splice(j2, 1);
    } else {
      this.mainData.loading = true;
      this.reportIndexService.deleteForm(i, j).subscribe(
        (data) => {
          this.parts.splice(0, this.parts.length);
          this.reportIndexService
            .getReportIndexFromAPI(this.mainData.mainId)
            .subscribe(
              (data) => {
                this.reportIndex = data;
                for (
                  let i: number = 0;
                  i < this.reportIndex.parts.length;
                  i++
                ) {
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
                console.log(err);
                this.mainData.loading = false;
              }
            );
        },
        (err) => {
          this.mainData.loading = false;
          this.message.create('error', 'error');
        }
      );
    }
  }

  dropForm(event: CdkDragDrop<string[]>) {}

  cancel() {}
}
