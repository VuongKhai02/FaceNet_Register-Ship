import { Component, OnInit } from '@angular/core';
import { formTM1 } from 'src/app/share/models/form/formTM1.model';
import { measurementTM1 } from 'src/app/share/models/form/measurementTM1.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ParamValue } from 'src/app/share/models/paramValue.model';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { NavigationEnd, Router } from '@angular/router';
import { API_END_POINT } from 'src/environments/environment';
import { GeneralParticular } from 'src/app/share/models/generalParticulars.model';
import { Sketch } from 'src/app/share/models/sketches.model';

@Component({
  selector: 'app-tm1',
  templateUrl: './tm1.component.html',
  styleUrls: ['./tm1.component.css'],
})
export class Tm1Component implements OnInit {
  constructor(
    public formService: FormService,
    private message: NzMessageService,
    private paramValueService: ParamValueService,
    private router: Router
  ) {}

  addRowValue: number = 0;

  listRow: measurementTM1[] = [];
  formTM1: formTM1 = {
    code: '',
    strakePosition: '',
    measurementTM1List: this.listRow,
  };

  listPercentOption = [
    { label: '20%', value: 1 },
    { label: '20% + 1', value: 2 },
    { label: '25%', value: 3 },
    { label: '30%', value: 4 },
  ];

  percentSelected: number = 0;
  percentValue: string = '';
  visible: boolean = false;

  API_URL: string = `${API_END_POINT}/report-indexes/${
    this.router.url.split('/')[2]
  }/tm1s`;

  emptyRow: measurementTM1 = {
    platePosition: '',
    noOrLetter: '',
    forwardReadingMeasurementDetail: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
    afterReadingMeasurementDetail: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
  };

  isVisible: boolean = false;
  isLoadingSaveButton: boolean = false;

  selectedRow: number[] = [];
  listFormCode: ParamValue[] = [];

  generalParticular!: GeneralParticular;

  selectedFile: any;

  isVisibleAddSketches: boolean = false;
  isConfirmLoadingSketches: boolean = false;
  isLoadingSketches: boolean = false;
  listSketches: Sketch[] = [];
  listPreviewSketches: any[] = [];
  listCurrentSketChes: File[] = [];
  listSaveSketches: FormData = new FormData();

