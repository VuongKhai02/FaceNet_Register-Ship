import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tm7',
  templateUrl: './tm7.component.html',
  styleUrls: ['./tm7.component.css']
})
export class Tm7Component implements OnInit {
  addRowValue: number = 0;
  rowValue: number[] = [];
  ngOnInit(): void {
    for(let i = 1; i <= 20; i++)
      this.rowValue.push(i);
  }
  addRow(){
    for(let i = 1; i <= this.addRowValue; i++)
      this.rowValue.push(this.rowValue[this.rowValue.length-1]+1);
  }
}
