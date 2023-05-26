import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, retry, throwError } from 'rxjs';
import { formTM7 } from 'src/app/share/models/form/formTM7.model';
import { frameNumberTM7 } from 'src/app/share/models/form/frameNumberTM7.model';
import { measurementTM7 } from 'src/app/share/models/form/measurementTM7.model';
import { ParamValue } from 'src/app/share/models/paramValue.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';
import { NavigationEnd, Router } from '@angular/router';
import { GeneralParticular } from 'src/app/share/models/generalParticulars.model';
import { API_END_POINT } from 'src/environments/environment';
import { newParamValue } from 'src/app/share/models/newParamValue.model';

@Component({
  selector: 'app-tm7',
  templateUrl: './tm7.component.html',
  styleUrls: ['./tm7.component.css'],
})
export class Tm7Component implements OnInit {
  constructor(
    public formService: FormService,
    public paramValueService: ParamValueService,
    private message: NzMessageService,
    private router: Router
  ) {}

  addRowValue: number = 0;
  listRow: measurementTM7[] = [];

  listStructuralMember: ParamValue[] = [];
  listFrameNumber: frameNumberTM7[] = [];

  formTM7: formTM7 = {
    code: '',
    description: '',
    name: '',
    frameNumberList: this.listFrameNumber,
  };

  isPercentVisible: boolean = false;
  percentSelected: number = 1;
  structuralMemberSelected: number = -1;

  partId: string = this.router.url.split('/')[2];
  tmId: string = this.router.url.split('/')[4];
  API_URL: string = `${API_END_POINT}/report-indexes/${this.partId}/tm7s`;

  emptyRow: measurementTM7 = {
    item: '',
    upperPart: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
    midPart: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
    lowerPart: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
  };

  isLoadingSaveButton: boolean = false;

  isAddRowVisible: boolean = false;

  selectedRow: number[] = [];
  selectedListRow: number = -1;
  listFormCode: ParamValue[] = [];

  isLoadingImportExcel: boolean = false;

  generalParticular!: GeneralParticular;

  listNewStructuralMember: newParamValue[] = [];

  selectedFile: any;

