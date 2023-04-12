import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
  phanquyen: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  // i = 0;
  // editId: string | null = null;
  // listOfData: ItemData[] = [];

  // startEdit(id: string): void {
  //   this.editId = id;
  // }

  // stopEdit(): void {
  //   this.editId = null;
  // }

  // addRow(): void {
  //   this.listOfData = [
  //     ...this.listOfData,
  //     {
  //       id: `${this.i}`,
  //       name: `${this.i + 1}`,
  //       age: `Account ${this.i + 1}`,
  //       address: `Password ${this.i + 1}`,
  //       phanquyen: `admin`,
  //     },
  //   ];
  //   this.i++;
  // }

  // deleteRow(id: string): void {
  //   this.listOfData = this.listOfData.filter((d) => d.id !== id);
  // }

  // ngOnInit(): void {
  //   this.addRow();
  //   this.addRow();
  // }
  // search(): void {}
  validateForm!: UntypedFormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 6 : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    for (let i = 0; i < 10; i++) {
      this.controlArray.push({ index: i, show: i < 6 });
      this.validateForm.addControl(`field${i}`, new UntypedFormControl());
    }
  }
}
