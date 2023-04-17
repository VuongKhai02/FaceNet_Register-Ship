import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tm7',
  templateUrl: './tm7.component.html',
  styleUrls: ['./tm7.component.css']
})
export class Tm7Component implements OnInit {
  addRowValue: number = 0;
  rowValue: RowValue[] = [];
  ngOnInit(): void {
    for(let i = 1; i <= 20; i++)
      this.rowValue.push({upPart: {orgThk: "", gauP: "", gauS: ""},midPart: {orgThk: "", gauP: "", gauS: ""},lowPart: {orgThk: "", gauP: "", gauS: ""}});
  }
  addRow(){
    for(let i = 1; i <= this.addRowValue; i++)
      this.rowValue.push({upPart: {orgThk: "", gauP: "", gauS: ""},midPart: {orgThk: "", gauP: "", gauS: ""},lowPart: {orgThk: "", gauP: "", gauS: ""}});
  }
  toNumber(x: string){
    return (Number)(x);
  }
  parseInt(x: number){
    return Number.parseInt((String)(x));
  }
}

interface Part{
  orgThk: string;
  gauP: string;
  gauS: string;
}

interface RowValue{
  upPart: Part;
  midPart: Part;
  lowPart: Part;
}
