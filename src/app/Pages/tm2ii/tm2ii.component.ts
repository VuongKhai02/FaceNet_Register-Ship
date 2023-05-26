import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { formTM2 } from 'src/app/share/models/form/formTM2.model';
import { measurementTM2 } from 'src/app/share/models/form/measurementTM2.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';
import { catchError, retry, throwError } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { ParamValue } from 'src/app/share/models/paramValue.model';
import { GeneralParticular } from 'src/app/share/models/generalParticulars.model';
import { API_END_POINT } from 'src/environments/environment';

@Component({
  selector: 'app-tm2ii',
  templateUrl: './tm2ii.component.html',
  styleUrls: ['./tm2ii.component.css'],
})
export class Tm2iiComponent {
  constructor(
    public formService: FormService,
    private message: NzMessageService,
    private router: Router,
    private paramValueService: ParamValueService
  ) {}

  addRowValue: number = 0;

  firstTransverseSectionFrom: string = '';
  firstTransverseSectionTo: string = '';
  secondTransverseSectionFrom: string = '';
  secondTransverseSectionTo: string = '';
  thirdTransverseSectionFrom: string = '';
  thirdTransverseSectionTo: string = '';

  listRow: measurementTM2[] = [];
  formTM2: formTM2 = {
    code: '',
    name: 'TM2(II)',
    firstFrameNoTM2: '',
    secondFrameNoTM2: '',
    thirdFrameNoTM2: '',
    measurementTM2List: this.listRow,
  };

  API_URL: string = `${API_END_POINT}/report-indexes/${
    this.router.url.split('/')[2]
  }/tm2s`;

  listPercentOption = [
    { label: '20%', value: 1 },
    { label: '20% + 1', value: 2 },
    { label: '25%', value: 3 },
    { label: '30%', value: 4 },
  ];

  percentSelected: number = 0;
  percentValue: string = '';

  emptyRow: measurementTM2 = {
    strakePosition: '',
    noOrLetter: '',
    firstTransverseSectionMeasurementDetailTM2: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
    secondTransverseSectionMeasurementDetailTM2: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
    thirdTransverseSectionMeasurementDetailTM2: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
  };

  startIndex: number = -1;
  endIndex: number = -1;

  isVisible = false;
  isLoadingSaveButton: boolean = false;

  selectedRow: number[] = [];

  listFormCode: ParamValue[] = [];

  generalParticular!: GeneralParticular;

  selectedFile: any;

