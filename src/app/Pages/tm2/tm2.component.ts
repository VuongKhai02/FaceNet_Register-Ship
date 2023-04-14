import { Component } from '@angular/core';

@Component({
  selector: 'app-tm2',
  templateUrl: './tm2.component.html',
  styleUrls: ['./tm2.component.css'],
})
export class Tm2Component {
  addRowValue: number = 0;
  rowValue: number[] = [];

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++) this.rowValue.push(i);
  }
  addRow() {
    for (let i = 1; i <= this.addRowValue; i++)
      this.rowValue.push(this.rowValue[this.rowValue.length - 1] + 1);
  }
}
