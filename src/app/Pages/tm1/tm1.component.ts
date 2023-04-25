import { Component, OnInit } from '@angular/core';
import { formTM1 } from 'src/app/share/models/form/formTM1.model';
import { measurementTM1 } from 'src/app/share/models/form/measurementTM1.model';
import { FormService } from 'src/app/share/services/form/form.service';

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

  convertToNumber(str: string): number {
    return Number(str);
  }

  parseInt(str: number) {
    return Number.parseInt(String(str));
  }

  parseFloat(str: number) {
    return Number.parseFloat(String(str));
  }

  onChangePopoverPercent(value: boolean): void {}
}
