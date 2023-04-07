import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: string;
  platePosition: string;
  noOrLetter: string;
  originalThickness: string;
  forwardReadingP: number;
  forwardReadingS: number;
  afterReadingP: number;
  afterReadingS: number;
  meanDiminutionP: number;
  meanDiminutionS: number;
}

@Component({
  selector: 'app-tm1',
  templateUrl: './tm1.component.html',
  styleUrls: ['./tm1.component.css'],
})
export class Tm1Component implements OnInit {
  strakePosition: string = 'TEST';
  isEditStrakePosition: boolean = false;
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editId = id;
  }

  startEditStrakePosition(): void {
    this.isEditStrakePosition = true;
  }

  stopEdit(): void {
    this.editId = null;
    this.isEditStrakePosition = false;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        platePosition: '',
        noOrLetter: '',
        originalThickness: '',
        forwardReadingP: 0,
        forwardReadingS: 0,
        afterReadingP: 0,
        afterReadingS: 0,
        meanDiminutionP: 0,
        meanDiminutionS: 0,
      },
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter((d) => d.id !== id);
  }

  ngOnInit(): void {
    this.addRow();
    this.addRow();
  }
}
