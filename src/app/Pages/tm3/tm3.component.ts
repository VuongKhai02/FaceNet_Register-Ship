import { Component } from '@angular/core';

@Component({
  selector: 'app-tm3',
  templateUrl: './tm3.component.html',
  styleUrls: ['./tm3.component.css'],
})
export class Tm3Component {
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
