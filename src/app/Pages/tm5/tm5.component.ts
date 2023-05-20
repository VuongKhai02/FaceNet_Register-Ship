import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, retry, throwError } from 'rxjs';
import { formTM5 } from 'src/app/share/models/form/formTM5.model';
import { measurementTM5 } from 'src/app/share/models/form/measurementTM5.model';
import { ParamValue } from 'src/app/share/models/paramValue.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';
import { NavigationEnd, Router } from '@angular/router';
import { GeneralParticular } from 'src/app/share/models/generalParticulars.model';
import { API_END_POINT } from 'src/environments/environment';
import { newParamValue } from 'src/app/share/models/newParamValue.model';

@Component({
  selector: 'app-tm5',
  templateUrl: './tm5.component.html',
  styleUrls: ['./tm5.component.css'],
})
export class Tm5Component implements OnInit {
  constructor(
    public formService: FormService,
    public paramValueService: ParamValueService,
    private message: NzMessageService,
    private router: Router
  ) {}

  addRowValue: number = 0;
  listRow: measurementTM5[] = [];

  listStructuralMember: ParamValue[] = [];

  formTM5: formTM5 = {
    code: '',
    locationOfStructure: '',
    tankHolDescription: '',
    frameNo: '',
    structuralTM5List: [],
  };

  isPercentVisible: boolean = false;
  isAddRowVisible: boolean = false;

  percentSelected: number = 0;
  structuralMemberSelected: number = -2;

  partId: string = this.router.url.split('/')[2];
  tmId: string = this.router.url.split('/')[4];
  API_URL: string = `http://222.252.25.37:9080/api/v1/report-indexes/${this.partId}/tm5s`;

  emptyRow: measurementTM5 = {
    structuralComponent: '',
    item: '',
    measurementDetail: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
  };

  isVisible = false;
  isLoadingSaveButton: boolean = false;

  selectedRow: number[] = [];
  selectedListRow: number = -1;
  listFormCode: ParamValue[] = [];

  isLoadingDataForm: boolean = false;

  generalParticular!: GeneralParticular;

  listNewStructuralMember: newParamValue[] = [];