  ngOnInit(): void {
    this.paramValueService.getParamValueByType(11).subscribe((data) => {
      this.listFormCode = data;
    });

    if (this.formService.getParticularData() != null) {
      this.generalParticular = this.formService.getParticularData();
    }

    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        this.router.url.split('/')[1] === 'part' &&
        this.router.url.split('/')[3].slice(0, 3) === 'tm1' &&
        this.router.url.split('/')[4] !== '-1'
      ) {
        this.formService.isLoadingData = true;

        this.formService
          .getDataForm('tm1s', this.router.url.split('/')[4])
          .subscribe(
            (data) => {
              this.formTM1.code = data.code;
              this.formTM1.strakePosition = data.strakePosition;
              this.listRow = data.measurementTM1DTOList;

              this.percentValue =
                data.measurementTM1DTOList[0].forwardReadingMeasurementDetail.percent;

              if (data.measurementTM1DTOList.length > 0) {
                this.percentValue =
                  data.measurementTM1DTOList[0].forwardReadingMeasurementDetail.percent;
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
        this.formTM1.code = '';
        this.formTM1.strakePosition = '';
        this.percentValue = '';
        for (let i = 1; i <= 20; i++)
          this.listRow.push(JSON.parse(JSON.stringify(this.emptyRow)));
      }
    });

    if (Number(this.router.url.split('/')[4]) === -1) {
      this.percentValue = '';
      for (let i = 1; i <= 20; i++)
        this.listRow.push(JSON.parse(JSON.stringify(this.emptyRow)));
    } else {
      this.formService.isLoadingData = true;

      this.formService
        .getDataForm('tm1s', this.router.url.split('/')[4])
        .subscribe(
          (data) => {
            this.formTM1.code = data.code;
            this.formTM1.strakePosition = data.strakePosition;
            this.listRow = data.measurementTM1DTOList;

            this.percentValue =
              data.measurementTM1DTOList[0].forwardReadingMeasurementDetail.percent;

            if (data.measurementTM1DTOList.length > 0) {
              this.percentValue =
                data.measurementTM1DTOList[0].forwardReadingMeasurementDetail.percent;
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

  convertToNumber(str: string): number {
    return Number(str);
  }

  parseInt(str: number) {
    return Number.parseInt(String(str));
  }

  parseFloat(str: number) {
    return Number.parseFloat(String(str));
  }

  onSaveForm() {
    this.isLoadingSaveButton = true;
    this.formTM1.measurementTM1List = this.listRow;
    this.formTM1.measurementTM1List = this.formTM1.measurementTM1List.filter(
      (form) =>
        form.platePosition !== '' ||
        form.noOrLetter !== '' ||
        form.forwardReadingMeasurementDetail.originalThickness !== '' ||
        form.forwardReadingMeasurementDetail.gaugedP !== '' ||
        form.forwardReadingMeasurementDetail.gaugedS !== '' ||
        form.afterReadingMeasurementDetail.originalThickness !== '' ||
        form.afterReadingMeasurementDetail.gaugedP !== '' ||
        form.afterReadingMeasurementDetail.gaugedS !== ''
    );

    this.listRow = this.formTM1.measurementTM1List;

    this.formTM1.measurementTM1List = this.formTM1.measurementTM1List.map(
      (measurement) => {
        measurement.forwardReadingMeasurementDetail.maxAlwbDim =
          this.formService.calculateForMaxAlwbDim(
            measurement.forwardReadingMeasurementDetail.originalThickness,
            this.percentSelected
          );
        return measurement;
      }
    );

    if (Number(this.router.url.split('/')[4]) === -1) {
      this.formService
        .addFormToAPI(this.API_URL, this.formTM1)
        .pipe(
          retry(3),
          catchError(() => {
            return throwError('Something went wrong');
          })
        )
        .subscribe({
          next: (result) => {
            this.isLoadingSaveButton = false;
            this.formService.isLoadingData = false;
            this.router.navigate([
              'part',
              this.router.url.split('/')[2],
              this.router.url.split('/')[3],
              result.id,
            ]);
            this.message.create('success', 'Save form success');
          },
          error: (error) => {
            this.isLoadingSaveButton = false;
            this.formService.isLoadingData = false;
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
          },
        });
    } else {
      this.formService
        .updateForm('tm1s', this.router.url.split('/')[4], this.formTM1)
        .pipe(
          retry(3),
          catchError(() => {
            return throwError('Something went wrong');
          })
        )
        .subscribe({
          next: (result) => {
            this.isLoadingSaveButton = false;
            this.formService.isLoadingData = false;
            this.message.create('success', 'Save form success');
          },
          error: (error) => {
            this.isLoadingSaveButton = false;
            this.formService.isLoadingData = false;
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

  onDrop(event: CdkDragDrop<measurementTM1[]>) {
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
      this.listRow[i].forwardReadingMeasurementDetail.percent =
        this.percentValue;
      this.listRow[i].afterReadingMeasurementDetail.percent = this.percentValue;
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
    }
  }

  onImportExcel(event: any) {
    this.formService.isLoadingData = true;
    const formData = new FormData();
    formData.append('excelFile', event.target.files[0]);
    this.formService
      .importExcel(`${API_END_POINT}/sheet/tm1s`, formData)
      .subscribe(
        (data) => {
          this.listRow = [];
          this.formTM1.strakePosition = data.strakePosition;
          data.measurementTM1DTOList.forEach((data: any) => {
            this.listRow.push({
              platePosition: data.platePosition,
              noOrLetter: data.noOrLetter,
              forwardReadingMeasurementDetail: {
                originalThickness:
                  data.forwardReadingMeasurementDetail.originalThickness,
                maxAlwbDim: data.forwardReadingMeasurementDetail.maxAlwbDim,
                gaugedP: data.forwardReadingMeasurementDetail.gaugedP,
                gaugedS: data.forwardReadingMeasurementDetail.gaugedS,
                percent: data.forwardReadingMeasurementDetail.percent,
              },
              afterReadingMeasurementDetail: {
                originalThickness:
                  data.afterReadingMeasurementDetail.originalThickness,
                maxAlwbDim: data.afterReadingMeasurementDetail.maxAlwbDim,
                gaugedP: data.afterReadingMeasurementDetail.gaugedP,
                gaugedS: data.afterReadingMeasurementDetail.gaugedS,
                percent: data.afterReadingMeasurementDetail.percent,
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
