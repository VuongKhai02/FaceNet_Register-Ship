import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, retry, throwError } from 'rxjs';
import { formTM4 } from 'src/app/share/models/form/formTM4.model';
import { measurementTM4 } from 'src/app/share/models/form/measurementTM4.model';
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
  selector: 'app-tm4',
  templateUrl: './tm4.component.html',
  styleUrls: ['./tm4.component.css'],
})
export class Tm4Component implements OnInit {
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
  listRow: measurementTM4[] = [];

  listStructuralMember: ParamValue[] = [];

  formTM4: formTM4 = {
    code: '',
    tankDescription: '',
    locationOfStructure: '',
    structuralMemberTM4List: [],
  };

  isPercentVisible: boolean = false;
  percentSelected: number = 1;
  structuralMemberSelected: number = -2;

  partId: string = this.router.url.split('/')[2];
  API_URL: string = `${API_END_POINT}/report-indexes/${this.partId}/tm4s`;

  emptyRow: measurementTM4 = {
    structuralMember: '',
    item: '',
    detailMeasurement: {
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
    this.paramValueService.getParamValueByType(7).subscribe((data) => {
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
        this.router.url.split('/')[3].slice(0, 3) === 'tm4' &&
        this.router.url.split('/')[4] !== '-1'
      ) {
        this.formService.isLoadingData = true;

        this.partId = this.router.url.split('/')[2];
        this.formService
          .getDataForm('tm4s', this.router.url.split('/')[4])
          .subscribe((data) => {
            this.formTM4.code = data.code;
            this.formTM4.tankDescription = data.tankDescription;
            this.formTM4.locationOfStructure = data.locationOfStructure;
            this.formTM4.structuralMemberTM4List = data.structuralMemberTM4List;

            for (
              let i = 0;
              i < this.formTM4.structuralMemberTM4List.length;
              i++
            ) {
              this.formTM4.structuralMemberTM4List[i].measurementTM4List =
                data.structuralMemberTM4List[i].measurementTM4DTOList;
            }

            this.listStructuralMember.map((member) => {
              data.structuralMemberTM4List.forEach((structural: any) => {
                structural.measurementTM4DTOList.forEach((measurement: any) => {
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
        this.formTM4.structuralMemberTM4List = [];
        this.formTM4.structuralMemberTM4List.push({
          structuralMemberTitle: 'New list',
          measurementTM4List: [],
        });

        for (let i = 1; i <= 20; i++) {
          this.formTM4.structuralMemberTM4List[0].measurementTM4List.push(
            JSON.parse(JSON.stringify(this.emptyRow))
          );
        }
      }
    });

    if (Number(this.router.url.split('/')[4]) === -1) {
      this.formTM4.structuralMemberTM4List = [];
      this.formTM4.structuralMemberTM4List.push({
        structuralMemberTitle: 'New list',
        measurementTM4List: [],
      });
      for (let i = 1; i <= 20; i++) {
        this.formTM4.structuralMemberTM4List[0].measurementTM4List.push(
          JSON.parse(JSON.stringify(this.emptyRow))
        );
      }
    } else {
      this.formService.isLoadingData = true;

      this.formService
        .getDataForm('tm4s', this.router.url.split('/')[4])
        .subscribe((data) => {
          this.formTM4.code = data.code;
          this.formTM4.tankDescription = data.tankDescription;
          this.formTM4.locationOfStructure = data.locationOfStructure;
          this.formTM4.structuralMemberTM4List = data.structuralMemberTM4List;

          for (
            let i = 0;
            i < this.formTM4.structuralMemberTM4List.length;
            i++
          ) {
            this.formTM4.structuralMemberTM4List[i].measurementTM4List =
              data.structuralMemberTM4List[i].measurementTM4DTOList;
          }

          this.listStructuralMember.map((member) => {
            data.structuralMemberTM4List.forEach((structural: any) => {
              structural.measurementTM4DTOList.forEach((measurement: any) => {
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
          this.formTM4.structuralMemberTM4List[
            this.structuralMemberSelected
          ].measurementTM4List.push(JSON.parse(JSON.stringify(this.emptyRow)));
      } else if (this.structuralMemberSelected == -1) {
        this.formTM4.structuralMemberTM4List.push({
          structuralMemberTitle: 'New list',
          measurementTM4List: [],
        });

        for (let i = 1; i <= this.addRowValue; i++)
          this.formTM4.structuralMemberTM4List[
            this.formTM4.structuralMemberTM4List.length - 1
          ].measurementTM4List.push(JSON.parse(JSON.stringify(this.emptyRow)));
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
    this.formTM4.structuralMemberTM4List.map((form) => {
      form.measurementTM4List
        .filter((row) => row.structuralMember === param)
        .map((row) => {
          row.detailMeasurement.percent = percent;
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
        this.formTM4.structuralMemberTM4List[
          structuralMemberTitleIndex
        ].measurementTM4List[structuralMemberIndex].detailMeasurement.percent =
          param.value;
      }
    });
  }

  onSaveForm() {
    this.isLoadingSaveButton = true;
    this.formService.isLoadingData = true;

    this.formTM4.structuralMemberTM4List.forEach((structuralMember) => {
      structuralMember.measurementTM4List =
        structuralMember.measurementTM4List.filter((measurementTM4) => {
          return (
            measurementTM4.structuralMember !== '' ||
            measurementTM4.item !== '' ||
            measurementTM4.detailMeasurement.originalThickness !== '' ||
            measurementTM4.detailMeasurement.gaugedP !== '' ||
            measurementTM4.detailMeasurement.gaugedS !== ''
          );
        });
    });

    if (Number(this.router.url.split('/')[4]) === -1) {
      this.formService
        .addFormToAPI(this.API_URL, this.formTM4)
        .pipe(
          retry(3),
          catchError(() => {
            return throwError('Something went wrong');
          })
        )
        .subscribe({
          next: (result) => {
            this.listNewStructuralMember = [];
            this.router.navigate([
              'part',
              this.partId,
              this.router.url.split('/')[3],
              result.id,
            ]);
            this.message.create('success', 'Save form success');
            this.partsService.reloadParts(this.mainData.mainId);
          },
          error: (error) => {
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
          },
          complete: () => {
            this.isLoadingSaveButton = false;
            this.formService.isLoadingData = false;
          },
        });
    } else {
      this.formService
        .updateForm('tm4s', this.router.url.split('/')[4], this.formTM4)
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
            this.isLoadingSaveButton = false;
            this.formService.isLoadingData = false;
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

  onDrop(event: CdkDragDrop<measurementTM4[]>, index: number) {
    this.selectedRow.forEach((row) => {
      for (
        let i = row + this.selectedRow.length;
        i <= event.currentIndex;
        i += this.selectedRow.length
      ) {
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[i] =
          JSON.parse(
            JSON.stringify(
              this.formTM4.structuralMemberTM4List[index].measurementTM4List[
                row
              ]
            )
          );
      }
    });
  }

  countRowBefore(index: number): number {
    var sum: number = 0;
    for (let i = 0; i < index; i++)
      sum +=
        this.formTM4.structuralMemberTM4List[i].measurementTM4List.length + 1;
    return sum;
  }

  clearRow(i: number, j: number) {
    this.formTM4.structuralMemberTM4List[i].measurementTM4List[j] = JSON.parse(
      JSON.stringify(this.emptyRow)
    );
  }

  deleteRow(i: number, j: number) {
    this.formTM4.structuralMemberTM4List[i].measurementTM4List.splice(j, 1);
  }

  deleteListRow(index: number) {
    this.formTM4.structuralMemberTM4List.splice(index, 1);
    if (this.formTM4.structuralMemberTM4List.length === 0) {
      this.formTM4.structuralMemberTM4List = [];
    } else {
      this.formTM4.structuralMemberTM4List =
        this.formTM4.structuralMemberTM4List;
    }
  }

  onImportExcel(event: any) {
    this.formService.isLoadingData = true;
    const formData = new FormData();
    formData.append('excelFile', event.target.files[0]);
    this.formService
      .importExcel(`${API_END_POINT}/sheet/tm4s`, formData)
      .subscribe((data) => {
        this.formTM4.tankDescription = data.tankDescription;
        this.formTM4.locationOfStructure = data.locationOfStructure;
        this.formTM4.structuralMemberTM4List = data.structuralMemberTM4List;

        for (let i = 0; i < data.structuralMemberTM4List.length; i++) {
          this.formTM4.structuralMemberTM4List[i].measurementTM4List =
            data.structuralMemberTM4List[i].measurementTM4DTOList;

          data.structuralMemberTM4List[i].measurementTM4DTOList.forEach(
            (measurementTM4DTO: any) => {
              if (
                this.listStructuralMember.find(
                  (item) => item.param === measurementTM4DTO.structuralMember
                ) === undefined
              ) {
                this.listStructuralMember.push({
                  id: 0,
                  param: measurementTM4DTO.structuralMember,
                  value: measurementTM4DTO.structuralMember,
                  type: 'TM4_VALUE',
                  edit: false,
                });
                this.listNewStructuralMember.push({
                  param: measurementTM4DTO.structuralMember,
                  value: measurementTM4DTO.structuralMember,
                  type: 7,
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
      .getListSketches('form_tm4', this.router.url.split('/')[4])
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
          'form_tm4',
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
