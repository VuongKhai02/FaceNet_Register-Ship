import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { formTM3 } from 'src/app/share/models/form/formTM3.model';
import { measurementTM3 } from 'src/app/share/models/form/measurementTM3.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { paramValue } from 'src/app/share/models/paramValue.model';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { catchError, retry, throwError } from 'rxjs';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tm3',
  templateUrl: './tm3.component.html',
  styleUrls: ['./tm3.component.css'],
})
export class Tm3Component {
  constructor(
    public formService: FormService,
    public paramValueService: ParamValueService,
    private message: NzMessageService
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

  listStructuralMember: paramValue[] = [];

  API_URL: string = `http://222.252.25.37:9080/api/v1/report-indexes/1/tm3s`;

  selectedRowValue: measurementTM3 = {
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

  startIndex: number = -1;
  endIndex: number = -1;

  isVisible = false;
  isLoadingSaveButton: boolean = false;

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++)
      this.listRow.push({
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
      });

    this.paramValueService.getParamValueByType(6).subscribe((data) => {
      this.listStructuralMember = data;
    });
  }

  addRow() {
    for (let i = 1; i <= this.addRowValue; i++)
      this.listRow.push({
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
      });
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

    this.formTM3.firstFrameNo = `${this.firstTransverseSectionFrom} ~ ${this.firstTransverseSectionTo}`;
    this.formTM3.secondFrameNo = `${this.secondTransverseSectionFrom} ~ ${this.secondTransverseSectionTo}`;
    this.formTM3.thirdFrameNo = `${this.thirdTransverseSectionFrom} ~ ${this.thirdTransverseSectionTo}`;

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
    this.selectedRowValue = this.listRow[index];
  }

  onDrop(event: CdkDragDrop<measurementTM3[]>) {
    this.startIndex = event.previousIndex;
    this.endIndex = event.currentIndex;
    if (this.startIndex < this.endIndex) {
      for (let i = this.startIndex + 1; i <= this.endIndex; i++) {
        this.listRow[i].structuralMember =
          this.selectedRowValue.structuralMember;
        this.listRow[i].noOrLetter = this.selectedRowValue.noOrLetter;
        this.listRow[
          i
        ].firstTransverseSectionMeasurementDetail.originalThickness =
          this.selectedRowValue.firstTransverseSectionMeasurementDetail.originalThickness;
        this.listRow[i].firstTransverseSectionMeasurementDetail.gaugedP =
          this.selectedRowValue.firstTransverseSectionMeasurementDetail.gaugedP;
        this.listRow[i].firstTransverseSectionMeasurementDetail.gaugedS =
          this.selectedRowValue.firstTransverseSectionMeasurementDetail.gaugedS;
        this.listRow[
          i
        ].secondTransverseSectionMeasurementDetail.originalThickness =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.originalThickness;
        this.listRow[i].secondTransverseSectionMeasurementDetail.gaugedP =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.gaugedP;
        this.listRow[i].secondTransverseSectionMeasurementDetail.gaugedS =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.gaugedS;
        this.listRow[
          i
        ].secondTransverseSectionMeasurementDetail.originalThickness =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.originalThickness;
        this.listRow[i].secondTransverseSectionMeasurementDetail.gaugedP =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.gaugedP;
        this.listRow[i].secondTransverseSectionMeasurementDetail.gaugedS =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.gaugedS;
      }
    } else {
      for (let i = this.startIndex - 1; i >= this.endIndex; i--) {
        this.listRow[i].structuralMember =
          this.selectedRowValue.structuralMember;
        this.listRow[i].noOrLetter = this.selectedRowValue.noOrLetter;
        this.listRow[
          i
        ].firstTransverseSectionMeasurementDetail.originalThickness =
          this.selectedRowValue.firstTransverseSectionMeasurementDetail.originalThickness;
        this.listRow[i].firstTransverseSectionMeasurementDetail.gaugedP =
          this.selectedRowValue.firstTransverseSectionMeasurementDetail.gaugedP;
        this.listRow[i].firstTransverseSectionMeasurementDetail.gaugedS =
          this.selectedRowValue.firstTransverseSectionMeasurementDetail.gaugedS;
        this.listRow[
          i
        ].secondTransverseSectionMeasurementDetail.originalThickness =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.originalThickness;
        this.listRow[i].secondTransverseSectionMeasurementDetail.gaugedP =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.gaugedP;
        this.listRow[i].secondTransverseSectionMeasurementDetail.gaugedS =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.gaugedS;
        this.listRow[
          i
        ].secondTransverseSectionMeasurementDetail.originalThickness =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.originalThickness;
        this.listRow[i].secondTransverseSectionMeasurementDetail.gaugedP =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.gaugedP;
        this.listRow[i].secondTransverseSectionMeasurementDetail.gaugedS =
          this.selectedRowValue.secondTransverseSectionMeasurementDetail.gaugedS;
      }
    }
  }
}
