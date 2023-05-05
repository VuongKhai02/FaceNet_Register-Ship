import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, retry, throwError } from 'rxjs';
import { formTM7 } from 'src/app/share/models/form/formTM7.model';
import { frameNumberTM7 } from 'src/app/share/models/form/frameNumberTM7.model';
import { measurementTM7 } from 'src/app/share/models/form/measurementTM7.model';
import { paramValue } from 'src/app/share/models/paramValue.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tm7',
  templateUrl: './tm7.component.html',
  styleUrls: ['./tm7.component.css'],
})
export class Tm7Component implements OnInit {
  constructor(
    public formService: FormService,
    public paramValueService: ParamValueService,
    private message: NzMessageService
  ) {}

  addRowValue: number = 0;
  listRow: measurementTM7[] = [];

  listStructuralMember: paramValue[] = [];
  listFrameNumber: frameNumberTM7[] = [];

  formTM7: formTM7 = {
    description: '',
    name: '',
    frameNumberList: this.listFrameNumber,
  };

  isPercentVisible: boolean = false;
  percentSelected: number = 1;
  structuralMemberSelected: number = -1;

  API_URL: string = `http://222.252.25.37:9080/api/v1/report-indexes/1/tm4s`;

  selectedRowValue: measurementTM7 = {
    name: '',
    upperPart: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
    midPart: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
    lowerPart: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
  };

  startIndex: number = -1;
  endIndex: number = -1;

  isLoadingSaveButton: boolean = false;

  isAddRowVisible: boolean = false;

