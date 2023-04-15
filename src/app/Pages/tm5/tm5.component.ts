import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterTestingHarness } from '@angular/router/testing';

interface ItemData {
  id: number;
  structuralComponent: string;
  item: string;
  originalThickness: number;
  maximumAllowableDim: number;
  gaugedP: number;
  gaugedS: number;
  diminutionPmm: number;
  diminutionPpercent: number;
  diminutionSmm: number;
  diminutionSpercent: number;
  isStandardP: string;
  isStandardS: string;
}
@Component({
  selector: 'app-tm5',
  templateUrl: './tm5.component.html',
  styleUrls: ['./tm5.component.css'],
})
export class Tm5Component implements OnInit {
  shipName: string = 'M/V "AFRICAN EAGLE"';
  classIdentity: number = 3112356;
  reportNo: string = 'VMC.UTM.22.046/5255939';
  tankHoldDescription: string = 'NO.5 CARCO HOLD';
  locationOfStructure: string = 'TRANSVERSE BULKHEAD';
  frameNo: number = 35;

  lineAdd: number = 0;
  b: number = 0;
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [
    {
      id: 1,
      structuralComponent: 'Plating',
      item: '1',
      originalThickness: 11.5,
      maximumAllowableDim: 0,
      gaugedP: 11.4,
      gaugedS: 11.3,
      diminutionPmm: 0,
      diminutionPpercent: 0,
      diminutionSmm: 0,
      diminutionSpercent: 0,
      isStandardP: '',
      isStandardS: '',
    },
    {
      id: 2,
      structuralComponent: 'Deck Girder - Web',
      item: '2',
      originalThickness: 11.5,
      maximumAllowableDim: 0,
      gaugedP: 11.4,
      gaugedS: 11.3,
      diminutionPmm: 0,
      diminutionPpercent: 0,
      diminutionSmm: 0,
      diminutionSpercent: 0,
      isStandardP: '',
      isStandardS: '',
    },
  ];
  calculateMaximumAllowDimAuto(id: number) {
    let data = this.listOfData.find((item) => item.id == id);
    if (data) {
      data.maximumAllowableDim = data.originalThickness * 0.25;
    }
    console.log(data);
  }

  calculateDiminutionPmm(id: number) {
    let data = this.listOfData.find((item) => item.id == id);
    if (data) {
      data.diminutionPmm = data.originalThickness - data.gaugedP;
    }
  }
  calculateDiminutionPpercent(id: number) {
    let data = this.listOfData.find((item) => item.id == id);
    if (data) {
      data.diminutionPpercent =
        (data.diminutionPmm / data.originalThickness) * 100;
    }
  }
  calculateDiminutionSmm(id: number) {
    let data = this.listOfData.find((item) => item.id == id);
    if (data) {
      data.diminutionSmm = data.originalThickness - data.gaugedS;
    }
  }
  calculateDiminutionSpercent(id: number) {
    let data = this.listOfData.find((item) => item.id == id);
    if (data) {
      data.diminutionSpercent =
        (data.diminutionSmm / data.originalThickness) * 100;
    }
  }
  calculateStandard(id: number) {
    // let data = this.listOfData.find((item) => item.id == id);
    // if (data) {
    //   if (data.diminutionPpercent > 0.5) {
    //     data.isStandardP = 'S';
    //   }
    // }
  }

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
        structuralComponent: '',
        item: '',
        originalThickness: 0,
        maximumAllowableDim: 0,
        gaugedP: 0,
        gaugedS: 0,
        diminutionPmm: 0,
        diminutionPpercent: 0,
        diminutionSmm: 0,
        diminutionSpercent: 0,
        isStandardP: '',
        isStandardS: '',
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
