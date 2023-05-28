import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { formTM3 } from 'src/app/share/models/form/formTM3.model';
import { measurementTM3 } from 'src/app/share/models/form/measurementTM3.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { ParamValue } from 'src/app/share/models/paramValue.model';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { catchError, retry, throwError } from 'rxjs';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';
import { NavigationEnd, Router } from '@angular/router';
import { GeneralParticular } from 'src/app/share/models/generalParticulars.model';
import { API_END_POINT } from 'src/environments/environment';
import { newParamValue } from 'src/app/share/models/newParamValue.model';
import { Sketch } from 'src/app/share/models/sketches.model';

@Component({
  selector: 'app-tm3',
  templateUrl: './tm3.component.html',
  styleUrls: ['./tm3.component.css'],
})
export class Tm3Component implements OnInit {
  constructor(
    public formService: FormService,
    public paramValueService: ParamValueService,
    private message: NzMessageService,
    private router: Router
  ) {}

  addRowValue: number = 0;

  firstTransverseSectionFrom: string = '';
  firstTransverseSectionTo: string = '';
  secondTransverseSectionFrom: string = '';
  secondTransverseSectionTo: string = '';
  thirdTransverseSectionFrom: string = '';
  thirdTransverseSectionTo: string = '';

  listRow: measurementTM3[] = [];

  formTM3: formTM3 = {
    code: '',
    firstFrameNo: '',
    secondFrameNo: '',
    thirdFrameNo: '',
    measurementTM3List: this.listRow,
  };

  isPercentVisible: boolean = false;
  isAddRowVisible: boolean = false;

  percentSelected: number = 0;

  listStructuralMember: ParamValue[] = [];

  API_URL: string = `${API_END_POINT}/report-indexes/${
    this.router.url.split('/')[2]
  }/tm3s`;

