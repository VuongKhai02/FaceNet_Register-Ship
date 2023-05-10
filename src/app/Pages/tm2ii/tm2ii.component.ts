import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { formTM2 } from 'src/app/share/models/form/formTM2.model';
import { measurementTM2 } from 'src/app/share/models/form/measurementTM2.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';
import { catchError, retry, throwError } from 'rxjs';

@Component({
  selector: 'app-tm2ii',
  templateUrl: './tm2ii.component.html',
  styleUrls: ['./tm2ii.component.css'],
})
export class Tm2iiComponent {
  constructor(
    public formService: FormService,
    private message: NzMessageService
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
    name: '',
    firstFrameNoTM2: '',
    secondFrameNoTM2: '',
    thirdFrameNoTM2: '',
    measurementTM2List: this.listRow,
  };

  API_URL: string = `http://222.252.25.37:9080/api/v1/report-indexes/1/tm2s`;

  listPercentOption = [
    { label: '20%', value: 1 },
    { label: '20% + 1', value: 2 },
    { label: '25%', value: 3 },
    { label: '30%', value: 4 },
  ];

  percentSelected: number = 0;

  selectedRow: number = -1;
  selectedRowValue: measurementTM2 = {
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

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++)
      this.listRow.push({
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
      });
  }

  addRow() {
    for (let i = 1; i <= this.addRowValue; i++)
      this.listRow.push({
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
      });
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
    this.isLoadingSaveButton = true;
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
    this.formTM2.firstFrameNoTM2 = `${this.firstTransverseSectionFrom} ~ ${this.firstTransverseSectionTo}`;
    this.formTM2.secondFrameNoTM2 = `${this.secondTransverseSectionFrom} ~ ${this.secondTransverseSectionTo}`;
    this.formTM2.thirdFrameNoTM2 = `${this.thirdTransverseSectionFrom} ~ ${this.thirdTransverseSectionTo}`;
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

  onDrop(event: CdkDragDrop<measurementTM2[]>) {
    this.startIndex = event.previousIndex;
    this.endIndex = event.currentIndex;
    if (this.startIndex < this.endIndex) {
      for (let i = this.startIndex + 1; i <= this.endIndex; i++) {
        this.listRow[i].strakePosition = this.selectedRowValue.strakePosition;
        this.listRow[i].noOrLetter = this.selectedRowValue.noOrLetter;
        this.listRow[
          i
        ].firstTransverseSectionMeasurementDetailTM2.originalThickness =
          this.selectedRowValue.firstTransverseSectionMeasurementDetailTM2.originalThickness;
        this.listRow[i].firstTransverseSectionMeasurementDetailTM2.gaugedP =
          this.selectedRowValue.firstTransverseSectionMeasurementDetailTM2.gaugedP;
        this.listRow[i].firstTransverseSectionMeasurementDetailTM2.gaugedS =
          this.selectedRowValue.firstTransverseSectionMeasurementDetailTM2.gaugedS;
        this.listRow[
          i
        ].secondTransverseSectionMeasurementDetailTM2.originalThickness =
          this.selectedRowValue.secondTransverseSectionMeasurementDetailTM2.originalThickness;
        this.listRow[i].secondTransverseSectionMeasurementDetailTM2.gaugedP =
          this.selectedRowValue.secondTransverseSectionMeasurementDetailTM2.gaugedP;
        this.listRow[i].secondTransverseSectionMeasurementDetailTM2.gaugedS =
          this.selectedRowValue.secondTransverseSectionMeasurementDetailTM2.gaugedS;
        this.listRow[
          i
        ].thirdTransverseSectionMeasurementDetailTM2.originalThickness =
          this.selectedRowValue.thirdTransverseSectionMeasurementDetailTM2.originalThickness;
        this.listRow[i].thirdTransverseSectionMeasurementDetailTM2.gaugedP =
          this.selectedRowValue.thirdTransverseSectionMeasurementDetailTM2.gaugedP;
        this.listRow[i].thirdTransverseSectionMeasurementDetailTM2.gaugedS =
          this.selectedRowValue.thirdTransverseSectionMeasurementDetailTM2.gaugedS;
      }
    } else {
      for (let i = this.startIndex - 1; i >= this.endIndex; i--) {
        this.listRow[i].strakePosition = this.selectedRowValue.strakePosition;
        this.listRow[i].noOrLetter = this.selectedRowValue.noOrLetter;
        this.listRow[
          i
        ].firstTransverseSectionMeasurementDetailTM2.originalThickness =
          this.selectedRowValue.firstTransverseSectionMeasurementDetailTM2.originalThickness;
        this.listRow[i].firstTransverseSectionMeasurementDetailTM2.gaugedP =
          this.selectedRowValue.firstTransverseSectionMeasurementDetailTM2.gaugedP;
        this.listRow[i].firstTransverseSectionMeasurementDetailTM2.gaugedS =
          this.selectedRowValue.firstTransverseSectionMeasurementDetailTM2.gaugedS;
        this.listRow[
          i
        ].secondTransverseSectionMeasurementDetailTM2.originalThickness =
          this.selectedRowValue.secondTransverseSectionMeasurementDetailTM2.originalThickness;
        this.listRow[i].secondTransverseSectionMeasurementDetailTM2.gaugedP =
          this.selectedRowValue.secondTransverseSectionMeasurementDetailTM2.gaugedP;
        this.listRow[i].secondTransverseSectionMeasurementDetailTM2.gaugedS =
          this.selectedRowValue.secondTransverseSectionMeasurementDetailTM2.gaugedS;
        this.listRow[
          i
        ].thirdTransverseSectionMeasurementDetailTM2.originalThickness =
          this.selectedRowValue.thirdTransverseSectionMeasurementDetailTM2.originalThickness;
        this.listRow[i].thirdTransverseSectionMeasurementDetailTM2.gaugedP =
          this.selectedRowValue.thirdTransverseSectionMeasurementDetailTM2.gaugedP;
        this.listRow[i].thirdTransverseSectionMeasurementDetailTM2.gaugedS =
          this.selectedRowValue.thirdTransverseSectionMeasurementDetailTM2.gaugedS;
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
      this.listRow[i].firstTransverseSectionMeasurementDetailTM2.percent =
        this.percentSelected.toString();
      this.listRow[i].secondTransverseSectionMeasurementDetailTM2.percent =
        this.percentSelected.toString();
      this.listRow[i].thirdTransverseSectionMeasurementDetailTM2.percent =
        this.percentSelected.toString();
    }
  }
}
