import { Component } from '@angular/core';

interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
  phanquyen: string;
}

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css'],
})
export class AccountManagementComponent {
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `${this.i + 1}`,
        age: `Account ${this.i + 1}`,
        address: `Password ${this.i + 1}`,
        phanquyen: `admin`,
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