  ngOnInit(): void {
    this.formService.isLoadingData = true;
    this.paramValueService.getParamValueByType(9).subscribe((data) => {
      this.listStructuralMember = data;
    });

    this.paramValueService.getParamValueByType(11).subscribe((data) => {
      this.listFormCode = data;
    });

    if (this.formService.getParticularData() != null)
      this.generalParticular = this.formService.getParticularData();

    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        this.router.url.split('/')[1] === 'part' &&
        this.router.url.split('/')[3].slice(0, 3) === 'tm7' &&
        this.router.url.split('/')[4] !== '-1'
      ) {
        this.partId = this.router.url.split('/')[2];
        this.tmId = this.router.url.split('/')[4];
        this.formService.getDataForm('tm7s', this.tmId).subscribe((data) => {
          this.formTM7.code = data.code;
          this.formTM7.frameNumberList = data.frameNumberList;

          for (let i = 0; i < this.formTM7.frameNumberList.length; i++) {
            this.formTM7.frameNumberList[i].measurementTM7List =
              data.frameNumberList[i].measurementTM7DTOList;
          }

          this.listStructuralMember.map((member) => {
            data.frameNumberList.forEach((structural: any) => {
              structural.measurementTM7DTOList.forEach((measurement: any) => {
                if (member.param == measurement.structuralMember) {
                  member.value = measurement.detailMeasurement.percent;
                  return;
                }
              });
            });
          });
          this.formService.isLoadingData = false;
        });
      } else if (
        event instanceof NavigationEnd &&
        this.router.url.split('/')[4] === '-1'
      ) {
        this.formTM7.frameNumberList = [];
        this.formTM7.frameNumberList.push({
          name: 'New list',
          measurementTM7List: [],
        });

        for (let i = 1; i <= 20; i++) {
          this.formTM7.frameNumberList[0].measurementTM7List.push(
            JSON.parse(JSON.stringify(this.emptyRow))
          );
        }
      }
    });

    if (Number(this.tmId) === -1) {
      this.formTM7.frameNumberList = [];
      this.formTM7.frameNumberList.push({
        name: 'New list',
        measurementTM7List: [],
      });
      for (let i = 1; i <= 20; i++) {
        this.formTM7.frameNumberList[0].measurementTM7List.push(
          JSON.parse(JSON.stringify(this.emptyRow))
        );
      }
    } else {
      this.formService.getDataForm('tm7s', this.tmId).subscribe((data) => {
        this.formTM7.code = data.code;
        this.formTM7.frameNumberList = data.frameNumberList;

        for (let i = 0; i < this.formTM7.frameNumberList.length; i++) {
          this.formTM7.frameNumberList[i].measurementTM7List =
            data.frameNumberList[i].measurementTM7DTOList;
        }

        this.listStructuralMember.map((member) => {
          data.frameNumberList.forEach((structural: any) => {
            structural.measurementTM7DTOList.forEach((measurement: any) => {
              if (member.param == measurement.structuralMember) {
                member.value = measurement.detailMeasurement.percent;
                return;
              }
            });
          });
        });
        this.formService.isLoadingData = false;
      });
    }
  }

  addRow() {
    if (this.addRowValue > 0 && this.addRowValue <= 100) {
      if (this.structuralMemberSelected >= 0) {
        for (let i = 1; i <= this.addRowValue; i++)
          this.formTM7.frameNumberList[
            this.structuralMemberSelected
          ].measurementTM7List.push(JSON.parse(JSON.stringify(this.emptyRow)));
      } else if (this.structuralMemberSelected == -1) {
        this.formTM7.frameNumberList.push({
          name: 'New list',
          measurementTM7List: [],
        });

        for (let i = 1; i <= this.addRowValue; i++)
          this.formTM7.frameNumberList[
            this.formTM7.frameNumberList.length - 1
          ].measurementTM7List.push(JSON.parse(JSON.stringify(this.emptyRow)));
      }
    }
  }

  showModalPercentManage() {
    this.isPercentVisible = true;
  }

  onCancelModal() {
    this.isPercentVisible = false;
  }

  onOkModal() {
    this.isPercentVisible = false;
  }

  convertToNumber(str: string): number {
    return Number(str);
  }

  showModal(): void {
    this.isAddRowVisible = true;
  }

  handleOk(): void {
    if (this.structuralMemberSelected >= -1) {
      if (this.addRowValue > 0 && this.addRowValue <= 100) {
        this.addRow();
        this.isAddRowVisible = false;
        this.message.create('success', 'Add row success');
        this.addRowValue = 0;
      } else {
        this.message.create(
          'error',
          'Row value must be greater than 0 and less than or equal to 100'
        );
      }
    } else {
      this.message.create('error', 'Select a structural member title');
    }
  }

  handleCancel(): void {
    this.percentSelected = 0;
    this.isAddRowVisible = false;
  }

  setPercent(percent: string, param: string): void {
    this.formTM7.frameNumberList.map((form) => {
      form.measurementTM7List
        .filter((row) => row.item === param)
        .map((row) => {
          row.upperPart.percent = percent;
          row.midPart.percent = percent;
          row.lowerPart.percent = percent;
        });
    });
  }

  onSelected(
    value: string,
    structuralMemberTitleIndex: number,
    structuralMemberIndex: number
  ): void {
    this.listStructuralMember.map((param) => {
      if (param.param === value) {
        this.formTM7.frameNumberList[
          structuralMemberTitleIndex
        ].measurementTM7List[structuralMemberIndex].upperPart.percent =
          param.value;
      }
    });
  }

  onSaveForm() {
    this.formService.isLoadingData = false;
    this.isLoadingSaveButton = true;

    this.formTM7.frameNumberList.forEach((structuralMember) => {
      structuralMember.measurementTM7List =
        structuralMember.measurementTM7List.filter((measurementTM7) => {
          return (
            measurementTM7.item !== '' ||
            measurementTM7.upperPart.originalThickness !== '' ||
            measurementTM7.upperPart.gaugedP !== '' ||
            measurementTM7.upperPart.gaugedS !== ''
          );
        });
    });

    if (Number(this.tmId) === -1) {
      this.formService
        .addFormToAPI(this.API_URL, this.formTM7)
        .pipe(
          retry(3),
          catchError(() => {
            return throwError('Something went wrong');
          })
        )
        .subscribe({
          next: (result) => {
            this.message.create('success', 'Save form success');
            this.router.navigate([
              'part',
              this.partId,
              this.router.url.split('/')[3],
              result.id,
            ]);
          },
          error: (error) => {
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
          },
          complete: () => {
            this.formService.isLoadingData = false;
            this.isLoadingSaveButton = false;
          },
        });
    } else {
      this.formService
        .updateForm('tm7s', this.tmId, this.formTM7)
        .pipe(
          retry(3),
          catchError(() => {
            return throwError('Something went wrong');
          })
        )
        .subscribe({
          next: (result) => {
            this.isLoadingSaveButton = false;
            this.message.create('success', 'Save form success');
          },
          error: (error) => {
            this.isLoadingSaveButton = false;
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
          },
          complete: () => {
            this.formService.isLoadingData = false;
            this.isLoadingSaveButton = false;
          },
        });
    }
  }

  onDragEnded(event: CdkDragEnd) {
    event.source.reset();
  }

  selectRow(rowIndex: number, listRowIndex: number): void {
    if (this.selectedListRow === -1 || this.selectedRow.length === 0) {
      this.selectedListRow = listRowIndex;
      if (
        rowIndex === this.selectedRow.sort()[0] - 1 ||
        rowIndex === this.selectedRow.sort()[this.selectedRow.length - 1] + 1 ||
        rowIndex === this.selectedRow.sort()[0] ||
        rowIndex === this.selectedRow.sort()[this.selectedRow.length - 1]
      ) {
        if (this.selectedRow.includes(rowIndex) === false)
          this.selectedRow.push(rowIndex);
        else this.selectedRow = this.selectedRow.filter((e) => e !== rowIndex);
      } else if (this.selectedRow.length === 0) this.selectedRow.push(rowIndex);
    } else {
      if (this.selectedListRow === listRowIndex) {
        if (
          rowIndex === this.selectedRow.sort()[0] - 1 ||
          rowIndex ===
            this.selectedRow.sort()[this.selectedRow.length - 1] + 1 ||
          rowIndex === this.selectedRow.sort()[0] ||
          rowIndex === this.selectedRow.sort()[this.selectedRow.length - 1]
        ) {
          if (this.selectedRow.includes(rowIndex) === false)
            this.selectedRow.push(rowIndex);
          else
            this.selectedRow = this.selectedRow.filter((e) => e !== rowIndex);
        } else if (this.selectedRow.length === 0)
          this.selectedRow.push(rowIndex);
      }
    }
  }

  onDrop(event: CdkDragDrop<measurementTM7[]>, index: number) {
    this.selectedRow.forEach((row) => {
      for (
        let i = row + this.selectedRow.length;
        i <= event.currentIndex;
        i += this.selectedRow.length
      ) {
        this.formTM7.frameNumberList[index].measurementTM7List[i] = JSON.parse(
          JSON.stringify(
            this.formTM7.frameNumberList[index].measurementTM7List[row]
          )
        );
      }
    });
  }

  countRowBefore(index: number): number {
    var sum: number = 0;
    for (let i = 0; i < index; i++)
      sum += this.formTM7.frameNumberList[i].measurementTM7List.length + 1;
    return sum;
  }

  clearRow(i: number, j: number) {
    this.formTM7.frameNumberList[i].measurementTM7List[j] = JSON.parse(
      JSON.stringify(this.emptyRow)
    );
  }

  deleteRow(i: number, j: number) {
    this.formTM7.frameNumberList[i].measurementTM7List.splice(j, 1);
  }

  deleteListRow(index: number) {
    this.formTM7.frameNumberList.splice(index, 1);
    if (this.formTM7.frameNumberList.length === 0) {
      this.formTM7.frameNumberList = [];
    } else {
      this.formTM7.frameNumberList = this.formTM7.frameNumberList;
    }
  }

  onImportExcel(event: any) {
    this.formService.isLoadingData = true;
    const formData = new FormData();
    formData.append('excelFile', event.target.files[0]);
    this.formService
      .importExcel(`${API_END_POINT}/sheet/tm7s`, formData)
      .subscribe((data) => {
        this.formTM7.frameNumberList = data.frameNumberList;

        for (let i = 0; i < data.frameNumberList.length; i++) {
          this.formTM7.frameNumberList[i].measurementTM7List =
            data.frameNumberList[i].measurementTM7DTOList;

          data.frameNumberList[i].measurementTM7DTOList.forEach(
            (measurementTM7DTO: any) => {
              if (
                this.listStructuralMember.find(
                  (item) => item.param === measurementTM7DTO.item
                ) === undefined
              ) {
                this.listStructuralMember.push({
                  id: 0,
                  param: measurementTM7DTO.item,
                  value: measurementTM7DTO.item,
                  type: 'TM5_VALUE',
                  edit: false,
                });
                this.listNewStructuralMember.push({
                  param: measurementTM7DTO.item,
                  value: measurementTM7DTO.item,
                  type: 8,
                });
              }
            }
          );
        }
        this.formService.isLoadingData = false;
      });
    this.selectedFile = null;
  }
}
