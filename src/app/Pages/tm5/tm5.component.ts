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
  isStandardP: boolean;
  isStandardS: boolean;
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
  i = 0;
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
      isStandardP: true,
      isStandardS: true,
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
      isStandardP: true,
      isStandardS: true,
    },
  ];
  calMAD(id: number) {
    let data = this.listOfData.find((item) => item.id == id);
    if (data) {
      data.maximumAllowableDim =
        Math.round(data.originalThickness * 0.25 * 10) / 10;
    }
  }
  calDimP(id: number) {
    let data = this.listOfData.find((item) => item.id == id);
    if (data) {
      data.diminutionPmm =
        Math.round((data.originalThickness - data.gaugedP) * 10) / 10;
      data.diminutionPpercent =
        Math.floor((data.diminutionPmm / data.originalThickness) * 100 * 10) /
        10;
      if (data.diminutionPpercent > 0.5) {
        data.isStandardP = false;
      } else {
        data.isStandardP = true;
      }
    }
  }
  calDimS(id: number) {
    let data = this.listOfData.find((item) => item.id == id);
    if (data) {
      data.diminutionSmm =
        Math.round((data.originalThickness - data.gaugedS) * 10) / 10;
      data.diminutionSpercent =
        Math.floor((data.diminutionSmm / data.originalThickness) * 100 * 10) /
        10;
      if (data.diminutionSpercent > 0.5) {
        data.isStandardS = false;
      } else {
        data.isStandardS = true;
      }
    }
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
        isStandardP: true,
        isStandardS: true,
      });
    }
    this.lineAdd = 0;
    this.listOfData = [...this.listOfData];
    this.i++;
  }

  visible: boolean = false;

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }
  ngOnInit(): void {
    this.addRow();
  }
}
