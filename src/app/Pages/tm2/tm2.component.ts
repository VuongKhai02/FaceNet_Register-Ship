import { Component } from '@angular/core';
import { formTM2 } from 'src/app/share/models/formTM2.model';
import { measurementTM2 } from 'src/app/share/models/measurementTM2.model';
import { FormService } from 'src/app/share/services/form/form.service';

@Component({
  selector: 'app-tm2',
  templateUrl: './tm2.component.html',
  styleUrls: ['./tm2.component.css'],
})
export class Tm2Component {
  constructor(public formService: FormService) {}

  addRowValue: number = 1;
  listRow: measurementTM2[] = [];
  formTM2: formTM2 = {
    name: '',
    firstFrameNoTM2: '',
    secondFrameNoTM2: '',
    thirdFrameNoTM2: '',
    measurementTM2List: this.listRow,
  };

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
        },
        secondTransverseSectionMeasurementDetailTM2: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
        },
        thirdTransverseSectionMeasurementDetailTM2: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
        },
      });
  }
  listPercentOption = [
    { label: '20%', value: 1 },
    { label: '20% + 1', value: 2 },
    { label: '25%', value: 3 },
    { label: '30%', value: 4 },
  ];

  percentSelected: number = 0;

  visible: boolean = false;

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
        },
        secondTransverseSectionMeasurementDetailTM2: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
        },
        thirdTransverseSectionMeasurementDetailTM2: {
          originalThickness: '',
          maxAlwbDim: '',
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
