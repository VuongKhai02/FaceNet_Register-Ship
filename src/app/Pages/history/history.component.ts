import { ReportIndexesService } from './../../share/services/report-indexes.service';
import { certificate } from './../../share/models/certificate.model';
import { GeneralParticular } from './../../share/models/generalParticulars.model';
import { ship } from 'src/app/share/models/ship.model';
import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/share/services/get-data.service';
import { LocalService } from 'src/app/share/services/local.service';
import { main } from 'src/app/share/models/local.model';
import { FormGroup, FormControl } from '@angular/forms';
import { PartsService } from 'src/app/share/services/parts.service';
import { ReportIndex } from 'src/app/share/models/report-index.model';
import { partLocal } from 'src/app/share/models/local.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { Form } from 'src/app/share/models/form.model';
import { FormLocal } from 'src/app/share/models/local.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  loading: boolean = false;
  link: string = '/history';
  mainData!: main;
  generalParticulars: GeneralParticular[] = [];
  inShipName: string = '';
  inIMONumber: string = '';
  inDateOfBuild: Date | string = '';
  inReportNumber: string = '';
  inFirstDate: Date | string = '';
  inEndDate: Date | string = '';
  parts: partLocal[] = [];

  formSearch: FormGroup = new FormGroup({
    name: new FormControl(),
    imo: new FormControl(),
    report: new FormControl(),
    dateOfBuild: new FormControl(),
    firstDate: new FormControl(),
    endDate: new FormControl(),
  });

  toggleCollapse(): void {}

  /**
   * Hàm dùng để reset lại các ô input
   */
  resetForm(): void {
    this.inShipName = '';
    this.inIMONumber = '';
    this.inDateOfBuild = '';
    this.inReportNumber = '';
    this.inFirstDate = '';
    this.inEndDate = '';
    this.ngOnInit();
  }

  constructor(
    private getdataService: GetDataService,
    private localService: LocalService,
    private reportIndexService: ReportIndexesService,
    private partsService: PartsService,
    private message: NzMessageService,
    private router: Router
  ) {}

  getGeneralParticulars(): void {
    this.getdataService.getGeneralParticularsFromAPI().subscribe(
      (data) => {
        this.generalParticulars = data;
      },
      (err) => {
        console.log(err);
        this.message.create('error', 'connection to data failed');
      }
    );
  }

  ngOnInit(): void {
    this.loading = this.localService.getLoading();
    this.getdataService.getGeneralParticularsFromAPI().subscribe(
      (data) => {
        this.generalParticulars = data;
      },
      (err) => {
        console.log(err);
        this.message.create('error', 'connection to data failed');
      }
    );
    this.mainData = this.localService.getMainData();
    this.parts = this.partsService.setParts();
  }

  /**
   * Hàm dùng để edit
   * @param id: id của General paticular
   * @param report : reportNo của General paticular
   */
  editItem(id: number, report: string): void {
    this.link = '/generalParticulars';
    this.mainData.editMode = true;
    this.mainData.loading = true;
    this.mainData.reportNumber = report;
    this.mainData.mainId = id;
    this.reportIndexService
      .getReportIndexFromAPI(this.mainData.mainId)
      .subscribe(
        (data) => {
          console.log(data.parts.length);
          if (data.parts.length === 0) {
            this.mainData.loading = false;
          }
          this.parts.splice(0, this.parts.length);
          let newForm: FormLocal[] = [];
          for (let i: number = 0; i < data.parts.length; i++) {
            for (let j: number = 0; j < data.parts[i].forms.length; j++) {
              newForm.push({
                formID: data.parts[i].forms[j].formID,
                index: data.parts[i].forms[j].index,
                name: data.parts[i].forms[j].name,
                type: data.parts[i].forms[j].type,
                edit: false,
              });
            }
            this.parts.push({
              id: data.parts[i].id,
              partIndex: data.parts[i].partIndex,
              partName: data.parts[i].item,
              forms: newForm.sort((a, b) => a.index - b.index),
              visible: false,
              edit: false,
            });
            newForm = [];
            this.parts = this.parts.sort((a, b) => a.partIndex - b.partIndex);
            this.mainData.loading = false;
          }
        },
        (err) => {
          console.log('report', err);
        }
      );
    this.router.navigateByUrl('/generalParticulars');
  }

  /**
   * Hàm dùng để tìm kiếm general paticular theo các trường đã chọn
   */
  search(): void {
    if (
      this.formSearch.value.name === '' &&
      this.formSearch.value.imo === '' &&
      this.formSearch.value.report === '' &&
      (this.formSearch.value.dateOfBuild === '' ||
        this.formSearch.value.dateOfBuild === null) &&
      (this.formSearch.value.firstDate === '' ||
        this.formSearch.value.firstDate === null) &&
      (this.formSearch.value.endDate === '' ||
        this.formSearch.value.endDate === null)
    ) {
      this.ngOnInit();
      return;
    }
    this.getdataService.getGeneralParticularsFromAPI().subscribe(
      (data) => {
        this.generalParticulars = data;
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
          this.generalParticulars = this.generalParticulars.filter((x) =>
            String(new Date(x.shipInfo.dateOfBuild))
              .slice(0, 15)
              .includes(String(this.formSearch.value.dateOfBuild).slice(0, 15))
          );
        }
        if (this.formSearch.value.firstDate !== '') {
          this.generalParticulars = this.generalParticulars.filter(
            (x) =>
              String(new Date(x.firstDateOfMeasurement)).slice(0, 15) ==
              String(this.formSearch.value.firstDate).slice(0, 15)
          );
        }
        if (this.formSearch.value.endDate !== '') {
          this.generalParticulars = this.generalParticulars.filter(
            (x) =>
              String(new Date(x.lastDateOfMeasurement)).slice(0, 15) ==
              String(this.formSearch.value.endDate).slice(0, 15)
          );
        }
      },
      (err) => {
        console.log(err);
        this.message.create('error', 'connection to data failed');
      }
    );
  }

  /**
   * Hàm dùng để xóa một phần tử trong mảng general paticular
   * @param id : id của phần tử
   */
  deleteItem(id: number) {
    this.mainData.loading = true;
    this.getdataService.deleteGeneralParticularsFormAPI(id).subscribe(
      (data) => {
        this.getdataService.getGeneralParticularsFromAPI().subscribe(
          (data) => {
            this.generalParticulars = data;
            this.mainData.loading = false;
          },
          (err) => {
            console.log(err);
            this.message.create('error', 'connection to data failed');
          }
        );
      },
      (err) => {
        console.log(err);
        this.getdataService.getGeneralParticularsFromAPI().subscribe(
          (data) => {
            this.generalParticulars = data;
          },
          (err) => {
            console.log(err);
            this.message.create('error', 'connection to data failed');
          }
        );
      }
    );
  }

  cancel() {}
}
