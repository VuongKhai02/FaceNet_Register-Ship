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
import { GeneralParticularPush } from 'src/app/share/models/generalParticularsPush.model';

@Component({
  selector: 'app-general-particulars',
  templateUrl: './general-particulars.component.html',
  styleUrls: ['./general-particulars.component.css'],
})
export class GeneralParticularsComponent implements OnInit {
  mainData!: main;
  link: string = '/selectForm';
  generalParticulars: GeneralParticular[] = [];
  editGeneralParticulars: GeneralParticular[] = [];
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
  inQualification: string = 'SNT-TC-1A UT LEVEL 2';
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

  /**
   * Hàm này dùng để gộp giá trị startTime và endTime của certificate vào một mảng
   */
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

  /**
   * Hàm dùng để hiển thị kết quả tìm kiếm ship
   */
  showModal(): void {
    this.isVisible = true;
    this.shipSevice.getShipsFromAPI().subscribe((data) => {
      this.ships = data;
    });
    this.shipname = this.generalParticularsForm.value.shipName;
    this.IMONum = this.generalParticularsForm.value.imoNumber;
    this.ABSNum = this.generalParticularsForm.value.absIdentificationNumber;
  }

  /**
   * Hàm dùng để đưa dữ liệu vào các ô thông tin của ship
   * @param i: Dữ liệu cần đưa vào
   */
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
          this.generalParticulars = data;
          this.generalParticulars = this.generalParticulars.filter(
            (x) => x.id === this.mainData.mainId
          );
          console.log(this.generalParticulars);

          this.inShipName = this.generalParticulars[0].shipInfo.name;
          this.inIMO = this.generalParticulars[0].shipInfo.imoNumber;
          this.inABS = this.generalParticulars[0].shipInfo.absIdentification;
          this.inPortOf = this.generalParticulars[0].shipInfo.postOfRegistry;
          this.inGrossTon = this.generalParticulars[0].shipInfo.grossTons;
          this.inDeadWeith = this.generalParticulars[0].shipInfo.deadweight;
          this.inDateBuild = this.generalParticulars[0].shipInfo.dateOfBuild;
          this.inClassi =
            this.generalParticulars[0].shipInfo.classificationSociety;
          this.inCertificateName =
            this.generalParticulars[0].certificateDTO.certificateOrganization;
          this.inCertificateNo =
            this.generalParticulars[0].certificateDTO.certificateNo;
          this.inCertificateDate = [
            this.generalParticulars[0].certificateDTO.validStartDate,
            this.generalParticulars[0].certificateDTO.validEndDate,
          ];
          this.inPlaceOf = this.generalParticulars[0].placeOfMeasurement;
          this.inFirstDate = this.generalParticulars[0].firstDateOfMeasurement;
          this.inLastDate = this.generalParticulars[0].lastDateOfMeasurement;
          this.inSpecial = this.generalParticulars[0].surveyType;
          this.inDetailOf = this.generalParticulars[0].measurementEquipmentInfo;
          this.inReport = this.generalParticulars[0].reportNo;
          this.inOperatorName = this.generalParticulars[0].nameOfOperator;
          this.inSuveyor = this.generalParticulars[0].surveyorInfo;
        },
        (err) => {
          console.log(err);
        }
      );
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

  /**
   * Hàm dùng để lưu các dữ liệu nhập vào
   */
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

      let newGeneralParticulars: GeneralParticularPush = {
        ship: newShip,
        certificateNo: this.generalParticularsForm.value.certificateNo,
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
        surveyType: this.generalParticularsForm.value.specialSurvey,
        reportNo: this.generalParticularsForm.value.reportNumber,
        nameOfOperator: this.generalParticularsForm.value.nameOfOperator,
        surveyorInfo: this.generalParticularsForm.value.nameOfSurveyor,
      };

      this.getDataService
        .addGeneralParticularsToAPI(newGeneralParticulars)
        .subscribe(
          (data) => {
            this.getDataService.getGeneralParticularsFromAPI().subscribe(
              (data) => {
                this.generalParticulars = data;
                let newGeneral = this.generalParticulars.filter(
                  (x) =>
                    x.reportNo ===
                    this.generalParticularsForm.value.reportNumber
                );
                this.mainData.mainId = newGeneral[0].id;
                this.mainData.reportNumber = newGeneral[0].reportNo;
                this.mainData.editMode = true;
                console.log(this.mainData);
              },
              (err) => {
                console.log(err);
              }
            );
          },
          (err) => {
            console.log(err);
          }
        );
      this.message.create('success', 'Save success');
      console.log(this.link);
    } else {
      this.message.create('error', 'Enter missing information');
      this.link = '/generalParticulars';
    }
  }

  searchShip() {}

  update(): void {}
}
