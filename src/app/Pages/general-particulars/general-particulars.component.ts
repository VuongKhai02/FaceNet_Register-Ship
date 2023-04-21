import { GetDataService } from './../../share/services/get-data.service';
import { GeneralParticular } from './../../share/models/generalParticulars.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ship } from 'src/app/share/models/ship.model';
import { ShipService } from 'src/app/share/services/ships.service';
import { certificate } from 'src/app/share/models/certificate.model';
import { CertificateService } from 'src/app/share/services/certificate.service';
import { LocalService } from 'src/app/share/services/local.service';

@Component({
  selector: 'app-general-particulars',
  templateUrl: './general-particulars.component.html',
  styleUrls: ['./general-particulars.component.css'],
})
export class GeneralParticularsComponent implements OnInit {
  editMode: boolean = false;
  reportNumber: string = '';
  mainId: number = 0;
  entering: number = 0;
  generalParticulars: GeneralParticular[] = [];
  ships: ship[] = [];
  certificates: certificate[] = [];
  listOfItem: string[] = [];
  index: number = 0;
  isVisible = false;
  shipname: any = null;
  IMONum: any = null;
  ABSNum: any = null;
  ngShipName: any = null;
  ngIMO: any = null;
  ngABS: any = null;
  ngPortOf: any = null;
  ngGrossTon: any = null;
  ngDeadWeith: any = null;
  ngDateBuild: any = null;
  ngClassi: any = null;
  ngCertificateName: any = null;
  ngCertificateDate: any = null;
  ngCertificateNo: any = null;
  ngPlaceOf: any = null;

  constructor(
    private shipSevice: ShipService,
    private certificateService: CertificateService,
    private getDataService: GetDataService,
    private message: NzMessageService,
    private localService: LocalService
  ) {}

  test() {}

  seclectChange() {
    let nowCertificate = this.certificates.filter(
      (x) => x.certificateOrganization === this.ngCertificateName
      // .toLowerCase()
      // .normalize('NFD')
      // .replace(/[\u0300-\u036f]/g, '')
      // .includes(
      //   this.ngCertificateName
      //     .toLowerCase()
      //     .normalize('NFD')
      //     .replace(/[\u0300-\u036f]/g, '')
    );
    // this.ngCertificateName = nowCertificate[0].certificateOrganization;

    this.ngCertificateDate = [
      `${nowCertificate[0].validStartDate}`,
      `${nowCertificate[0].validEndDate}`,
    ];
    this.ngCertificateNo = nowCertificate[0].certificateNo;
  }

  showModal(): void {
    this.isVisible = true;
    this.shipSevice.getShipsFromAPI().subscribe((data) => {
      this.ships = data;
    });
    this.shipname = this.generalParticularsForm.value.shipName;
    this.IMONum = this.generalParticularsForm.value.imoNumber;
    this.ABSNum = this.generalParticularsForm.value.absIdentificationNumber;
  }

  addShip(i: ship) {
    this.ngShipName = i.name;
    this.ngIMO = i.imoNumber;
    this.ngABS = i.absIdentification;
    this.ngPortOf = i.postOfRegistry;
    this.ngGrossTon = i.grossTons;
    this.ngDeadWeith = i.deadweight;
    this.ngDateBuild = i.dateOfBuild;
    this.ngClassi = i.classificationSociety;
    this.isVisible = false;
  }

  cancel() {}

  handleOk(): void {
    this.searchShip();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit() {
    // this.generalParticulars = this.getDataService.getGeneralParticulars();
    this.getDataService.getGeneralParticularsFromAPI().subscribe(
      (data) => {
        this.generalParticulars = data;
      },
      (err) => {
        console.log(err);
      }
    );

    this.shipSevice.getShipsFromAPI().subscribe(
      (data) => {
        this.ships = data;
      },
      (err) => {
        console.log(err);
      }
    );

    this.certificateService.getCertificateFromAPI().subscribe(
      (data) => {
        this.certificates = data;
      },
      (err) => {}
    );
    this.editMode = this.localService.getStatus();
    this.reportNumber = this.localService.report();
    this.mainId = this.localService.getId();
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
    this.editMode = true;
    console.log(this.localService.getStatus());

    console.log(this.editMode);
    console.log(this.localService.getStatus());

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

      let newCertificate: certificate = {
        certificateOrganization:
          this.generalParticularsForm.value
            .thicknessMeasurementCompanCertifiedBy,
        certificateNo: this.generalParticularsForm.value.certificateNo,
        validStartDate:
          this.generalParticularsForm.value.certificateValidFrom[0],
        validEndDate: this.generalParticularsForm.value.certificateValidFrom[1],
      };

      let newGeneralParticulars: GeneralParticular = {
        shipInfo: newShip,
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
        // certificateNo: this.generalParticularsForm.value.certificateNo,
        // certificateValidFrom:
        //   this.generalParticularsForm.value.certificateValidFrom,
        certificateDTO: newCertificate,
        placeOfMeasurement:
          this.generalParticularsForm.value.placeOfMeasurement,
        firstDateOfMeasurement:
          this.generalParticularsForm.value.firstDateOfMeasurement,
        lastDateOfMeasurement:
          this.generalParticularsForm.value.lastDateOfMeasurement,
        // specialSurvey: this.generalParticularsForm.value.specialSurvey,
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
          (data) => {},
          (err) => {
            console.log(err);
          }
        );
      this.message.create('success', 'Save success');
    }
  }

  searchShip() {}

  update(): void {}
}
