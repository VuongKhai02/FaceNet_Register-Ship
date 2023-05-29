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
import { Sketch } from 'src/app/share/models/sketches.model';
import { main } from 'src/app/share/models/local.model';
import { LocalService } from 'src/app/share/services/local.service';
import { PartsService } from 'src/app/share/services/parts.service';

@Component({
  selector: 'app-tm5',
  templateUrl: './tm5.component.html',
  styleUrls: ['./tm5.component.css'],
})
export class Tm5Component implements OnInit {
  mainData!: main;
  constructor(
    public formService: FormService,
    public paramValueService: ParamValueService,
    private message: NzMessageService,
    private router: Router,
    private partsService: PartsService,
    private localService: LocalService
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

  API_URL: string = `${API_END_POINT}/report-indexes/${
    this.router.url.split('/')[2]
  }/tm5s`;

  emptyRow: measurementTM5 = {
    structuralComponentType: '',
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

  generalParticular!: GeneralParticular;

  listNewStructuralMember: newParamValue[] = [];

  selectedFile: any;

  isVisibleAddSketches: boolean = false;
  isConfirmLoadingSketches: boolean = false;
  isLoadingSketches: boolean = false;
  listSketches: Sketch[] = [];
  listPreviewSketches: any[] = [];
  listCurrentSketChes: File[] = [];
  listSaveSketches: FormData = new FormData();

  ngOnInit(): void {
    this.mainData = this.localService.getMainData();
    this.paramValueService.getParamValueByType(8).subscribe((data) => {
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
        this.router.url.split('/')[3].slice(0, 3) === 'tm5' &&
        this.router.url.split('/')[4] !== '-1'
      ) {
        this.formService.isLoadingData = true;

        this.formService
          .getDataForm('tm5s', this.router.url.split('/')[4])
          .subscribe((data) => {
            this.formTM5.code = data.code;
            this.formTM5.tankHolDescription = data.tankHolDescription;
            this.formTM5.locationOfStructure = data.locationOfStructure;
            this.formTM5.frameNo = data.frameNo;
            this.formTM5.structuralTM5List = data.structuralTM5List;

            for (let i = 0; i < this.formTM5.structuralTM5List.length; i++) {
              this.formTM5.structuralTM5List[i].measurementTM5List =
                data.structuralTM5List[i].measurementTM5List;
            }

            this.listStructuralMember.map((member) => {
              data.structuralTM5List.forEach((structural: any) => {
                structural.measurementTM5List.forEach((measurement: any) => {
                  if (member.param == measurement.item) {
                    member.value = measurement.measurementDetail.percent;
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

    if (Number(this.router.url.split('/')[4]) === -1) {
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
      this.formService.isLoadingData = true;

      this.formService
        .getDataForm('tm5s', this.router.url.split('/')[4])
        .subscribe((data) => {
          this.formTM5.code = data.code;
          this.formTM5.tankHolDescription = data.tankHolDescription;
          this.formTM5.locationOfStructure = data.locationOfStructure;
          this.formTM5.frameNo = data.frameNo;
          this.formTM5.structuralTM5List = data.structuralTM5List;

          for (let i = 0; i < this.formTM5.structuralTM5List.length; i++) {
            this.formTM5.structuralTM5List[i].measurementTM5List =
              data.structuralTM5List[i].measurementTM5List;
          }

          this.listStructuralMember.map((member) => {
            data.structuralTM5List.forEach((structural: any) => {
              structural.measurementTM5List.forEach((measurement: any) => {
                if (member.param == measurement.item) {
                  member.value = measurement.measurementDetail.percent;
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
    this.formService.isLoadingData = true;
    this.isLoadingSaveButton = true;

    this.formTM5.structuralTM5List.forEach((structuralMember) => {
      structuralMember.measurementTM5List =
        structuralMember.measurementTM5List.filter((measurementTM5) => {
          return (
            measurementTM5.structuralComponentType !== '' ||
            measurementTM5.item !== '' ||
            measurementTM5.measurementDetail.originalThickness !== '' ||
            measurementTM5.measurementDetail.gaugedP !== '' ||
            measurementTM5.measurementDetail.gaugedS !== ''
          );
        });
    });

    if (Number(this.router.url.split('/')[4]) === -1) {
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
            this.message.create('success', 'Save form success');
            this.partsService.reloadParts(this.mainData.mainId);
            this.router.navigate([
              'part',
              this.router.url.split('/')[2],
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
        .updateForm('tm5s', this.router.url.split('/')[4], this.formTM5)
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
            this.partsService.reloadParts(this.mainData.mainId);
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
    this.formService.isLoadingData = true;
    const formData = new FormData();
    formData.append('excelFile', event.target.files[0]);
    this.formService
      .importExcel(`${API_END_POINT}/sheet/tm5s`, formData)
      .subscribe((data) => {
        this.formTM5.tankHolDescription = data.tankHolDescription;
        this.formTM5.locationOfStructure = data.locationOfStructure;
        this.formTM5.frameNo = data.frameNo;
        this.formTM5.structuralTM5List = data.structuralTM5List;

        for (let i = 0; i < data.structuralTM5List.length; i++) {
          this.formTM5.structuralTM5List[i].measurementTM5List =
            data.structuralTM5List[i].measurementTM5List;

          data.structuralTM5List[i].measurementTM5List.forEach(
            (measurementTM5: any) => {
              if (
                this.listStructuralMember.find(
                  (item) =>
                    item.param === measurementTM5.structuralComponentType
                ) === undefined
              ) {
                this.listStructuralMember.push({
                  id: 0,
                  param: measurementTM5.structuralComponentType,
                  value: measurementTM5.structuralComponentType,
                  type: 'TM5_VALUE',
                  edit: false,
                });
                this.listNewStructuralMember.push({
                  param: measurementTM5.structuralComponentType,
                  value: measurementTM5.structuralComponentType,
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

  showAddSketches() {
    this.isVisibleAddSketches = true;
    this.isLoadingSketches = true;

    this.formService
      .getListSketches('form_tm1', this.router.url.split('/')[4])
      .subscribe({
        next: (data) => {
          this.listSketches = data;
          this.isLoadingSketches = false;
        },
        error: (error) => {
          this.isLoadingSketches = false;
          this.message.create(
            'error',
            'Something went wrong, please try later'
          );
        },
      });
  }

  handleCancelAddSketches() {
    this.isVisibleAddSketches = false;
    this.listPreviewSketches = [];
    this.listSaveSketches.delete('files');
  }

  handleOkAddSketches() {
    if (this.listSaveSketches.has('multipartFiles')) {
      this.isConfirmLoadingSketches = true;
      this.formService
        .saveListSketches(
          'form_tm1',
          this.router.url.split('/')[4],
          this.listSaveSketches
        )
        .subscribe({
          next: (data) => {
            this.listPreviewSketches = [];
            this.listSaveSketches.delete('multipartFiles');
            this.isConfirmLoadingSketches = false;
            this.message.create('success', 'Save sketches success');
            this.showAddSketches();
          },
          error: (error) => {
            this.isConfirmLoadingSketches = false;
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
          },
        });
    } else {
      this.isVisibleAddSketches = false;
    }
  }

  onChangeImage(event: any) {
    this.listCurrentSketChes = event.target.files;

    for (let i = 0; i < event.target.files.length; i++) {
      let fReader = new FileReader();
      fReader.readAsDataURL(event.target.files[i]);
      fReader.onloadend = (e: any) => {
        if (e.target) {
          this.listPreviewSketches.push(e.target.result);
        }
      };

      this.listSaveSketches.append('multipartFiles', event.target.files[i]);
    }
  }

  deletePreviewSketches(index: number) {
    this.listPreviewSketches.splice(index, 1);
    this.listSaveSketches.delete('multipartFiles');
    var tempListCurrentSketches = Array.from(this.listCurrentSketChes);
    tempListCurrentSketches.splice(index, 1);
    this.listCurrentSketChes = tempListCurrentSketches;

    for (let i = 0; i < tempListCurrentSketches.length; i++) {
      this.listSaveSketches.append(
        'multipartFiles',
        tempListCurrentSketches[i]
      );
    }
  }

  deleteSavedSketches(sketchesId: number) {
    this.formService.deleteSketches(sketchesId).subscribe({
      next: (data) => {
        this.message.create('success', 'Delete sketches success');
        this.showAddSketches();
      },
      error: (error) => {
        this.message.create('error', 'Something went wrong, please try later');
      },
    });
  }
}
