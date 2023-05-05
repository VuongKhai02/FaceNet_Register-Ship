import { Component, OnInit } from '@angular/core';
import { formTM1 } from 'src/app/share/models/form/formTM1.model';
import { measurementTM1 } from 'src/app/share/models/form/measurementTM1.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-tm1',
  templateUrl: './tm1.component.html',
  styleUrls: ['./tm1.component.css'],
})
export class Tm1Component implements OnInit {
  constructor(
    public formService: FormService,
    private message: NzMessageService
  ) {}

  addRowValue: number = 0;
  listRow: measurementTM1[] = [];
  formTM1: formTM1 = {
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
  visible: boolean = false;

  API_URL: string = `http://222.252.25.37:9080/api/v1/report-indexes/1/tm1s`;

  selectedRow: number = -1;
  selectedRowValue: measurementTM1 = {
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

  startIndex: number = -1;
  endIndex: number = -1;

  isVisible: boolean = false;
  isLoadingSaveButton: boolean = false;

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++)
      this.listRow.push({
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
      });
  }

  addRow() {
    if (this.addRowValue > 0 && this.addRowValue <= 100)
      for (let i = 1; i <= this.addRowValue; i++)
        this.listRow.push({
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
        });
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
    this.formTM1.measurementTM1List = this.formTM1.measurementTM1List.filter(
      (form) =>
        form.platePosition !== '' ||
        form.noOrLetter !== '' ||
        form.forwardReadingMeasurementDetail.originalThickness !== '' ||
        form.forwardReadingMeasurementDetail.gaugedP !== '' ||
        form.forwardReadingMeasurementDetail.gaugedS !== '' ||
        form.forwardReadingMeasurementDetail.originalThickness !== '' ||
        form.forwardReadingMeasurementDetail.gaugedP !== '' ||
        form.forwardReadingMeasurementDetail.gaugedS !== ''
    );
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

  onDragEnded(event: CdkDragEnd) {
    event.source.reset();
  }

  selectRow(index: number) {
    this.selectedRow = index;
    this.selectedRowValue = this.listRow[index];
  }

  onDrop(event: CdkDragDrop<measurementTM1[]>) {
    this.startIndex = event.previousIndex;
    this.endIndex = event.currentIndex;
    if (this.startIndex < this.endIndex) {
      for (let i = this.startIndex + 1; i <= this.endIndex; i++) {
        this.listRow[i].platePosition = this.selectedRowValue.platePosition;
        this.listRow[i].noOrLetter = this.selectedRowValue.noOrLetter;
        this.listRow[i].forwardReadingMeasurementDetail.originalThickness =
          this.selectedRowValue.forwardReadingMeasurementDetail.originalThickness;
        this.listRow[i].forwardReadingMeasurementDetail.gaugedP =
          this.selectedRowValue.forwardReadingMeasurementDetail.gaugedP;
        this.listRow[i].forwardReadingMeasurementDetail.gaugedS =
          this.selectedRowValue.forwardReadingMeasurementDetail.gaugedS;
        this.listRow[i].afterReadingMeasurementDetail.originalThickness =
          this.selectedRowValue.afterReadingMeasurementDetail.originalThickness;
        this.listRow[i].afterReadingMeasurementDetail.gaugedP =
          this.selectedRowValue.afterReadingMeasurementDetail.gaugedP;
        this.listRow[i].afterReadingMeasurementDetail.gaugedS =
          this.selectedRowValue.afterReadingMeasurementDetail.gaugedS;
      }
    } else {
      for (let i = this.startIndex - 1; i >= this.endIndex; i--) {
        this.listRow[i].platePosition = this.selectedRowValue.platePosition;
        this.listRow[i].noOrLetter = this.selectedRowValue.noOrLetter;
        this.listRow[i].forwardReadingMeasurementDetail.originalThickness =
          this.selectedRowValue.forwardReadingMeasurementDetail.originalThickness;
        this.listRow[i].forwardReadingMeasurementDetail.gaugedP =
          this.selectedRowValue.forwardReadingMeasurementDetail.gaugedP;
        this.listRow[i].forwardReadingMeasurementDetail.gaugedS =
          this.selectedRowValue.forwardReadingMeasurementDetail.gaugedS;
        this.listRow[i].afterReadingMeasurementDetail.originalThickness =
          this.selectedRowValue.afterReadingMeasurementDetail.originalThickness;
        this.listRow[i].afterReadingMeasurementDetail.gaugedP =
          this.selectedRowValue.afterReadingMeasurementDetail.gaugedP;
        this.listRow[i].afterReadingMeasurementDetail.gaugedS =
          this.selectedRowValue.afterReadingMeasurementDetail.gaugedS;
      }
    }
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
        this.percentSelected.toString();
      this.listRow[i].afterReadingMeasurementDetail.percent =
        this.percentSelected.toString();
    }
  }
}
