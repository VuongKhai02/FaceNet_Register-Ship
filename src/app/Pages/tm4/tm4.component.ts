import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterTestingHarness } from '@angular/router/testing';

interface ItemData {
  id: number;
  structuralMember: string;
  item: string;
  originalThickness: number;
  maximumAllowableDim: number;
  gaugedP: number;
  gaugedS: number;
}

@Component({
  selector: 'app-tm4',
  templateUrl: './tm4.component.html',
  styleUrls: ['./tm4.component.css'],
})
export class Tm4Component implements OnInit {
  shipName: string = 'M/V "AFRICAN EAGLE"';
  classIdentity: number = 3112356;
  reportNo: string = 'VMC.UTM.22.046/5255939';
  tankDesc: string = 'NO.1 T.S.T';
  locationOfStructure: string = 'TRANSVERSE WEB';

  lineAdd: number = 0;

  maximumAllowableDim: number = 0;
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [
    {
      id: 1,
      structuralMember: 'Web Plating',
      item: '1',
      originalThickness: 11.5,
      maximumAllowableDim: 2.9,
      gaugedP: 11.4,
      gaugedS: 11.3,
    },
    {
      id: 2,
      structuralMember: 'Longi Bulkhead',
      item: '2',
      originalThickness: 17.5,
      maximumAllowableDim: 2.9,
      gaugedP: 11.4,
      gaugedS: 11.3,
    },
  ];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    let maxId = 0;
    for (let j = 1; j <= this.lineAdd; j++) {
      maxId = Math.max(...this.listOfData.map((x) => x.id));
      this.listOfData.push({
        id: maxId + 1,
        structuralMember: '',
        item: '',
        originalThickness: 0,
        maximumAllowableDim: 0,
        gaugedP: 0,
        gaugedS: 0,
      });
    }
    this.lineAdd = 0;
    this.listOfData = [...this.listOfData];
    this.i++;
  }

  deleteRow(id: number): void {
    this.listOfData = this.listOfData.filter((d) => d.id !== id);
  }

  ngOnInit(): void {
    this.addRow();
  }
}
