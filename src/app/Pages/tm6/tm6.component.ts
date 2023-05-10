import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, retry, throwError } from 'rxjs';
import { formTM6 } from 'src/app/share/models/form/formTM6.model';
import { measurementTM6 } from 'src/app/share/models/form/measurementTM6.model';
import { structuralDescriptionTM6 } from 'src/app/share/models/form/structuralDescriptionTM6.model';
import { ParamValue } from 'src/app/share/models/paramValue.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tm6',
  templateUrl: './tm6.component.html',
  styleUrls: ['./tm6.component.css'],
})
export class Tm6Component implements OnInit {
  constructor(
    public formService: FormService,
    public paramValueService: ParamValueService,
    private message: NzMessageService
  ) {}

  addRowValue: number = 0;
  listRow: measurementTM6[] = [];

  listStructuralMember: ParamValue[] = [];
  listStructuralDescription: structuralDescriptionTM6[] = [];

  formTM6: formTM6 = {
    structuralMembers: '',
    locationOfStructure: '',
    structuralDescriptionTM6List: this.listStructuralDescription,
  };

  isPercentVisible: boolean = false;
  percentSelected: number = 1;
  structuralMemberSelected: number = -1;

  API_URL: string = `http://222.252.25.37:9080/api/v1/report-indexes/1/tm6s`;

  selectedRowValue: measurementTM6 = {
    description: '',
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
    this.addRowList();
    for (let i = 1; i <= 20; i++)
      this.listRow.push({
        description: '',
        item: '',
        detailMeasurement: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
          percent: '',
        },
      });

    this.paramValueService.getParamValueByType(9).subscribe((data) => {
      this.listStructuralMember = data;
    });
  }

  addRow() {
    if (this.structuralMemberSelected >= 0) {
      for (let i = 1; i <= this.addRowValue; i++)
        this.listStructuralDescription[
          this.structuralMemberSelected
        ].measurementTM6List.push({
          description: '',
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
      this.listStructuralDescription.push({
        structuralDescriptionTitle: 'New list',
        measurementTM6List: [],
      });

      for (let i = 1; i <= this.addRowValue; i++)
        this.listStructuralDescription[
          this.listStructuralDescription.length - 1
        ].measurementTM6List.push({
          description: '',
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

  addRowList() {
    this.listStructuralDescription.push({
      structuralDescriptionTitle: '',
      measurementTM6List: this.listRow,
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
    this.formTM6.structuralDescriptionTM6List.map((form) => {
      form.measurementTM6List
        .filter((row) => row.description === param)
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
        this.formTM6.structuralDescriptionTM6List[
          structuralMemberTitleIndex
        ].measurementTM6List[structuralMemberIndex].detailMeasurement.percent =
          param.value;
      }
    });
  }

  onSaveForm() {
    this.isLoadingSaveButton = true;

    var newFormTM6 = JSON.parse(JSON.stringify(this.formTM6));

    for (let i = 0; i < this.formTM6.structuralDescriptionTM6List.length; i++) {
      newFormTM6.structuralDescriptionTM6List[i].measurementTM4List =
        this.formTM6.structuralDescriptionTM6List[i].measurementTM6List.filter(
          (e) => {
            return (
              e.description !== '' ||
              e.item !== '' ||
              e.detailMeasurement.originalThickness !== '' ||
              e.detailMeasurement.gaugedP !== '' ||
              e.detailMeasurement.gaugedS !== ''
            );
          }
        );
    }

    this.formService
      .addFormToAPI(this.API_URL, newFormTM6)
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
      this.formTM6.structuralDescriptionTM6List[
        structuralMemberTitleIndex
      ].measurementTM6List[structuralMemberIndex];
  }

  onDrop(event: CdkDragDrop<measurementTM6[]>, index: number) {
    this.startIndex = event.previousIndex;
    this.endIndex = event.currentIndex;
    if (this.startIndex < this.endIndex) {
      for (let i = this.startIndex + 1; i <= this.endIndex; i++) {
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].description = this.selectedRowValue.description;
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].item = this.selectedRowValue.item;
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].detailMeasurement.originalThickness =
          this.selectedRowValue.detailMeasurement.originalThickness;
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].detailMeasurement.gaugedP =
          this.selectedRowValue.detailMeasurement.gaugedP;
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].detailMeasurement.gaugedS =
          this.selectedRowValue.detailMeasurement.gaugedS;
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].detailMeasurement.percent =
          this.selectedRowValue.detailMeasurement.percent;
      }
    } else {
      for (let i = this.startIndex - 1; i >= this.endIndex; i--) {
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].description = this.selectedRowValue.description;
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].item = this.selectedRowValue.item;
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].detailMeasurement.originalThickness =
          this.selectedRowValue.detailMeasurement.originalThickness;
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].detailMeasurement.gaugedP =
          this.selectedRowValue.detailMeasurement.gaugedP;
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].detailMeasurement.gaugedS =
          this.selectedRowValue.detailMeasurement.gaugedS;
        this.formTM6.structuralDescriptionTM6List[index].measurementTM6List[
          i
        ].detailMeasurement.percent =
          this.selectedRowValue.detailMeasurement.percent;
      }
    }
  }

  countRowBefore(index: number): number {
    var sum: number = 0;
    for (let i = 0; i < index; i++)
      sum += this.listStructuralDescription[i].measurementTM6List.length + 1;
    return sum;
  }
}
