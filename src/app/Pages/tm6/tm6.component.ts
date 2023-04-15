import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tm6',
  templateUrl: './tm6.component.html',
  styleUrls: ['./tm6.component.css']
})

export class Tm6Component implements OnInit {
  addRowValue: number = 0;
  rowValue: TM6[] = [];
  ngOnInit(): void {
    for(let i = 1; i <= 20; i++)
      this.rowValue.push({desc:'',orgThk:'',maxAlw:'',gauP:'',gauS:''});
  }
  addRow(){
    for(let i = 1; i <= this.addRowValue; i++)
      this.rowValue.push({desc:'',orgThk:'',maxAlw:'',gauP:'',gauS:''});
  }

  toNumber(x: string){
    return (Number)(x);
  }

}

interface TM6{
  desc: string;
  orgThk:  string;
  maxAlw:  string;
  gauP:  string;
  gauS:  string;
}
