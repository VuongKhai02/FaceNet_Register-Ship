import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, retry, throwError } from 'rxjs';
import { formTM5 } from 'src/app/share/models/form/formTM5.model';
import { measurementTM5 } from 'src/app/share/models/form/measurementTM5.model';
import { paramValue } from 'src/app/share/models/paramValue.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tm5',
  templateUrl: './tm5.component.html',
  styleUrls: ['./tm5.component.css'],
})
export class Tm5Component implements OnInit {
  constructor(
    public formService: FormService,
    public paramValueService: ParamValueService,
    private message: NzMessageService
  ) {}

  shipName: string = 'M/V "AFRICAN EAGLE"';
  classIdentity: number = 3112356;
  reportNo: string = 'VMC.UTM.22.046/5255939';

  addRowValue: number = 0;

  listRow: measurementTM5[] = [];

  formTM5: formTM5 = {
    description: '',
    name: '',
    locationOfStructure: '',
    tankHolDescription: '',
    frameNo: '',
    measurementTM5List: [
      {
        structuralComponentType: '',
        structuralComponent: '',
        measurementDetail: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
          percent: '',
        },
      },
    ],
  };

  isPercentVisible: boolean = false;

  isAddRowVisible: boolean = false;

  percentSelected: number = 1;

  API_URL: string = `http://222.252.25.37:9080/api/v1/report-indexes/1/tm5s`;

  listStructuralMember: paramValue[] = [];

  selectedRowValue: measurementTM5 = {
    structuralComponentType: '',
    structuralComponent: '',
    measurementDetail: {
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
        structuralComponentType: '',
        structuralComponent: '',
        measurementDetail: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
          percent: '',
        },
      });

    this.paramValueService.getParamValueByType(8).subscribe((data) => {
      this.listStructuralMember = data;
    });
  }

  addRow() {
    for (let i = 1; i <= this.addRowValue; i++)
      this.listRow.push({
        structuralComponentType: '',
        structuralComponent: '',
        measurementDetail: {
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
      .filter((row) => row.structuralComponent === param)
      .map((row) => {
        row.measurementDetail.percent = percent;
      });
  }

  onSelected(value: string, index: number): void {
    this.listStructuralMember.map((param) => {
      if (param.param === value) {
        this.listRow[index].measurementDetail.percent = param.value;
      }
    });
  }

  onSaveForm() {
    this.isLoadingSaveButton = true;
    this.formTM5.measurementTM5List.filter(
      (form) =>
        form.structuralComponentType !== '' ||
        form.structuralComponent !== '' ||
        form.measurementDetail.originalThickness !== '' ||
        form.measurementDetail.gaugedP !== '' ||
        form.measurementDetail.gaugedS !== ''
    );

    this.formService
      .addFormToAPI(this.API_URL, this.formTM5)
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

  onDrop(event: CdkDragDrop<measurementTM5[]>) {
    this.startIndex = event.previousIndex;
    this.endIndex = event.currentIndex;
    if (this.startIndex < this.endIndex) {
      for (let i = this.startIndex + 1; i <= this.endIndex; i++) {
        this.listRow[i].structuralComponent =
          this.selectedRowValue.structuralComponent;
        this.listRow[i].structuralComponentType =
          this.selectedRowValue.structuralComponentType;
        this.listRow[i].measurementDetail.originalThickness =
          this.selectedRowValue.measurementDetail.originalThickness;
        this.listRow[i].measurementDetail.gaugedP =
          this.selectedRowValue.measurementDetail.gaugedP;
        this.listRow[i].measurementDetail.gaugedS =
          this.selectedRowValue.measurementDetail.gaugedS;
        this.listRow[i].measurementDetail.percent =
          this.selectedRowValue.measurementDetail.percent;
      }
    } else {
      for (let i = this.startIndex - 1; i >= this.endIndex; i--) {
        this.listRow[i].structuralComponent =
          this.selectedRowValue.structuralComponent;
        this.listRow[i].structuralComponentType =
          this.selectedRowValue.structuralComponentType;
        this.listRow[i].measurementDetail.originalThickness =
          this.selectedRowValue.measurementDetail.originalThickness;
        this.listRow[i].measurementDetail.gaugedP =
          this.selectedRowValue.measurementDetail.gaugedP;
        this.listRow[i].measurementDetail.gaugedS =
          this.selectedRowValue.measurementDetail.gaugedS;
        this.listRow[i].measurementDetail.percent =
          this.selectedRowValue.measurementDetail.percent;
      }
    }
  }
}
