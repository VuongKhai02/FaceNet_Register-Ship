import { GetDataService } from './../../share/services/get-data.service';
import { GeneralParticular } from './../../share/models/generalParticulars.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ship } from 'src/app/share/models/ship.model';
import { ShipService } from 'src/app/share/services/ships.service';

@Component({
  selector: 'app-general-particulars',
  templateUrl: './general-particulars.component.html',
  styleUrls: ['./general-particulars.component.css'],
})
export class GeneralParticularsComponent {
  generalParticulars: GeneralParticular[] = [];
  ships: ship[] = [];
  listOfItem: string[] = [];
  index: number = 0;
  isVisible = false;

  constructor(
    private shipSevice: ShipService,
    private getDataService: GetDataService,
    private message: NzMessageService
  ) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.searchShip();
    this.generalParticularsForm.value.shipName = 'ok';
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOninit() {
    // this.generalParticulars = this.getDataService.getGeneralParticulars();
    this.getDataService.getGeneralParticularsFromAPI().subscribe(
      (data) => {
        this.generalParticulars = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addItem(input: HTMLInputElement) {
    const value = input.value;
    if (this.listOfItem.indexOf(value) === -1) {
      this.listOfItem = [
        ...this.listOfItem,
        input.value || `New item ${this.index++}`,
      ];
    }
  }

  NameOfCompanyPerformingThicknessMeasurement: string =
    'VIET NAM MARINE INDUSTRY AND SERVICE JOINT STOCK COMPANY';
  qualificationOfoperator: string = 'SNT-TC-1A UT LEVEL 2';
  numberOfSheets: number = 1;

  generalParticularsForm: FormGroup = new FormGroup({
    shipName: new FormControl(),
    imoNumber: new FormControl(),
    absIdentificationNumber: new FormControl(),
    portOfRegistry: new FormControl(),
    grossTons: new FormControl(),
    deadweight: new FormControl(),
    dateOfBuild: new FormControl(),
    classificationSociety: new FormControl(),
    thicknessMeasurementCompanCertifiedBy: new FormControl(),
    certificateNo: new FormControl(),
    certificateValidFrom: new FormControl(),
    placeOfMeasurement: new FormControl(),
    firstDateOfMeasurement: new FormControl(),
    lastDateOfMeasurement: new FormControl(),
    specialSurvey: new FormControl(),
    detailsOfMeasurementEquipment: new FormControl(),
    reportNumber: new FormControl(),
    nameOfOperator: new FormControl(),
    nameOfSurveyor: new FormControl(),
    signatureOfOperator: new FormControl(),
    signatureOfSurveyor: new FormControl(),
    companyOfficialStamp: new FormControl(),
    classificationSocietyOfficialStamp: new FormControl(),
  });

  subMit(): void {
    if (this.generalParticulars.length === 0) {
      let newShip: ship = {
        name: this.generalParticularsForm.value.shipName,
        imoNumber: this.generalParticularsForm.value.imoNumber,
        absIdentification:
          this.generalParticularsForm.value.absIdentificationNumber,
        postOfRegistry: this.generalParticularsForm.value.portOfRegistry,
        grossTons: this.generalParticularsForm.value.grossTons,
        deadweight: this.generalParticularsForm.value.deadweight,
        dateOfBuild: this.generalParticularsForm.value.dateOfBuild,
        classificationSociety:
          this.generalParticularsForm.value.classificationSociety,
      };
      let newGeneralParticulars: GeneralParticular = {
        ship: newShip,
        // shipName: this.generalParticularsForm.value.shipName,
        // imoNumber: this.generalParticularsForm.value.imoNumber,
        // absIdentification:
        //   this.generalParticularsForm.value.absIdentificationNumber,
        // portOfRegistry: this.generalParticularsForm.value.portOfRegistry,
        // grossTons: this.generalParticularsForm.value.grossTons,
        // deadweight: this.generalParticularsForm.value.deadweight,
        // dateOfBuild: this.generalParticularsForm.value.dateOfBuild,
        // classificationSociety:
        //   this.generalParticularsForm.value.classificationSociety,
        // nameOfCompanyPerformingThicknessMeasurement:
        // this.NameOfCompanyPerformingThicknessMeasurement,
        // thicknessMeasurementCompanCertifiedBy:
        //   this.generalParticularsForm.value
        //     .thicknessMeasurementCompanCertifiedBy,
        certificateNo: this.generalParticularsForm.value.certificateNo,
        // certificateValidFrom:
        //   this.generalParticularsForm.value.certificateValidFrom,
        placeOfMeasurement:
          this.generalParticularsForm.value.placeOfMeasurement,
        firstDateOfMeasurement:
          this.generalParticularsForm.value.firstDateOfMeasurement,
        lastDateOfMeasurement:
          this.generalParticularsForm.value.lastDateOfMeasurement,
        specialSurvey: this.generalParticularsForm.value.specialSurvey,
        measurementEquipmentInfo:
          this.generalParticularsForm.value.detailsOfMeasurementEquipment,
        // qualificationOfoperator: this.qualificationOfoperator,
        reportNo: this.generalParticularsForm.value.reportNumber,
        numberOfSheets: this.numberOfSheets,
        nameOfOperator: this.generalParticularsForm.value.nameOfOperator,
        nameOfSurveyor: this.generalParticularsForm.value.nameOfSurveyor,
        // signatureOfOperator:
        //   this.generalParticularsForm.value.signatureOfOperator,
        // signatureOfSurveyor:
        //   this.generalParticularsForm.value.signatureOfSurveyor,
        // companyOfficialStamp:
        //   this.generalParticularsForm.value.companyOfficialStamp,
        // classificationSocietyOfficialStamp:
        //   this.generalParticularsForm.value.classificationSocietyOfficialStamp,
      };
      // this.generalParticulars.push(newGeneralParticulars);
      // this.getDataService
      //   .addGeneralParticularsToAPI(newGeneralParticulars)
      //   .subscribe();

      this.getDataService
        .addGeneralParticularsToAPI(newGeneralParticulars)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (err) => {
            alert(err);
          }
        );
      this.message.create('success', 'Save success');
    }
  }

  searchShip() {
    this.shipSevice.getShipsFromAPI().subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        alert(err);
      }
    );
  }

  update(): void {}
}
