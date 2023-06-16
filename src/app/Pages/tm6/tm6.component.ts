import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, retry, throwError } from 'rxjs';
import { formTM6 } from 'src/app/share/models/form/formTM6.model';
import { measurementTM6 } from 'src/app/share/models/form/measurementTM6.model';
import { structuralDescriptionTM6 } from 'src/app/share/models/form/structuralDescriptionTM6.model';
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
  selector: 'app-tm6',
  templateUrl: './tm6.component.html',
  styleUrls: ['./tm6.component.css'],
})
export class Tm6Component implements OnInit {
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
  listRow: measurementTM6[] = [];

  listStructuralMember: ParamValue[] = [];
  listStructuralDescription: structuralDescriptionTM6[] = [];

  formTM6: formTM6 = {
    code: '',
    structuralMembers: '',
    locationOfStructure: '',
    structuralDescriptionTM6List: this.listStructuralDescription,
  };

  isPercentVisible: boolean = false;
  percentSelected: number = 1;
  structuralMemberSelected: number = -1;

  partId: string = this.router.url.split('/')[2];
  tmId: string = this.router.url.split('/')[4];
  API_URL: string = `${API_END_POINT}/report-indexes/${this.partId}/tm6s`;

  emptyRow: measurementTM6 = {
    description: '',
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
        this.router.url.split('/')[3].slice(0, 3) === 'tm6' &&
        this.router.url.split('/')[4] !== '-1'
      ) {
        this.formService.isLoadingData = true;

        this.partId = this.router.url.split('/')[2];
        this.tmId = this.router.url.split('/')[4];
        this.formService.getDataForm('tm6s', this.tmId).subscribe((data) => {
          this.formTM6.code = data.code;
          this.formTM6.structuralMembers = data.structuralMembers;
          this.formTM6.locationOfStructure = data.locationOfStructure;
          this.formTM6.structuralDescriptionTM6List =
            data.structuralDescriptionTM6List;

          for (
            let i = 0;
            i < this.formTM6.structuralDescriptionTM6List.length;
            i++
          ) {
            this.formTM6.structuralDescriptionTM6List[i].measurementTM6List =
              data.structuralDescriptionTM6List[i].measurementTM6DTOList;
          }

          this.listStructuralMember.map((member) => {
            data.structuralDescriptionTM6List.forEach((structural: any) => {
              structural.measurementTM6DTOList.forEach((measurement: any) => {
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
        this.formTM6.structuralDescriptionTM6List = [];
        this.formTM6.structuralDescriptionTM6List.push({
          structuralDescriptionTitle: 'New list',
          measurementTM6List: [],
        });

        for (let i = 1; i <= 20; i++) {
          this.formTM6.structuralDescriptionTM6List[0].measurementTM6List.push(
            JSON.parse(JSON.stringify(this.emptyRow))
          );
        }
      }
    });

    if (Number(this.tmId) === -1) {
      this.formTM6.structuralDescriptionTM6List = [];
      this.formTM6.structuralDescriptionTM6List.push({
        structuralDescriptionTitle: 'New list',
        measurementTM6List: [],
      });
      for (let i = 1; i <= 20; i++) {
        this.formTM6.structuralDescriptionTM6List[0].measurementTM6List.push(
          JSON.parse(JSON.stringify(this.emptyRow))
        );
      }
    } else {
      this.formService.isLoadingData = true;

      this.formService.getDataForm('tm6s', this.tmId).subscribe((data) => {
        this.formTM6.code = data.code;
        this.formTM6.structuralMembers = data.structuralMembers;
        this.formTM6.locationOfStructure = data.locationOfStructure;
        this.formTM6.structuralDescriptionTM6List =
          data.structuralDescriptionTM6List;

        for (
          let i = 0;
          i < this.formTM6.structuralDescriptionTM6List.length;
          i++
        ) {
          this.formTM6.structuralDescriptionTM6List[i].measurementTM6List =
            data.structuralDescriptionTM6List[i].measurementTM6DTOList;
        }

        this.listStructuralMember.map((member) => {
          data.structuralDescriptionTM6List.forEach((structural: any) => {
            structural.measurementTM6DTOList.forEach((measurement: any) => {
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
          this.formTM6.structuralDescriptionTM6List[
            this.structuralMemberSelected
          ].measurementTM6List.push(JSON.parse(JSON.stringify(this.emptyRow)));
      } else if (this.structuralMemberSelected == -1) {
        this.formTM6.structuralDescriptionTM6List.push({
          structuralDescriptionTitle: 'New list',
          measurementTM6List: [],
        });

        for (let i = 1; i <= this.addRowValue; i++)
          this.formTM6.structuralDescriptionTM6List[
            this.formTM6.structuralDescriptionTM6List.length - 1
          ].measurementTM6List.push(JSON.parse(JSON.stringify(this.emptyRow)));
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
    this.formTM6.structuralDescriptionTM6List.map((form) => {
      form.measurementTM6List
        .filter((row) => row.description === param)
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
        this.formTM6.structuralDescriptionTM6List[
          structuralMemberTitleIndex
        ].measurementTM6List[structuralMemberIndex].detailMeasurement.percent =
          param.value;
      }
    });
  }

  onSaveForm() {
    this.formService.isLoadingData = true;
    this.isLoadingSaveButton = true;

    this.formTM6.structuralDescriptionTM6List.forEach((structuralMember) => {
      structuralMember.measurementTM6List =
        structuralMember.measurementTM6List.filter((measurementTM6) => {
          return (
            measurementTM6.description !== '' ||
            measurementTM6.item !== '' ||
            measurementTM6.detailMeasurement.originalThickness !== '' ||
            measurementTM6.detailMeasurement.gaugedP !== '' ||
            measurementTM6.detailMeasurement.gaugedS !== ''
          );
        });
    });

    if (Number(this.tmId) === -1) {
      this.formService
        .addFormToAPI(this.API_URL, this.formTM6)
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
        .updateForm('tm6s', this.tmId, this.formTM6)
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

  onDrop(event: CdkDragDrop<measurementTM6[]>, index: number) {
    this.selectedRow.forEach((row) => {
      for (
        let i = row + this.selectedRow.length;
        i <= event.currentIndex;
        i += this.selectedRow.length
      ) {
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[i] =
          JSON.parse(
            JSON.stringify(
              this.formTM6.structuralDescriptionTM6List[index]
                .measurementTM6List[row]
            )
          );
      }
    });
  }

  countRowBefore(index: number): number {
    var sum: number = 0;
    for (let i = 0; i < index; i++)
      sum +=
        this.formTM6.structuralDescriptionTM6List[i].measurementTM6List.length +
        1;
    return sum;
  }

  clearRow(i: number, j: number) {
    this.formTM6.structuralDescriptionTM6List[i].measurementTM6List[j] =
      JSON.parse(JSON.stringify(this.emptyRow));
  }

  deleteRow(i: number, j: number) {
    this.formTM6.structuralDescriptionTM6List[i].measurementTM6List.splice(
      j,
      1
    );
  }

  deleteListRow(index: number) {
    this.formTM6.structuralDescriptionTM6List.splice(index, 1);
    if (this.formTM6.structuralDescriptionTM6List.length === 0) {
      this.formTM6.structuralDescriptionTM6List = [];
    } else {
      this.formTM6.structuralDescriptionTM6List =
        this.formTM6.structuralDescriptionTM6List;
    }
  }

  onImportExcel(event: any) {
    this.formService.isLoadingData = true;
    const formData = new FormData();
    formData.append('excelFile', event.target.files[0]);
    this.formService
      .importExcel(`${API_END_POINT}/sheet/tm6s`, formData)
      .subscribe((data) => {
        this.formTM6.structuralMembers = data.structuralMembers;
        this.formTM6.locationOfStructure = data.locationOfStructure;
        this.formTM6.structuralDescriptionTM6List =
          data.structuralDescriptionTM6List;

        for (let i = 0; i < data.structuralDescriptionTM6List.length; i++) {
          this.formTM6.structuralDescriptionTM6List[i].measurementTM6List =
            data.structuralDescriptionTM6List[i].measurementTM6DTOList;

          data.structuralDescriptionTM6List[i].measurementTM6DTOList.forEach(
            (measurementTM6DTO: any) => {
              if (
                this.listStructuralMember.find(
                  (item) => item.param === measurementTM6DTO.description
                ) === undefined
              ) {
                this.listStructuralMember.push({
                  id: 0,
                  param: measurementTM6DTO.description,
                  value: measurementTM6DTO.description,
                  type: 'TM5_VALUE',
                  edit: false,
                });
                this.listNewStructuralMember.push({
                  param: measurementTM6DTO.description,
                  value: measurementTM6DTO.description,
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
      .getListSketches('form_tm6', this.router.url.split('/')[4])
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
          'form_tm6',
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
