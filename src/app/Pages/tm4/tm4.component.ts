import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, retry, throwError } from 'rxjs';
import { formTM4 } from 'src/app/share/models/form/formTM4.model';
import { measurementTM4 } from 'src/app/share/models/form/measurementTM4.model';
import { structuralMemberTM4 } from 'src/app/share/models/form/structuralMemberTM4.model';
import { paramValue } from 'src/app/share/models/paramValue.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tm4',
  templateUrl: './tm4.component.html',
  styleUrls: ['./tm4.component.css'],
})
export class Tm4Component implements OnInit {
  constructor(
    public formService: FormService,
    public paramValueService: ParamValueService,
    private message: NzMessageService
  ) {}

  addRowValue: number = 0;
  listRow: measurementTM4[] = [];

  listStructuralMember: paramValue[] = [];
  listStructuralMemberTitle: structuralMemberTM4[] = [];

  formTM4: formTM4 = {
    tankDescription: '',
    locationOfStructure: '',
    structuralMemberTM4List: this.listStructuralMemberTitle,
  };

  isPercentVisible: boolean = false;
  percentSelected: number = 1;
  structuralMemberSelected: number = -2;

  selectedRowValue: measurementTM4 = {
    structuralMember: '',
    item: '',
    detailMeasurement: {
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
    this.listStructuralMemberTitle.push({
      structuralMemberTitle: '',
      measurementTM4List: this.listRow,
    });

    for (let i = 1; i <= 20; i++)
      this.listRow.push({
        structuralMember: '',
        item: '',
        detailMeasurement: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
          percent: '',
        },
      });

    this.paramValueService.getParamValueByType(7).subscribe((data) => {
      this.listStructuralMember = data;
    });
  }

  API_URL: string = `http://222.252.25.37:9080/api/v1/report-indexes/1/tm4s`;

  addRow() {
    if (this.structuralMemberSelected >= 0) {
      for (let i = 1; i <= this.addRowValue; i++)
        this.listStructuralMemberTitle[
          this.structuralMemberSelected
        ].measurementTM4List.push({
          structuralMember: '',
          item: '',
          detailMeasurement: {
            originalThickness: '',
            maxAlwbDim: '',
            gaugedP: '',
            gaugedS: '',
            percent: '',
          },
        });
    } else if (this.structuralMemberSelected == -1) {
      this.listStructuralMemberTitle.push({
        structuralMemberTitle: 'New list',
        measurementTM4List: [],
      });

      for (let i = 1; i <= this.addRowValue; i++)
        this.listStructuralMemberTitle[
          this.listStructuralMemberTitle.length - 1
        ].measurementTM4List.push({
          structuralMember: '',
          item: '',
          detailMeasurement: {
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
    this.formTM4.structuralMemberTM4List.map((form) => {
      form.measurementTM4List
        .filter((row) => row.structuralMember === param)
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
        this.formTM4.structuralMemberTM4List[
          structuralMemberTitleIndex
        ].measurementTM4List[structuralMemberIndex].detailMeasurement.percent =
          param.value;
      }
    });
  }

  onSaveForm() {
    this.isLoadingSaveButton = true;

    var newFormTM4 = JSON.parse(JSON.stringify(this.formTM4));

    for (let i = 0; i < this.formTM4.structuralMemberTM4List.length; i++) {
      newFormTM4.structuralMemberTM4List[i].measurementTM4List =
        this.formTM4.structuralMemberTM4List[i].measurementTM4List.filter(
          (e) => {
            return (
              e.structuralMember !== '' ||
              e.item !== '' ||
              e.detailMeasurement.originalThickness !== '' ||
              e.detailMeasurement.gaugedP !== '' ||
              e.detailMeasurement.gaugedS !== ''
            );
          }
        );
    }

    this.formService
      .addFormToAPI(this.API_URL, newFormTM4)
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
      this.formTM4.structuralMemberTM4List[
        structuralMemberTitleIndex
      ].measurementTM4List[structuralMemberIndex];
  }

  onDrop(event: CdkDragDrop<measurementTM4[]>, index: number) {
    this.startIndex = event.previousIndex;
    this.endIndex = event.currentIndex;
    if (this.startIndex < this.endIndex) {
      for (let i = this.startIndex + 1; i <= this.endIndex; i++) {
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[
          i
        ].structuralMember = this.selectedRowValue.structuralMember;
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[i].item =
          this.selectedRowValue.item;
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[
          i
        ].detailMeasurement.originalThickness =
          this.selectedRowValue.detailMeasurement.originalThickness;
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[
          i
        ].detailMeasurement.gaugedP =
          this.selectedRowValue.detailMeasurement.gaugedP;
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[
          i
        ].detailMeasurement.gaugedS =
          this.selectedRowValue.detailMeasurement.gaugedS;
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[
          i
        ].detailMeasurement.percent =
          this.selectedRowValue.detailMeasurement.percent;
      }
    } else {
      for (let i = this.startIndex - 1; i >= this.endIndex; i--) {
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[
          i
        ].structuralMember = this.selectedRowValue.structuralMember;
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[i].item =
          this.selectedRowValue.item;
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[
          i
        ].detailMeasurement.originalThickness =
          this.selectedRowValue.detailMeasurement.originalThickness;
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[
          i
        ].detailMeasurement.gaugedP =
          this.selectedRowValue.detailMeasurement.gaugedP;
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[
          i
        ].detailMeasurement.gaugedS =
          this.selectedRowValue.detailMeasurement.gaugedS;
        this.formTM4.structuralMemberTM4List[index].measurementTM4List[
          i
        ].detailMeasurement.percent =
          this.selectedRowValue.detailMeasurement.percent;
      }
    }
  }

  countRowBefore(index: number): number {
    var sum: number = 0;
    for (let i = 0; i < index; i++)
      sum += this.listStructuralMemberTitle[i].measurementTM4List.length + 1;
    return sum;
  }
}
