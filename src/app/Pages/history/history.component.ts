import { GeneralParticular } from './../../share/models/generalParticulars.model';
import { ship } from 'src/app/share/models/ship.model';
import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/share/services/get-data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  generalParticulars: GeneralParticular[] = [];
  inShipName: string = '';
  inIMONumber: number | string = '';
  inDateOfBuild: Date | string = '';
  inReportNumber: string = '';

  toggleCollapse(): void {}

  resetForm(): void {}

  constructor(private getdataService: GetDataService) {}

  ngOnInit(): void {
    this.getdataService.getGeneralParticularsFromAPI().subscribe(
      (data) => {
        this.generalParticulars = data;
        console.log(this.generalParticulars);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
