import { Component } from '@angular/core';
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

@Component({
  selector: 'app-tm3',
  templateUrl: './tm3.component.html',
  styleUrls: ['./tm3.component.css'],
})
export class Tm3Component {
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

  partId: string = this.router.url.split('/')[2];
  tmId: string = this.router.url.split('/')[4];
  API_URL: string = `http://222.252.25.37:9080/api/v1/report-indexes/${this.partId}/tm3s`;

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

  isLoadingImportExcel: boolean = false;

  generalParticular!: GeneralParticular;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        this.router.url.split('/')[1] === 'part' &&
        this.router.url.split('/')[3].slice(0, 3) === 'tm3' &&
        this.router.url.split('/')[4] !== '-1'
      ) {
        this.partId = this.router.url.split('/')[2];
        this.tmId = this.router.url.split('/')[4];
        this.formService.getDataForm('tm3s', this.tmId).subscribe((data) => {
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

    if (Number(this.tmId) === -1) {
      for (let i = 1; i <= 20; i++)
        this.listRow.push(JSON.parse(JSON.stringify(this.emptyRow)));
    } else {
      this.formService.getDataForm('tm3s', this.tmId).subscribe((data) => {
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
              member.value = e.firstTransverseSectionMeasurementDetail.percent;
              return;
            }
          });
        });
      });
    }

    this.paramValueService.getParamValueByType(6).subscribe((data) => {
      this.listStructuralMember = data;
    });

    this.paramValueService.getParamValueByType(11).subscribe((data) => {
      this.listFormCode = data;
    });

    if (this.formService.getParticularData() != null)
      this.generalParticular = this.formService.getParticularData();
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

    if (Number(this.tmId) === -1) {
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
        .updateForm('tm3s', this.tmId, this.formTM3)
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
    const formData = new FormData();
    formData.append('excelFile', event.target.files[0]);
    this.formService
      .importExcel(`${API_END_POINT}/report-indexes/1/tm3s/sheet`, formData)
      .subscribe((data) => {
        data.measurementTM3DTOList.forEach((data: any) => {
          this.listRow.push({
            structuralMember: data.structuralMember,
            noOrLetter: data.noOrLetter,
            firstTransverseSectionMeasurementDetail: {
              originalThickness:
                data.forwardReadingMeasurementDetail.originalThickness,
              maxAlwbDim: data.forwardReadingMeasurementDetail.maxAlwbDim,
              gaugedP: data.forwardReadingMeasurementDetail.gaugedP,
              gaugedS: data.forwardReadingMeasurementDetail.gaugedS,
              percent: data.forwardReadingMeasurementDetail.percent,
            },
            secondTransverseSectionMeasurementDetail: {
              originalThickness:
                data.afterReadingMeasurementDetail.originalThickness,
              maxAlwbDim: data.afterReadingMeasurementDetail.maxAlwbDim,
              gaugedP: data.afterReadingMeasurementDetail.gaugedP,
              gaugedS: data.afterReadingMeasurementDetail.gaugedS,
              percent: data.afterReadingMeasurementDetail.percent,
            },
            thirdTransverseSectionMeasurementDetail: {
              originalThickness:
                data.afterReadingMeasurementDetail.originalThickness,
              maxAlwbDim: data.afterReadingMeasurementDetail.maxAlwbDim,
              gaugedP: data.afterReadingMeasurementDetail.gaugedP,
              gaugedS: data.afterReadingMeasurementDetail.gaugedS,
              percent: data.afterReadingMeasurementDetail.percent,
            },
          });
        });
      });
  }
}