  selectedFile: any;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        this.router.url.split('/')[1] === 'part' &&
        this.router.url.split('/')[3].slice(0, 3) === 'tm5' &&
        this.router.url.split('/')[4] !== '-1'
      ) {
        this.partId = this.router.url.split('/')[2];
        this.tmId = this.router.url.split('/')[4];
        this.formService.getDataForm('tm5s', this.tmId).subscribe((data) => {
          this.formTM5.code = data.code;
          this.formTM5.tankHolDescription = data.tankHolDescription;
          this.formTM5.locationOfStructure = data.locationOfStructure;
          this.formTM5.structuralTM5List = data.structuralTM5List;

          for (let i = 0; i < this.formTM5.structuralTM5List.length; i++) {
            this.formTM5.structuralTM5List[i].measurementTM5List =
              data.structuralTM5List[i].measurementTM5DTOList;
          }

          this.listStructuralMember.map((member) => {
            data.structuralTM5List.forEach((structural: any) => {
              structural.measurementTM5DTOList.forEach((measurement: any) => {
                if (member.param == measurement.item) {
                  member.value = measurement.measurementDetail.percent;
                  return;
                }
              });
            });
          });
        });
      } else if (
        event instanceof NavigationEnd &&
        this.router.url.split('/')[4] === '-1'
      ) {
        this.formTM5.structuralTM5List = [];
        this.formTM5.structuralTM5List.push({
          name: 'New list',
          measurementTM5List: [],
        });

        for (let i = 1; i <= 20; i++) {
          this.formTM5.structuralTM5List[0].measurementTM5List.push(
            JSON.parse(JSON.stringify(this.emptyRow))
          );
        }
      }
    });

    if (Number(this.tmId) === -1) {
      this.formTM5.structuralTM5List = [];
      this.formTM5.structuralTM5List.push({
        name: 'New list',
        measurementTM5List: [],
      });
      for (let i = 1; i <= 20; i++) {
        this.formTM5.structuralTM5List[0].measurementTM5List.push(
          JSON.parse(JSON.stringify(this.emptyRow))
        );
      }
    } else {
      this.formService.getDataForm('tm5s', this.tmId).subscribe((data) => {
        this.formTM5.code = data.code;
        this.formTM5.tankHolDescription = data.tankHolDescription;
        this.formTM5.locationOfStructure = data.locationOfStructure;
        this.formTM5.structuralTM5List = data.structuralTM5List;

        for (let i = 0; i < this.formTM5.structuralTM5List.length; i++) {
          this.formTM5.structuralTM5List[i].measurementTM5List =
            data.structuralTM5List[i].measurementTM5DTOList;
        }

        this.listStructuralMember.map((member) => {
          data.structuralTM5List.forEach((structural: any) => {
            structural.measurementTM5DTOList.forEach((measurement: any) => {
              if (member.param == measurement.item) {
                member.value = measurement.measurementDetail.percent;
                return;
              }
            });
          });
        });
      });
    }

    this.paramValueService.getParamValueByType(8).subscribe((data) => {
      this.listStructuralMember = data;
    });

    this.paramValueService.getParamValueByType(11).subscribe((data) => {
      this.listFormCode = data;
    });

    if (this.formService.getParticularData() != null)
      this.generalParticular = this.formService.getParticularData();
  }

  addRow() {
    if (this.addRowValue > 0 && this.addRowValue <= 100) {
      if (this.structuralMemberSelected >= 0) {
        for (let i = 1; i <= this.addRowValue; i++)
          this.formTM5.structuralTM5List[
            this.structuralMemberSelected
          ].measurementTM5List.push(JSON.parse(JSON.stringify(this.emptyRow)));
      } else if (this.structuralMemberSelected == -1) {
        this.formTM5.structuralTM5List.push({
          name: 'New list',
          measurementTM5List: [],
        });

        for (let i = 1; i <= this.addRowValue; i++)
          this.formTM5.structuralTM5List[
            this.formTM5.structuralTM5List.length - 1
          ].measurementTM5List.push(JSON.parse(JSON.stringify(this.emptyRow)));
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
    if (this.addRowValue > 0 && this.addRowValue <= 100) {
      this.addRow();
      this.isAddRowVisible = false;
      this.message.create('success', 'Add row success');
    } else {
      this.message.create(
        'error',
        'Row value must be greater than 0 and less than or equal to 100'
      );
    }
  }

  handleCancel(): void {
    this.percentSelected = 0;
    this.isAddRowVisible = false;
  }

  setPercent(percent: string, param: string): void {
    this.formTM5.structuralTM5List.map((form) => {
      form.measurementTM5List
        .filter((row) => row.item === param)
        .map((row) => {
          row.measurementDetail.percent = percent;
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
        this.formTM5.structuralTM5List[
          structuralMemberTitleIndex
        ].measurementTM5List[structuralMemberIndex].measurementDetail.percent =
          param.value;
      }
    });
  }

  onSaveForm() {
    this.isLoadingSaveButton = true;

    this.formTM5.structuralTM5List.forEach((structuralMember) => {
      structuralMember.measurementTM5List =
        structuralMember.measurementTM5List.filter((measurementTM5) => {
          return (
            measurementTM5.structuralComponent !== '' ||
            measurementTM5.item !== '' ||
            measurementTM5.measurementDetail.originalThickness !== '' ||
            measurementTM5.measurementDetail.gaugedP !== '' ||
            measurementTM5.measurementDetail.gaugedS !== ''
          );
        });
    });

    if (Number(this.tmId) === -1) {
      this.formService
        .addFormToAPI(this.API_URL, this.formTM5)
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
            this.router.navigate([
              'part',
              this.partId,
              this.router.url.split('/')[3],
              result.id,
            ]);
          },
          error: (error) => {
            this.isLoadingSaveButton = false;
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
          },
        });
    } else {
      this.formService
        .updateForm('tm5', this.tmId, this.formTM5)
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
        });
    }

    if (this.listNewStructuralMember.length > 0) {
      this.listNewStructuralMember.forEach((newStructuralMember) => {
        this.paramValueService.addParamValue(newStructuralMember).subscribe();
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

  onDrop(event: CdkDragDrop<measurementTM5[]>, index: number) {
    this.selectedRow.forEach((row) => {
      for (
        let i = row + this.selectedRow.length;
        i <= event.currentIndex;
        i += this.selectedRow.length
      ) {
        this.formTM5.structuralTM5List[index].measurementTM5List[i] =
          JSON.parse(
            JSON.stringify(
              this.formTM5.structuralTM5List[index].measurementTM5List[row]
            )
          );
      }
    });
  }

  countRowBefore(index: number): number {
    var sum: number = 0;
    for (let i = 0; i < index; i++)
      sum += this.formTM5.structuralTM5List[i].measurementTM5List.length + 1;
    return sum;
  }

  clearRow(i: number, j: number) {
    this.formTM5.structuralTM5List[i].measurementTM5List[j] = JSON.parse(
      JSON.stringify(this.emptyRow)
    );
  }

  deleteRow(i: number, j: number) {
    this.formTM5.structuralTM5List[i].measurementTM5List.splice(j, 1);
  }

  deleteListRow(index: number) {
    this.formTM5.structuralTM5List.splice(index, 1);
    if (this.formTM5.structuralTM5List.length === 0) {
      this.formTM5.structuralTM5List = [];
    } else {
      this.formTM5.structuralTM5List = this.formTM5.structuralTM5List;
    }
  }

  onImportExcel(event: any) {
    const formData = new FormData();
    formData.append('excelFile', event.target.files[0]);
    this.formService
      .importExcel(`${API_END_POINT}/sheet/tm5s`, formData)
      .subscribe((data) => {
        this.formTM5.tankHolDescription = data.tankHolDescription;
        this.formTM5.locationOfStructure = data.locationOfStructure;
        this.formTM5.structuralTM5List = data.structuralTM5List;

        for (let i = 0; i < this.formTM5.structuralTM5List.length; i++) {
          this.formTM5.structuralTM5List[i].measurementTM5List =
            data.structuralTM5List[i].measurementTM5List;

          data.structuralTM5List[i].measurementTM5List.forEach(
            (measurementTM5List: any) => {
              if (
                this.listStructuralMember.find(
                  (item) => item.param === measurementTM5List.item
                ) === undefined
              ) {
                this.listStructuralMember.push({
                  id: 0,
                  param: measurementTM5List.item,
                  value: measurementTM5List.item,
                  type: 'TM5_VALUE',
                  edit: false,
                });
                this.listNewStructuralMember.push({
                  param: measurementTM5List.item,
                  value: measurementTM5List.item,
                  type: 8,
                });
              }
            }
          );
        }
      });
    this.selectedFile = null;
  }
}