  ngOnInit(): void {
    this.listFrameNumber.push({
      name: '',
      measurementTM7List: this.listRow,
    });

    for (let i = 1; i <= 20; i++)
      this.listRow.push({
        name: '',
        upperPart: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
          percent: '',
        },
        midPart: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
          percent: '',
        },
        lowerPart: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
          percent: '',
        },
      });
  }

  addRow() {
    if (this.structuralMemberSelected >= 0) {
      for (let i = 1; i <= this.addRowValue; i++)
        this.listFrameNumber[
          this.structuralMemberSelected
        ].measurementTM7List.push({
          name: '',
          upperPart: {
            originalThickness: '',
            maxAlwbDim: '',
            gaugedP: '',
            gaugedS: '',
            percent: '',
          },
          midPart: {
            originalThickness: '',
            maxAlwbDim: '',
            gaugedP: '',
            gaugedS: '',
            percent: '',
          },
          lowerPart: {
            originalThickness: '',
            maxAlwbDim: '',
            gaugedP: '',
            gaugedS: '',
            percent: '',
          },
        });
    } else if (this.structuralMemberSelected == -1) {
      this.listFrameNumber.push({
        name: '',
        measurementTM7List: this.listRow,
      });

      for (let i = 1; i <= this.addRowValue; i++)
        this.listFrameNumber[
          this.listFrameNumber.length - 1
        ].measurementTM7List.push({
          name: '',
          upperPart: {
            originalThickness: '',
            maxAlwbDim: '',
            gaugedP: '',
            gaugedS: '',
            percent: '',
          },
          midPart: {
            originalThickness: '',
            maxAlwbDim: '',
            gaugedP: '',
            gaugedS: '',
            percent: '',
          },
          lowerPart: {
            originalThickness: '',
            maxAlwbDim: '',
            gaugedP: '',
            gaugedS: '',
            percent: '',
          },
        });
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
    this.formTM7.frameNumberList.map((form) => {
      form.measurementTM7List
        .filter((row) => row.name === param)
        .map((row) => {
          row.upperPart.percent = percent;
          row.midPart.percent = percent;
          row.lowerPart.percent = percent;
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
        this.formTM7.frameNumberList[
          structuralMemberTitleIndex
        ].measurementTM7List[structuralMemberIndex].upperPart.percent =
          param.value;
      }
    });
  }

  onSaveForm() {
    this.isLoadingSaveButton = true;

    var newFormTM7 = JSON.parse(JSON.stringify(this.formTM7));

    for (let i = 0; i < this.formTM7.frameNumberList.length; i++) {
      newFormTM7.structuralMemberTM6List[i].measurementTM4List =
        this.formTM7.frameNumberList[i].measurementTM7List.filter((e) => {
          return (
            e.name !== '' ||
            e.upperPart.originalThickness !== '' ||
            e.upperPart.gaugedP !== '' ||
            e.upperPart.gaugedS !== '' ||
            e.midPart.originalThickness !== '' ||
            e.midPart.gaugedP !== '' ||
            e.midPart.gaugedS !== '' ||
            e.lowerPart.originalThickness !== '' ||
            e.lowerPart.gaugedP !== '' ||
            e.lowerPart.gaugedS !== ''
          );
        });
    }

    this.formService
      .addFormToAPI(this.API_URL, newFormTM7)
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

  selectRow(structuralMemberTitleIndex: number, structuralMemberIndex: number) {
    this.selectedRowValue =
      this.formTM7.frameNumberList[
        structuralMemberTitleIndex
      ].measurementTM7List[structuralMemberIndex];
  }

  onDrop(event: CdkDragDrop<measurementTM7[]>, index: number) {
    this.startIndex = event.previousIndex;
    this.endIndex = event.currentIndex;
    if (this.startIndex < this.endIndex) {
      for (let i = this.startIndex + 1; i <= this.endIndex; i++) {
        this.formTM7.frameNumberList[index].measurementTM7List[i].name =
          this.selectedRowValue.name;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].upperPart.originalThickness =
          this.selectedRowValue.upperPart.originalThickness;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].upperPart.gaugedP = this.selectedRowValue.upperPart.gaugedP;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].upperPart.gaugedS = this.selectedRowValue.upperPart.gaugedS;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].upperPart.percent = this.selectedRowValue.upperPart.percent;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].midPart.originalThickness =
          this.selectedRowValue.midPart.originalThickness;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].midPart.gaugedP = this.selectedRowValue.midPart.gaugedP;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].midPart.gaugedS = this.selectedRowValue.midPart.gaugedS;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].midPart.percent = this.selectedRowValue.midPart.percent;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].lowerPart.originalThickness =
          this.selectedRowValue.lowerPart.originalThickness;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].lowerPart.gaugedP = this.selectedRowValue.lowerPart.gaugedP;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].lowerPart.gaugedS = this.selectedRowValue.lowerPart.gaugedS;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].lowerPart.percent = this.selectedRowValue.lowerPart.percent;
      }
    } else {
      for (let i = this.startIndex - 1; i >= this.endIndex; i--) {
        this.formTM7.frameNumberList[index].measurementTM7List[i].name =
          this.selectedRowValue.name;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].upperPart.originalThickness =
          this.selectedRowValue.upperPart.originalThickness;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].upperPart.gaugedP = this.selectedRowValue.upperPart.gaugedP;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].upperPart.gaugedS = this.selectedRowValue.upperPart.gaugedS;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].upperPart.percent = this.selectedRowValue.upperPart.percent;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].midPart.originalThickness =
          this.selectedRowValue.midPart.originalThickness;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].midPart.gaugedP = this.selectedRowValue.midPart.gaugedP;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].midPart.gaugedS = this.selectedRowValue.midPart.gaugedS;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].midPart.percent = this.selectedRowValue.midPart.percent;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].lowerPart.originalThickness =
          this.selectedRowValue.lowerPart.originalThickness;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].lowerPart.gaugedP = this.selectedRowValue.lowerPart.gaugedP;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].lowerPart.gaugedS = this.selectedRowValue.lowerPart.gaugedS;
        this.formTM7.frameNumberList[index].measurementTM7List[
          i
        ].lowerPart.percent = this.selectedRowValue.lowerPart.percent;
      }
    }
  }

  countRowBefore(index: number): number {
    var sum: number = 0;
    for (let i = 0; i < index; i++)
      sum += this.listFrameNumber[i].measurementTM7List.length + 1;
    return sum;
  }
}