  emptyRow: measurementTM3 = {
    structuralMember: '',
    noOrLetter: '',
    firstTransverseSectionMeasurementDetail: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
    secondTransverseSectionMeasurementDetail: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
    thirdTransverseSectionMeasurementDetail: {
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
  listFormCode: ParamValue[] = [];

  generalParticular!: GeneralParticular;

  selectedFile: any;

  listNewStructuralMember: newParamValue[] = [];

  isVisibleAddSketches: boolean = false;
  isConfirmLoadingSketches: boolean = false;
  isLoadingSketches: boolean = false;
  listSketches: Sketch[] = [];
  listPreviewSketches: any[] = [];
  listCurrentSketChes: File[] = [];
  listSaveSketches: FormData = new FormData();

  ngOnInit(): void {
    this.paramValueService.getParamValueByType(6).subscribe((data) => {
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
        this.router.url.split('/')[3].slice(0, 3) === 'tm3' &&
        this.router.url.split('/')[4] !== '-1'
      ) {
        this.formService.isLoadingData = true;

        this.formService
          .getDataForm('tm3s', this.router.url.split('/')[4])
          .subscribe((data) => {
            this.formTM3.code = data.code;
            this.listRow = data.measurementTM3DTOList;

            this.firstTransverseSectionFrom = data.firstFrameNo.split('~')[0];
            this.firstTransverseSectionTo = data.firstFrameNo.split('~')[1];
            this.secondTransverseSectionFrom = data.secondFrameNo.split('~')[0];
            this.secondTransverseSectionTo = data.secondFrameNo.split('~')[1];
            this.thirdTransverseSectionFrom = data.thirdFrameNo.split('~')[0];
            this.thirdTransverseSectionTo = data.thirdFrameNo.split('~')[1];

            this.listStructuralMember.map((member) => {
              data.measurementTM3DTOList.forEach((e: any) => {
                if (member.param == e.structuralMember) {
                  member.value =
                    e.firstTransverseSectionMeasurementDetail.percent;
                  return;
                }
              });
            });

            this.formService.isLoadingData = false;
          });
      } else if (
        event instanceof NavigationEnd &&
        this.router.url.split('/')[4] === '-1'
      ) {
        this.listRow = [];
        for (let i = 1; i <= 20; i++)
          this.listRow.push(JSON.parse(JSON.stringify(this.emptyRow)));
      }
    });

    if (Number(this.router.url.split('/')[4]) === -1) {
      for (let i = 1; i <= 20; i++)
        this.listRow.push(JSON.parse(JSON.stringify(this.emptyRow)));
    } else {
      this.formService.isLoadingData = true;

      this.formService
        .getDataForm('tm3s', this.router.url.split('/')[4])
        .subscribe((data) => {
          this.formTM3.code = data.code;
          this.listRow = data.measurementTM3DTOList;

          this.firstTransverseSectionFrom = data.firstFrameNo.split('~')[0];
          this.firstTransverseSectionTo = data.firstFrameNo.split('~')[1];
          this.secondTransverseSectionFrom = data.secondFrameNo.split('~')[0];
          this.secondTransverseSectionTo = data.secondFrameNo.split('~')[1];
          this.thirdTransverseSectionFrom = data.thirdFrameNo.split('~')[0];
          this.thirdTransverseSectionTo = data.thirdFrameNo.split('~')[1];

          this.listStructuralMember.map((member) => {
            data.measurementTM3DTOList.forEach((e: any) => {
              if (member.param == e.structuralMember) {
                member.value =
                  e.firstTransverseSectionMeasurementDetail.percent;
                return;
              }
            });
          });

          this.formService.isLoadingData = false;
        });
    }
  }

  addRow() {
    if (this.addRowValue > 0 && this.addRowValue <= 100)
      for (let i = 1; i <= this.addRowValue; i++)
        this.listRow.push(JSON.parse(JSON.stringify(this.emptyRow)));
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
    this.listRow
      .filter((row) => row.structuralMember === param)
      .map((row) => {
        row.firstTransverseSectionMeasurementDetail.percent = percent;
        row.secondTransverseSectionMeasurementDetail.percent = percent;
        row.thirdTransverseSectionMeasurementDetail.percent = percent;
      });
  }

  onSelected(value: string, index: number): void {
    this.listStructuralMember.map((param) => {
      if (param.param === value) {
        this.listRow[index].firstTransverseSectionMeasurementDetail.percent =
          param.value;
        this.listRow[index].secondTransverseSectionMeasurementDetail.percent =
          param.value;
        this.listRow[index].thirdTransverseSectionMeasurementDetail.percent =
          param.value;
      }
    });
  }

  onSaveForm() {
    this.formService.isLoadingData = true;
    this.isLoadingSaveButton = true;
    this.formTM3.measurementTM3List = this.listRow;
    this.formTM3.measurementTM3List = this.formTM3.measurementTM3List.filter(
      (form) =>
        form.structuralMember !== '' ||
        form.noOrLetter !== '' ||
        form.firstTransverseSectionMeasurementDetail.originalThickness !== '' ||
        form.firstTransverseSectionMeasurementDetail.gaugedP !== '' ||
        form.firstTransverseSectionMeasurementDetail.gaugedS !== '' ||
        form.secondTransverseSectionMeasurementDetail.originalThickness !==
          '' ||
        form.secondTransverseSectionMeasurementDetail.gaugedP !== '' ||
        form.secondTransverseSectionMeasurementDetail.gaugedS !== '' ||
        form.thirdTransverseSectionMeasurementDetail.originalThickness !== '' ||
        form.thirdTransverseSectionMeasurementDetail.gaugedP !== '' ||
        form.thirdTransverseSectionMeasurementDetail.gaugedS !== ''
    );

    this.listRow = this.formTM3.measurementTM3List;

    this.formTM3.firstFrameNo = `${this.firstTransverseSectionFrom}~${this.firstTransverseSectionTo}`;
    this.formTM3.secondFrameNo = `${this.secondTransverseSectionFrom}~${this.secondTransverseSectionTo}`;
    this.formTM3.thirdFrameNo = `${this.thirdTransverseSectionFrom}~${this.thirdTransverseSectionTo}`;

    if (Number(this.router.url.split('/')[4]) === -1) {
      this.formService
        .addFormToAPI(this.API_URL, this.formTM3)
        .pipe(
          retry(3),
          catchError(() => {
            return throwError('Something went wrong');
          })
        )
        .subscribe({
          next: (result) => {
            this.isLoadingSaveButton = false;
            this.router.navigate([
              'part',
              this.router.url.split('/')[2],
              this.router.url.split('/')[3],
              result.id,
            ]);
            this.formService.isLoadingData = false;
            this.message.create('success', 'Save form success');
          },
          error: (error) => {
            this.formService.isLoadingData = false;
            this.isLoadingSaveButton = false;
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
          },
        });
    } else {
      this.formService
        .updateForm('tm3s', this.router.url.split('/')[4], this.formTM3)
        .pipe(
          retry(3),
          catchError(() => {
            return throwError('Something went wrong');
          })
        )
        .subscribe({
          next: (result) => {
            this.formService.isLoadingData = false;
            this.isLoadingSaveButton = false;
            this.message.create('success', 'Save form success');
          },
          error: (error) => {
            this.formService.isLoadingData = false;
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

  selectRow(index: number): void {
    if (
      index === this.selectedRow.sort()[0] - 1 ||
      index === this.selectedRow.sort()[this.selectedRow.length - 1] + 1 ||
      index === this.selectedRow.sort()[0] ||
      index === this.selectedRow.sort()[this.selectedRow.length - 1]
    ) {
      if (this.selectedRow.includes(index) === false)
        this.selectedRow.push(index);
      else this.selectedRow = this.selectedRow.filter((e) => e !== index);
    } else if (this.selectedRow.length === 0) this.selectedRow.push(index);
  }

  onDrop(event: CdkDragDrop<measurementTM3[]>) {
    this.selectedRow.forEach((row) => {
      for (
        let i = row + this.selectedRow.length;
        i <= event.currentIndex;
        i += this.selectedRow.length
      ) {
        this.listRow[i] = JSON.parse(JSON.stringify(this.listRow[row]));
      }
    });
  }

  clearRow(index: number) {
    this.listRow[index] = JSON.parse(JSON.stringify(this.emptyRow));
  }

  deleteRow(index: number) {
    this.listRow.splice(index, 1);
    if (this.listRow.length === 0) {
      this.listRow = [];
    } else {
      this.listRow = this.listRow;
    }
  }

  onImportExcel(event: any) {
    this.formService.isLoadingData = true;
    const formData = new FormData();
    formData.append('excelFile', event.target.files[0]);
    this.formService
      .importExcel(`${API_END_POINT}/sheet/tm3s`, formData)
      .subscribe((data) => {
        this.listRow = [];

        this.firstTransverseSectionFrom = data.firstFrameNo.split('~')[0];
        this.firstTransverseSectionTo = data.firstFrameNo.split('~')[1];
        this.secondTransverseSectionFrom = data.secondFrameNo.split('~')[0];
        this.secondTransverseSectionTo = data.secondFrameNo.split('~')[1];
        this.thirdTransverseSectionFrom = data.thirdFrameNo.split('~')[0];
        this.thirdTransverseSectionTo = data.thirdFrameNo.split('~')[1];

        data.measurementTM3DTOList.forEach((data: any) => {
          this.listRow.push({
            structuralMember: data.structuralMember,
            noOrLetter: data.noOrLetter,
            firstTransverseSectionMeasurementDetail: {
              originalThickness:
                data.firstTransverseSectionMeasurementDetail.originalThickness,
              maxAlwbDim:
                data.firstTransverseSectionMeasurementDetail.maxAlwbDim,
              gaugedP: data.firstTransverseSectionMeasurementDetail.gaugedP,
              gaugedS: data.firstTransverseSectionMeasurementDetail.gaugedS,
              percent: data.firstTransverseSectionMeasurementDetail.percent,
            },
            secondTransverseSectionMeasurementDetail: {
              originalThickness:
                data.secondTransverseSectionMeasurementDetail.originalThickness,
              maxAlwbDim:
                data.secondTransverseSectionMeasurementDetail.maxAlwbDim,
              gaugedP: data.secondTransverseSectionMeasurementDetail.gaugedP,
              gaugedS: data.secondTransverseSectionMeasurementDetail.gaugedS,
              percent: data.secondTransverseSectionMeasurementDetail.percent,
            },
            thirdTransverseSectionMeasurementDetail: {
              originalThickness:
                data.thirdTransverseSectionMeasurementDetail.originalThickness,
              maxAlwbDim:
                data.thirdTransverseSectionMeasurementDetail.maxAlwbDim,
              gaugedP: data.thirdTransverseSectionMeasurementDetail.gaugedP,
              gaugedS: data.thirdTransverseSectionMeasurementDetail.gaugedS,
              percent: data.thirdTransverseSectionMeasurementDetail.percent,
            },
          });
        });

        for (let i = 0; i < data.measurementTM3DTOList.length; i++) {
          if (
            this.listStructuralMember.find(
              (item) =>
                item.param === data.measurementTM3DTOList[i].structuralMember
            ) === undefined
          ) {
            this.listStructuralMember.push({
              id: 0,
              param: data.measurementTM3DTOList[i].structuralMember,
              value: data.measurementTM3DTOList[i].structuralMember,
              type: 'TM3_VALUE',
              edit: false,
            });

            this.listNewStructuralMember.push({
              param: data.measurementTM3DTOList[i].structuralMember,
              value: data.measurementTM3DTOList[i].structuralMember,
              type: 6,
            });
          }
        }

        this.formService.isLoadingData = false;
        this.message.create('success', 'Import excel success');
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
