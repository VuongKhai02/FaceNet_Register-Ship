import { certificate } from './../../share/models/certificate.model';
import { GeneralParticular } from './../../share/models/generalParticulars.model';
import { ship } from 'src/app/share/models/ship.model';
import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/share/services/get-data.service';
import { LocalService } from 'src/app/share/services/local.service';
import { main } from 'src/app/share/models/local.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  link: string = '/history';
  // editMode: boolean = false;
  mainData!: main;
  generalParticulars: GeneralParticular[] = [];
  inShipName: string = '';
  inIMONumber: string = '';
  inDateOfBuild: Date | string = '';
  inReportNumber: string = '';
  inFirstDate: Date | string = '';
  inEndDate: Date | string = '';

  formSearch: FormGroup = new FormGroup({
    name: new FormControl(),
    imo: new FormControl(),
    report: new FormControl(),
    dateOfBuild: new FormControl(),
    firstDate: new FormControl(),
    endDate: new FormControl(),
  });

  toggleCollapse(): void {}

  resetForm(): void {
    this.inShipName = '';
    this.inIMONumber = '';
    this.inDateOfBuild = '';
    this.inReportNumber = '';
    this.inFirstDate = '';
    this.inEndDate = '';
  }

  constructor(
    private getdataService: GetDataService,
    private localService: LocalService
  ) {}

  getGeneralParticulars(): void {
    this.getdataService.getGeneralParticularsFromAPI().subscribe(
      (data) => {
        this.generalParticulars = data;
        console.log(this.generalParticulars);
      },
      (err) => {
        console.log(err);
        alert('Failure to load data from server');
      }
    );
  }

  ngOnInit(): void {
    this.getdataService.getGeneralParticularsFromAPI().subscribe(
      (data) => {
        this.generalParticulars = data;
      },
      (err) => {
        console.log(err);
        alert('Failure to load data from server');
      }
    );
    this.mainData = this.localService.getMainData();
  }

  editItem(id: number, report: string): void {
    // this.localService.pushMain(id, report);
    this.link = '/generalParticulars';
    this.mainData.editMode = true;
    // this.getdataService.getGeneralParticularsFromAPI().subscribe(
    //   (data) => {
    //     this.mainData.mainId = data[0].id;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    this.mainData.reportNumber = report;
    console.log(this.mainData);
  }

  search(): void {
    if (
      this.formSearch.value.name === '' &&
      this.formSearch.value.imo === '' &&
      this.formSearch.value.report === '' &&
      this.formSearch.value.dateOfBuild === '' &&
      this.formSearch.value.firstDate === '' &&
      this.formSearch.value.endDate === ''
    ) {
      this.getGeneralParticulars();
    }
    if (this.formSearch.value.name !== '') {
      this.generalParticulars = this.generalParticulars.filter((x) =>
        x.shipInfo.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            this.formSearch.value.name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          )
      );
    }
    if (this.formSearch.value.imo !== '') {
      this.generalParticulars = this.generalParticulars.filter((x) =>
        x.shipInfo.imoNumber
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            this.formSearch.value.imo
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          )
      );
    }
    if (this.formSearch.value.report !== '') {
      this.generalParticulars = this.generalParticulars.filter((x) =>
        x.reportNo
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            this.formSearch.value.report
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          )
      );
    }
    if (this.formSearch.value.dateOfBuild !== '') {
      this.generalParticulars = this.generalParticulars.filter(
        (x) => x.shipInfo.dateOfBuild === this.inDateOfBuild
      );
    }
    if (this.formSearch.value.firstDate !== '') {
      this.generalParticulars = this.generalParticulars.filter(
        (x) => x.firstDateOfMeasurement === this.inFirstDate
      );
    }
    if (this.formSearch.value.lastDate !== '') {
      this.generalParticulars = this.generalParticulars.filter(
        (x) => x.lastDateOfMeasurement
      );
    }
  }

  deleteItem() {}

  cancel() {}
}
