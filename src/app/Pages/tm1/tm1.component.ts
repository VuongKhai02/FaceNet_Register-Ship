import { Component, OnInit } from '@angular/core';
import { formTM1 } from 'src/app/share/models/form/formTM1.model';
import { measurementTM1 } from 'src/app/share/models/form/measurementTM1.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { CdkDragEnd, CdkDragMove, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tm1',
  templateUrl: './tm1.component.html',
  styleUrls: ['./tm1.component.css'],
})
export class Tm1Component implements OnInit {
  constructor(public formService: FormService) {}

  addRowValue: number = 1;
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

  positionY: number = 0;

  selectedRow: number = -1;
  selectedRowValue: measurementTM1 = {
    platePosition: '',
    noOrLetter: '',
    forwardReadingMeasurementDetail: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
    },
    afterReadingMeasurementDetail: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
    },
  };

  startIndex: number = -1;
  endIndex: number = -1;

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
        },
        afterReadingMeasurementDetail: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
        },
      });
  }

  addRow() {
    for (let i = 1; i <= this.addRowValue; i++)
      this.listRow.push({
        platePosition: '',
        noOrLetter: '',
        forwardReadingMeasurementDetail: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
        },
        afterReadingMeasurementDetail: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
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
    this.formService
      .addFormToAPI(this.API_URL, this.formTM1)
      .subscribe((data) => {
        console.log(data);
      });
  }

  onChangePopoverPercent(value: boolean): void {}

  onDragEnded(event: CdkDragEnd) {
    event.source.reset();
  }

  onItemMoved(event: CdkDragMove) {
    this.positionY =
      event.pointerPosition.y -
      event.source.element.nativeElement.getBoundingClientRect().top;
  }

  selectRow(index: number) {
    this.selectedRow = index;
    this.selectedRowValue = this.listRow[index];
    console.log(index);

    console.log(this.listRow[index]);
  }

  onItemDrop(event: boolean) {}

  onDrop(event: CdkDragDrop<measurementTM1[]>) {
    this.startIndex = event.previousIndex;
    this.endIndex = event.currentIndex;
    if (this.startIndex < this.endIndex) {
      for (let i = this.startIndex + 1; i <= this.endIndex; i++) {
        this.listRow[i].platePosition = this.selectedRowValue.platePosition;
        this.listRow[i].noOrLetter = this.selectedRowValue.noOrLetter;
        this.listRow[i].forwardReadingMeasurementDetail.originalThickness =
          this.selectedRowValue.forwardReadingMeasurementDetail.originalThickness;
        this.listRow[i].forwardReadingMeasurementDetail.maxAlwbDim =
          this.selectedRowValue.forwardReadingMeasurementDetail.maxAlwbDim;
        this.listRow[i].forwardReadingMeasurementDetail.gaugedP =
          this.selectedRowValue.forwardReadingMeasurementDetail.gaugedP;
        this.listRow[i].forwardReadingMeasurementDetail.gaugedS =
          this.selectedRowValue.forwardReadingMeasurementDetail.gaugedS;
        this.listRow[i].afterReadingMeasurementDetail.originalThickness =
          this.selectedRowValue.afterReadingMeasurementDetail.originalThickness;
        this.listRow[i].afterReadingMeasurementDetail.maxAlwbDim =
          this.selectedRowValue.afterReadingMeasurementDetail.maxAlwbDim;
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
        this.listRow[i].forwardReadingMeasurementDetail.maxAlwbDim =
          this.selectedRowValue.forwardReadingMeasurementDetail.maxAlwbDim;
        this.listRow[i].forwardReadingMeasurementDetail.gaugedP =
          this.selectedRowValue.forwardReadingMeasurementDetail.gaugedP;
        this.listRow[i].forwardReadingMeasurementDetail.gaugedS =
          this.selectedRowValue.forwardReadingMeasurementDetail.gaugedS;
        this.listRow[i].afterReadingMeasurementDetail.originalThickness =
          this.selectedRowValue.afterReadingMeasurementDetail.originalThickness;
        this.listRow[i].afterReadingMeasurementDetail.maxAlwbDim =
          this.selectedRowValue.afterReadingMeasurementDetail.maxAlwbDim;
        this.listRow[i].afterReadingMeasurementDetail.gaugedP =
          this.selectedRowValue.afterReadingMeasurementDetail.gaugedP;
        this.listRow[i].afterReadingMeasurementDetail.gaugedS =
          this.selectedRowValue.afterReadingMeasurementDetail.gaugedS;
      }
    }
  }
}
