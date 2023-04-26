import { Component } from '@angular/core';
import { formTM3 } from 'src/app/share/models/form/formTM3.model';
import { measurementTM3 } from 'src/app/share/models/form/measurementTM3.model';
import { FormService } from 'src/app/share/services/form/form.service';

@Component({
  selector: 'app-tm3',
  templateUrl: './tm3.component.html',
  styleUrls: ['./tm3.component.css'],
})
export class Tm3Component {
  constructor(public formService: FormService) {}

  addRowValue: number = 0;
  listRow: measurementTM3[] = [];

  formTM3: formTM3 = {
    firstFrameNo: 'string',
    secondFrameNo: 'string',
    thirdFrameNo: 'string',
    measurementTM3List: this.listRow,
  };

  isVisible: boolean = false;
  isLoading: boolean = false;

  percentSelected: number = 1;

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
        },
        secondTransverseSectionMeasurementDetail: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
        },
        thirdTransverseSectionMeasurementDetail: {
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
        structuralMember: '',
        noOrLetter: '',
        firstTransverseSectionMeasurementDetail: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
        },
        secondTransverseSectionMeasurementDetail: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
        },
        thirdTransverseSectionMeasurementDetail: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
        },
      });
  }

  showModalPercentManage() {
    this.isVisible = true;
  }

  onCancelModal() {
    this.isVisible = false;
  }

  onOkModal() {
    this.isLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isLoading = false;
    }, 3000);
  }

  convertToNumber(str: string): number {
    return Number(str);
  }

  onChangePopoverPercent(value: boolean) {}
}
