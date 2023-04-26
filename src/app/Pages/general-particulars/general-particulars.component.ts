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
import { main } from 'src/app/share/models/local.model';

@Component({
  selector: 'app-general-particulars',
  templateUrl: './general-particulars.component.html',
  styleUrls: ['./general-particulars.component.css'],
})
export class GeneralParticularsComponent implements OnInit {
  mainData!: main;
  link: string = '/generalParticulars';
  // editMode: boolean = false;
  // reportNumber: string = '';
  // mainId: number = 0;
  // entering: number = 0;
  generalParticulars: GeneralParticular[] = [];
  ships: ship[] = [];
  certificates: certificate[] = [];
  listOfItem: string[] = [];
  index: number = 0;
  isVisible = false;
  shipname: any = null;
  IMONum: any = null;
  ABSNum: any = null;
  inShipName: string = '';
  inIMO: string = '';
  inABS: string = '';
  inPortOf: string = '';
  inGrossTon: number | string = '';
  inDeadWeith: number | string = '';
  inDateBuild: Date | string = '';
  inClassi: string = '';
  inCertificateName: string = '';
  inCertificateDate: Date[] | string = '';
  inCertificateNo: string = '';
  inPlaceOf: string = '';
  inFirstDate: Date | string = '';
  inLastDate: Date | string = '';
  inSpecial: string = '';
  inDetailOf: string = '';
  inQualification: string = '';
  inReport: string = '';
  inOperatorName: string = '';
  inSuveyor: string = '';

  constructor(
    private shipSevice: ShipService,
    private certificateService: CertificateService,
    private getDataService: GetDataService,
    private message: NzMessageService,
    private localService: LocalService
  ) {}

  test() {
    console.log(
      this.generalParticularsForm.value.detailsOfMeasurementEquipment.join(';')
    );
  }

  seclectChange() {
    let nowCertificate = this.certificates.filter(
      (x) => x.certificateOrganization === this.inCertificateName
    );

    this.inCertificateDate = [
      nowCertificate[0].validStartDate,
      nowCertificate[0].validEndDate,
    ];
    this.inCertificateNo = nowCertificate[0].certificateNo;
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
    this.inShipName = i.name;
    this.inIMO = i.imoNumber;
    this.inABS = i.absIdentification;
    this.inPortOf = i.postOfRegistry;
    this.inGrossTon = i.grossTons;
    this.inDeadWeith = i.deadweight;
    this.inDateBuild = i.dateOfBuild;
    this.inClassi = i.classificationSociety;
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

  ngOnInit(): void {
    // this.getDataService.getGeneralParticularsFromAPI().subscribe(
    //   (data) => {
    //     this.generalParticulars = data;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );

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
    this.mainData = this.localService.getMainData();
    if (this.mainData.editMode === true) {
      this.getDataService.getGeneralParticularsFromAPI().subscribe(
        (data) => {
          this.generalParticulars = data.find(
            (x: { reportNo: string }) =>
              x.reportNo === this.mainData.reportNumber
          );
        },
        (err) => {
          console.log(err);
        }
      );
    }
    console.log(this.mainData);
    console.log(this.generalParticulars);

    // this.editMode = this.localService.getStatus();
    // this.reportNumber = this.localService.report();
    // this.mainId = this.localService.getId();
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
  });

  subMit(): void {
    if (
      this.inShipName !== '' &&
      this.inIMO !== '' &&
      this.inABS !== '' &&
      this.inPortOf !== '' &&
      this.inGrossTon !== '' &&
      this.inDeadWeith !== '' &&
      this.inDateBuild !== '' &&
      this.inClassi !== '' &&
      this.inCertificateName !== '' &&
      this.inCertificateDate !== '' &&
      this.inCertificateNo !== '' &&
      this.inPlaceOf !== '' &&
      this.inFirstDate !== '' &&
      this.inLastDate !== '' &&
      this.inSpecial !== '' &&
      this.inDetailOf !== '' &&
      this.inQualification !== '' &&
      this.inReport !== '' &&
      this.inOperatorName !== '' &&
      this.inSuveyor !== ''
    ) {
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
        certificateDTO: newCertificate,
        placeOfMeasurement:
          this.generalParticularsForm.value.placeOfMeasurement,
        firstDateOfMeasurement:
          this.generalParticularsForm.value.firstDateOfMeasurement,
        lastDateOfMeasurement:
          this.generalParticularsForm.value.lastDateOfMeasurement,
        measurementEquipmentInfo:
          this.generalParticularsForm.value.detailsOfMeasurementEquipment.join(
            ';'
          ),
        reportNo: this.generalParticularsForm.value.reportNumber,
        numberOfSheets: this.numberOfSheets,
        nameOfOperator: this.generalParticularsForm.value.nameOfOperator,
        nameOfSurveyor: this.generalParticularsForm.value.nameOfSurveyor,
      };

      this.getDataService
        .addGeneralParticularsToAPI(newGeneralParticulars)
        .subscribe(
          (data) => {},
          (err) => {
            console.log(err);
          }
        );
      this.localService.changeStatus();
      this.link = '/selectForm';
      this.message.create('success', 'Save success');
    } else {
      this.message.create('error', 'Enter missing information');
    }
  }

  searchShip() {}

  update(): void {}
}
