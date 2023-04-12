import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterTestingHarness } from '@angular/router/testing';

interface ItemData {
  id: number;
  structuralComponent: string;
  item: number;
  originalThickness: number;
  maximumAllowableDim: number;
  gaugedP: number;
  gaugedS: number;
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
  editId: string | null = null;
  listOfData: ItemData[] = [
    {
      id: 1,
      structuralComponent: 'Plating',
      item: 1,
      originalThickness: 11.5,
      maximumAllowableDim: 2.9,
      gaugedP: 11.4,
      gaugedS: 11.3,
    },
    {
      id: 2,
      structuralComponent: 'Deck Girder - Web',
      item: 2,
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
    // this.listOfData = [
    //   ...this.listOfData,
    //   {
    //     id: `${this.i}`,
    //     name: ``,
    //     age: '',
    //     address: ``,
    //   },
    // ];

    this.listOfData.push({
      id: 0,
      structuralComponent: '',
      item: 0,
      originalThickness: 0,
      maximumAllowableDim: 0,
      gaugedP: 0,
      gaugedS: 0,
    });
    console.log(this.listOfData);
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
// tm4From: FormGroup = new FormGroup({
//   structuralMember: new FormControl(),
//   item: new FormControl(),
//   originalThickness: new FormControl(),
//   maximumAllowableDim: new FormControl(),

//   gauged: new FormGroup({
//     p: new FormControl(),
//     s: new FormControl(),
//   }),
// });
