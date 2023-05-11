import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { formTM2 } from 'src/app/share/models/form/formTM2.model';
import { measurementTM2 } from 'src/app/share/models/form/measurementTM2.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';
import { catchError, retry, throwError } from 'rxjs';

@Component({
  selector: 'app-tm2i',
  templateUrl: './tm2i.component.html',
  styleUrls: ['./tm2i.component.css'],
})
export class Tm2iComponent {
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
    name: 'FORM TM2(I)',
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
        this.percentSelected.toString();
      this.listRow[i].secondTransverseSectionMeasurementDetailTM2.percent =
        this.percentSelected.toString();
      this.listRow[i].thirdTransverseSectionMeasurementDetailTM2.percent =
        this.percentSelected.toString();
    }
  }

  clearRow(index: number) {
    this.listRow[index] = JSON.parse(JSON.stringify(this.emptyRow));
  }

  deleteRow(index: number) {
    this.listRow.splice(index, 1);
  }
}
