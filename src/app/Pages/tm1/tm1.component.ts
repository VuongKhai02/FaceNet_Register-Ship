import { Component, OnInit } from '@angular/core';
import { formTM1 } from 'src/app/share/models/formTM1.model';
import { measurementTM1 } from 'src/app/share/models/measurementTM1.model';

@Component({
  selector: 'app-tm1',
  templateUrl: './tm1.component.html',
  styleUrls: ['./tm1.component.css'],
})
export class Tm1Component implements OnInit {
  addRowValue: number = 1;
  listRow: measurementTM1[] = [];
  formTM1: formTM1 = {
    strakePosition: '',
    measurementTM1List: this.listRow,
  };
  measurementTM1: measurementTM1 = {
    platePosition: '',
    noOrLetter: '',
    forwardReadingMeasurementDetail: {
      originalThickness: '',
      gaugedP: '',
      gaugedS: '',
    },
    afterReadingMeasurementDetail: {
      originalThickness: '',
      gaugedP: '',
      gaugedS: '',
    },
  };
  listPercentName: string[] = ['a', 'b', 'c'];

  visible: boolean = false;

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++)
      this.listRow.push({
        platePosition: '',
        noOrLetter: '',
        forwardReadingMeasurementDetail: {
          originalThickness: '',
          gaugedP: '',
          gaugedS: '',
        },
        afterReadingMeasurementDetail: {
          originalThickness: '',
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
          gaugedP: '',
          gaugedS: '',
        },
        afterReadingMeasurementDetail: {
          originalThickness: '',
          gaugedP: '',
          gaugedS: '',
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

  closePopoverPercent(): void {
    this.visible = false;
  }

  savePopoverPercent(): void {}

  onChangePopoverPercent(value: boolean): void {}
}
