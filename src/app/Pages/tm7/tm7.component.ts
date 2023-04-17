import { Component, OnInit } from '@angular/core';
import { ShipService } from 'src/app/share/services/ships.service';


@Component({
  selector: 'app-tm7',
  templateUrl: './tm7.component.html',
  styleUrls: ['./tm7.component.css']
})
export class Tm7Component implements OnInit {
  constructor(private shipService: ShipService){
    
  }
  shipName: string ="";
  classID: string = "";
  reportNo: string = "";
  addRowValue: number = 0;
  rowValue: RowValue[] = [];
  ngOnInit(): void {
    this.shipService.getShipsFromAPI().subscribe(
      (res)=>{
        this.shipName = res[0].name;
        this.classID = res[0].absIdentification;
        this.reportNo = "VMC.UTM.22.046/5255939";
        
      },
      (err)=>{
        console.log(err);
      }
    )
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
