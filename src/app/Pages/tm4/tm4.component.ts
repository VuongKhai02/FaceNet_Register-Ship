import { Component, OnInit } from '@angular/core';
import { formTM4 } from 'src/app/share/models/form/formTM4.model';
import { measurementTM4 } from 'src/app/share/models/form/measurementTM4.model';
import { structuralMemberTM4 } from 'src/app/share/models/form/structuralMemberTM4.model';
import { FormService } from 'src/app/share/services/form/form.service';

@Component({
  selector: 'app-tm4',
  templateUrl: './tm4.component.html',
  styleUrls: ['./tm4.component.css'],
})
export class Tm4Component implements OnInit {
  constructor(public formService: FormService) {}

  addRowValue: number = 0;
  listRow: measurementTM4[] = [];

  listStructuralMember: structuralMemberTM4[] = [];

  formTM4: formTM4 = {
    tankDescription: '',
    locationOfStructure: '',
    structuralMemberTM4List: this.listStructuralMember,
  };

  isVisible: boolean = false;
  isLoading: boolean = false;
  percentSelected: number = 1;
  structuralMemberSelected: number = -1;

  ngOnInit(): void {
    this.addRowList();
    for (let i = 1; i <= 20; i++)
      this.listRow.push({
        structuralMember: '',
        item: '',
        detailMeasurement: {
          originalThickness: '',
          maxAlwbDim: '',
          gaugedP: '',
          gaugedS: '',
        },
      });
  }

  API_URL: string = `http://222.252.25.37:9080/api/v1/report-indexes/1/tm4s`;

  addRow() {
    if (this.structuralMemberSelected >= 0) {
      for (let i = 1; i <= this.addRowValue; i++)
        this.listStructuralMember[
          this.structuralMemberSelected
        ].measurementTM4List.push({
          structuralMember: '',
          item: '',
          detailMeasurement: {
            originalThickness: '',
            maxAlwbDim: '',
            gaugedP: '',
            gaugedS: '',
          },
        });
    }
  }

  chooseStructuralMember(index: number): void {
    this.structuralMemberSelected = index;
  }

  addRowList() {
    this.listStructuralMember.push({
      structuralMemberTitle: '',
      measurementTM4List: this.listRow,
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

  handleIndex(list: string): number {
    return 0;
  }
}