  ngOnInit(): void {
    this.paramValueService.getParamValueByType(11).subscribe((data) => {
      this.listFormCode = data;
    });

    if (this.formService.getParticularData() != null)
      this.generalParticular = this.formService.getParticularData();

    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        this.router.url.split('/')[1] === 'part' &&
        this.router.url.split('/')[3].slice(0, 3) === 'tm2' &&
        this.router.url.split('/')[4] !== '-1'
      ) {
        this.formService.isLoadingData = true;

        this.formService
          .getDataForm('tm2s', this.router.url.split('/')[4])
          .subscribe(
            (data) => {
              this.formTM2.code = data.code;
              this.listRow = data.measurementTM2DTOList;

              this.firstTransverseSectionFrom =
                data.firstFrameNoTM2.split('~')[0];
              this.firstTransverseSectionTo =
                data.firstFrameNoTM2.split('~')[1];
              this.secondTransverseSectionFrom =
                data.secondFrameNoTM2.split('~')[0];
              this.secondTransverseSectionTo =
                data.secondFrameNoTM2.split('~')[1];
              this.thirdTransverseSectionFrom =
                data.thirdFrameNoTM2.split('~')[0];
              this.thirdTransverseSectionTo =
                data.thirdFrameNoTM2.split('~')[1];

              if (data.measurementTM2DTOList.length > 0) {
                this.percentValue =
                  data.measurementTM2DTOList[0].firstTransverseSectionMeasurementDetailTM2.percent;
                if (
                  this.listPercentOption.filter(
                    (percent) => percent.label === this.percentValue
                  ).length > 0
                )
                  this.percentSelected = this.listPercentOption.filter(
                    (percent) => percent.label === this.percentValue
                  )[0].value;
              }

              this.formService.isLoadingData = false;
            },
            (error) => {
              this.formService.isLoadingData = false;
            }
          );
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
        .getDataForm('tm2s', this.router.url.split('/')[4])
        .subscribe(
          (data) => {
            this.formTM2.code = data.code;
            this.listRow = data.measurementTM2DTOList;

            this.firstTransverseSectionFrom =
              data.firstFrameNoTM2.split('~')[0];
            this.firstTransverseSectionTo = data.firstFrameNoTM2.split('~')[1];
            this.secondTransverseSectionFrom =
              data.secondFrameNoTM2.split('~')[0];
            this.secondTransverseSectionTo =
              data.secondFrameNoTM2.split('~')[1];
            this.thirdTransverseSectionFrom =
              data.thirdFrameNoTM2.split('~')[0];
            this.thirdTransverseSectionTo = data.thirdFrameNoTM2.split('~')[1];

            if (data.measurementTM2DTOList.length > 0) {
              this.percentValue =
                data.measurementTM2DTOList[0].firstTransverseSectionMeasurementDetailTM2.percent;
              if (
                this.listPercentOption.filter(
                  (percent) => percent.label === this.percentValue
                ).length > 0
              )
                this.percentSelected = this.listPercentOption.filter(
                  (percent) => percent.label === this.percentValue
                )[0].value;
            }

            this.formService.isLoadingData = false;
          },
          (error) => {
            this.formService.isLoadingData = false;
          }
        );
    }
  }

  addRow() {
    if (this.addRowValue > 0 && this.addRowValue <= 100)
      for (let i = 1; i <= this.addRowValue; i++)
        this.listRow.push(JSON.parse(JSON.stringify(this.emptyRow)));
  }

  convertToNumber(str: string) {
    return Number(str);
  }

  parseInt(str: number) {
    return Number.parseInt(String(str));
  }

  parseFloat(str: number) {
    return Number.parseFloat(String(str));
  }

  onSaveForm() {
    this.formService.isLoadingData = true;
    this.isLoadingSaveButton = true;
    this.formTM2.measurementTM2List = this.listRow;
    this.onChangePercent();
    this.formTM2.measurementTM2List = this.formTM2.measurementTM2List.filter(
      (form) =>
        form.strakePosition !== '' ||
        form.noOrLetter !== '' ||
        form.firstTransverseSectionMeasurementDetailTM2.originalThickness !==
          '' ||
        form.firstTransverseSectionMeasurementDetailTM2.gaugedP !== '' ||
        form.firstTransverseSectionMeasurementDetailTM2.gaugedS !== '' ||
        form.secondTransverseSectionMeasurementDetailTM2.originalThickness !==
          '' ||
        form.secondTransverseSectionMeasurementDetailTM2.gaugedP !== '' ||
        form.secondTransverseSectionMeasurementDetailTM2.gaugedS !== '' ||
        form.thirdTransverseSectionMeasurementDetailTM2.originalThickness !==
          '' ||
        form.thirdTransverseSectionMeasurementDetailTM2.gaugedP !== '' ||
        form.thirdTransverseSectionMeasurementDetailTM2.gaugedS !== ''
    );

    this.listRow = this.formTM2.measurementTM2List;

    this.formTM2.firstFrameNoTM2 = `${this.firstTransverseSectionFrom}~${this.firstTransverseSectionTo}`;
    this.formTM2.secondFrameNoTM2 = `${this.secondTransverseSectionFrom}~${this.secondTransverseSectionTo}`;
    this.formTM2.thirdFrameNoTM2 = `${this.thirdTransverseSectionFrom}~${this.thirdTransverseSectionTo}`;

    if (Number(this.router.url.split('/')[4]) === -1) {
      this.formService
        .addFormToAPI(this.API_URL, this.formTM2)
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
              this.router.url.split('/')[2],
              this.router.url.split('/')[3],
              result.id,
            ]);
            this.formService.isLoadingData = false;
          },
          error: (error) => {
            this.isLoadingSaveButton = false;
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
            this.formService.isLoadingData = false;
          },
        });
    } else {
      this.formService
        .updateForm('tm2s', this.router.url.split('/')[4], this.formTM2)
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
            this.formService.isLoadingData = false;
          },
          error: (error) => {
            this.isLoadingSaveButton = false;
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
            this.formService.isLoadingData = false;
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

  onDrop(event: CdkDragDrop<measurementTM2[]>) {
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

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.addRowValue > 0 && this.addRowValue <= 100) {
      this.addRow();
      this.isVisible = false;
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
    this.isVisible = false;
  }

  onChangePercent() {
    for (let i = 0; i < this.listRow.length; i++) {
      this.listRow[i].firstTransverseSectionMeasurementDetailTM2.percent =
        this.percentValue;
      this.listRow[i].secondTransverseSectionMeasurementDetailTM2.percent =
        this.percentValue;
      this.listRow[i].thirdTransverseSectionMeasurementDetailTM2.percent =
        this.percentValue;
    }

    if (
      this.listPercentOption.filter(
        (percent) => percent.label === this.percentValue
      ).length > 0
    )
      this.percentSelected = this.listPercentOption.filter(
        (percent) => percent.label === this.percentValue
      )[0].value;
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
      .importExcel(`${API_END_POINT}/sheet/tm2s`, formData)
      .subscribe(
        (data) => {
          this.listRow = [];

          this.firstTransverseSectionFrom = data.firstFrameNoTM2.split('~')[0];
          this.firstTransverseSectionTo = data.firstFrameNoTM2.split('~')[1];
          this.secondTransverseSectionFrom =
            data.secondFrameNoTM2.split('~')[0];
          this.secondTransverseSectionTo = data.secondFrameNoTM2.split('~')[1];
          this.thirdTransverseSectionFrom = data.thirdFrameNoTM2.split('~')[0];
          this.thirdTransverseSectionTo = data.thirdFrameNoTM2.split('~')[1];

          data.measurementTM2DTOList.forEach((data: any) => {
            this.listRow.push({
              strakePosition: data.strakePosition,
              noOrLetter: data.noOrLetter,
              firstTransverseSectionMeasurementDetailTM2: {
                originalThickness:
                  data.firstTransverseSectionMeasurementDetailTM2
                    .originalThickness,
                maxAlwbDim:
                  data.firstTransverseSectionMeasurementDetailTM2.maxAlwbDim,
                gaugedP:
                  data.firstTransverseSectionMeasurementDetailTM2.gaugedP,
                gaugedS:
                  data.firstTransverseSectionMeasurementDetailTM2.gaugedS,
                percent:
                  data.firstTransverseSectionMeasurementDetailTM2.percent,
              },
              secondTransverseSectionMeasurementDetailTM2: {
                originalThickness:
                  data.secondTransverseSectionMeasurementDetailTM2
                    .originalThickness,
                maxAlwbDim:
                  data.secondTransverseSectionMeasurementDetailTM2.maxAlwbDim,
                gaugedP:
                  data.secondTransverseSectionMeasurementDetailTM2.gaugedP,
                gaugedS:
                  data.secondTransverseSectionMeasurementDetailTM2.gaugedS,
                percent:
                  data.secondTransverseSectionMeasurementDetailTM2.percent,
              },
              thirdTransverseSectionMeasurementDetailTM2: {
                originalThickness:
                  data.thirdTransverseSectionMeasurementDetailTM2
                    .originalThickness,
                maxAlwbDim:
                  data.thirdTransverseSectionMeasurementDetailTM2.maxAlwbDim,
                gaugedP:
                  data.thirdTransverseSectionMeasurementDetailTM2.gaugedP,
                gaugedS:
                  data.thirdTransverseSectionMeasurementDetailTM2.gaugedS,
                percent:
                  data.thirdTransverseSectionMeasurementDetailTM2.percent,
              },
            });
          });

          this.formService.isLoadingData = false;
          this.message.create('success', 'Import excel success');
        },
        (error) => {
          this.formService.isLoadingData = false;
        }
      );
    this.selectedFile = null;
  }
}
