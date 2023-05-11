import { certificate } from './../../share/models/certificate.model';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CertificateService } from 'src/app/share/services/certificate.service';
import { HttpClient } from '@angular/common/http';
import { ParamValue } from 'src/app/share/models/paramValue.model';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { catchError, retry, throwError } from 'rxjs';
import { certificatePush } from 'src/app/share/models/certificatePush.model';
import { newParamValue } from 'src/app/share/models/newParamValue.model';

@Component({
  selector: 'app-managing-default-values',
  templateUrl: './managing-default-values.component.html',
  styleUrls: ['./managing-default-values.component.css'],
})
export class ManagingDefaultValuesComponent implements OnInit {
  certificates: certificate[] = [];
  newOneParam: string = '';
  newCertificateName: string = '';
  newCertificateNo: string = '';
  newCertificateStartDate: Date = new Date();
  newCertificateEndtDate: Date = new Date();
  details: ParamValue[] = [];
  compatyNames: ParamValue[] = [];
  qualifications: ParamValue[] = [];
  surveyors: ParamValue[] = [];
  operators: ParamValue[] = [];
  tm3s: ParamValue[] = [];
  tm4s: ParamValue[] = [];
  tm5s: ParamValue[] = [];
  tm6s: ParamValue[] = [];
  tm7s: ParamValue[] = [];

  constructor(
    private message: NzMessageService,
    private certificateService: CertificateService,
    private paramService: ParamValueService
  ) {}

  getCertificates() {
    this.certificateService.getCertificateFromAPI().subscribe(
      (data) => {
        let newCertificate!: certificate;
        for (let i: number = 0; i < data.length; i++) {
          newCertificate = {
            id: data[i].id,
            certificateOrganization: data[i].certificateOrganization,
            certificateNo: data[i].certificateNo,
            validStartDate: data[i].validStartDate,
            validEndDate: data[i].validEndDate,
            edit: false,
          };
          this.certificates.push(newCertificate);
        }
      },
      (err) => {
        console.log(err);
        alert('Failure to load data from server');
      }
    );
  }

  ngOnInit(): void {
    this.newParam = {
      param: '',
      value: '',
      type: -1,
    };
    this.certificates = [];
    this.details = [];
    this.compatyNames = [];
    this.qualifications = [];
    this.surveyors = [];
    this.operators = [];
    this.tm3s = [];
    this.tm4s = [];
    this.tm5s = [];
    this.tm6s = [];
    this.tm7s = [];
    this.panelOneParam[0].param = [];
    this.panelOneParam[1].param = [];
    this.panelOneParam[2].param = [];
    this.panelOneParam[3].param = [];
    this.panelOneParam[4].param = [];
    this.panelOneParam[5].param = [];
    this.getCertificates();
    this.paramService.getParamValueByType(3).subscribe((data) => {
      let newDetail!: ParamValue;
      for (let i: number = 0; i < data.length; i++) {
        newDetail = {
          id: data[i].id,
          param: data[i].param,
          value: data[i].value,
          type: data[i].type,
          edit: false,
        };
        this.details.push(newDetail);
      }
    });
    this.paramService.getParamValueByType(1).subscribe((data) => {
      let newName!: ParamValue;
      for (let i: number = 0; i < data.length; i++) {
        newName = {
          id: data[i].id,
          param: data[i].param,
          value: data[i].value,
          type: data[i].type,
          edit: false,
        };
        this.panelOneParam[0].param.push(newName);
      }
    });
    this.paramService.getParamValueByType(2).subscribe((data) => {
      let newName!: ParamValue;
      for (let i: number = 0; i < data.length; i++) {
        newName = {
          id: data[i].id,
          param: data[i].param,
          value: data[i].value,
          type: data[i].type,
          edit: false,
        };
        this.panelOneParam[2].param.push(newName);
      }
    });
    this.paramService.getParamValueByType(4).subscribe((data) => {
      let newName!: ParamValue;
      for (let i: number = 0; i < data.length; i++) {
        newName = {
          id: data[i].id,
          param: data[i].param,
          value: data[i].value,
          type: data[i].type,
          edit: false,
        };
        this.panelOneParam[3].param.push(newName);
      }
    });
    this.paramService.getParamValueByType(5).subscribe((data) => {
      let newName!: ParamValue;
      for (let i: number = 0; i < data.length; i++) {
        newName = {
          id: data[i].id,
          param: data[i].param,
          value: data[i].value,
          type: data[i].type,
          edit: false,
        };
        this.panelOneParam[1].param.push(newName);
      }
    });
    this.paramService.getParamValueByType(6).subscribe((data) => {
      let newName!: ParamValue;
      for (let i: number = 0; i < data.length; i++) {
        newName = {
          id: data[i].id,
          param: data[i].param,
          value: data[i].value,
          type: data[i].type,
          edit: false,
        };
        this.panelOneParam[5].param.push(newName);
      }
    });
    this.paramService.getParamValueByType(7).subscribe((data) => {
      let newName!: ParamValue;
      for (let i: number = 0; i < data.length; i++) {
        newName = {
          id: data[i].id,
          param: data[i].param,
          value: data[i].value,
          type: data[i].type,
          edit: false,
        };
        this.panelOneParam[6].param.push(newName);
      }
    });
  }

  certificatePanel = {
    active: false,
    name: 'Certificates',
    disabled: false,
    adding: false,
    newItem: '',
  };

  newParam!: newParamValue;

  panelOneParam = [
    {
      active: false,
      name: 'Company name',
      disabled: false,
      adding: false,
      type: 1,
      param: this.compatyNames,
    },
    {
      active: false,
      name: 'Qualification of operator',
      disabled: false,
      adding: false,
      type: 5,
      param: this.qualifications,
    },
    {
      active: false,
      name: 'Surveyor',
      disabled: false,
      adding: false,
      type: 2,
      param: this.surveyors,
    },
    {
      active: false,
      name: 'Operator',
      disabled: false,
      adding: false,
      type: 4,
      param: this.operators,
    },
    {
      active: false,
      name: 'Structural member of tm3',
      disabled: false,
      adding: false,
      type: 8,
      param: this.tm3s,
    },
    {
      active: false,
      disabled: false,
      name: 'Structural member of tm4',
      adding: false,
      type: 6,
      param: this.tm4s,
    },
    {
      active: false,
      disabled: false,
      name: 'Structural component (plating/stiffener) of tm5',
      adding: false,
      type: 7,
      param: this.tm5s,
    },
    {
      active: false,
      disabled: false,
      name: 'Description of tm6',
      adding: false,
      type: 9,
      param: this.tm6s,
    },
    {
      active: false,
      disabled: false,
      name: 'Frame number of tm7',
      adding: false,
      type: 10,
      param: this.tm7s,
    },
  ];

  panels = [
    {
      active: false,
      name: 'Details of measurement equipment',
      disabled: false,
      adding: false,
      type: 3,
      newParam: '',
      newValue: '',
    },
  ];

  addNewCertificate() {
    if (
      this.newCertificateName !== '' &&
      this.newCertificateNo !== '' &&
      this.newCertificateStartDate !== new Date() &&
      this.newCertificateEndtDate !== new Date()
    ) {
      this.certificateService
        .addCertificateToAPI({
          certificateOrganization: this.newCertificateName,
          certificateNo: this.newCertificateNo,
          validStartDate: this.newCertificateStartDate,
          validEndDate: this.newCertificateEndtDate,
        })
        .subscribe(
          (data) => {
            this.certificates = [];
            this.certificateService.getCertificateFromAPI().subscribe(
              (data) => {
                let newCertificate!: certificate;
                for (let i: number = 0; i < data.length; i++) {
                  newCertificate = {
                    id: data[i].id,
                    certificateOrganization: data[i].certificateOrganization,
                    certificateNo: data[i].certificateNo,
                    validStartDate: data[i].validStartDate,
                    validEndDate: data[i].validEndDate,
                    edit: false,
                  };
                  this.certificates.push(newCertificate);
                }
              },
              (err) => {
                console.log(err);
                alert('Failure to load data from server');
              }
            );
          },
          (err) => {
            console.log(err);
            alert('failure');
          }
        );
      this.newCertificateName = '';
      this.newCertificateNo = '';
      this.newCertificateStartDate = new Date();
      this.newCertificateEndtDate = new Date();

      this.message.create('success', 'Add new success');
    } else {
      this.message.create('error', 'Enter missing informations');
    }
  }

  deleteCerficate(id: number, i: number) {
    this.certificateService.deleteCertificateFormAPI(id).subscribe(
      (data) => {
        this.certificates = [];
        this.certificateService.getCertificateFromAPI().subscribe((data) => {
          let newCertificate!: certificate;
          for (let i: number = 0; i < data.length; i++) {
            newCertificate = {
              id: data[i].id,
              certificateOrganization: data[i].certificateOrganization,
              certificateNo: data[i].certificateNo,
              validStartDate: data[i].validStartDate,
              validEndDate: data[i].validEndDate,
              edit: false,
            };
            this.certificates.push(newCertificate);
          }
        });
      },
      (err) => {
        console.log('error delete:', err);
        this.certificates = [];
        this.certificateService.getCertificateFromAPI().subscribe((data) => {
          let newCertificate!: certificate;
          for (let i: number = 0; i < data.length; i++) {
            newCertificate = {
              id: data[i].id,
              certificateOrganization: data[i].certificateOrganization,
              certificateNo: data[i].certificateNo,
              validStartDate: data[i].validStartDate,
              validEndDate: data[i].validEndDate,
              edit: false,
            };
            this.certificates.push(newCertificate);
          }
        });
      }
    );
  }

  addItem(type: number) {
    this.paramService
      .addParamValue({
        param: this.newOneParam,
        value: this.newOneParam,
        type: type,
      })
      .subscribe((data) => {
        this.ngOnInit();
      });
  }

  addDetail(type: number) {
    this.newParam = {
      param: this.panels[0].newParam,
      value: this.panels[0].newValue,
      type: type,
    };
    this.paramService.addParamValue(this.newParam).subscribe((data) => {
      this.newParam = {
        param: '',
        value: '',
        type: -1,
      };
      this.ngOnInit();
    });
  }

  cancel() {}

  deleteItem(id: number) {
    this.paramService.deleteParamValue(id).subscribe(
      (data) => {},
      (err) => {
        this.ngOnInit();
      }
    );
  }

  editItem(i: number, j: number) {
    this.panelOneParam[i].param[j].edit = true;
  }

  saveItem(i: number, j: number) {
    this.panelOneParam[i].param[j].edit = false;
    this.paramService
      .updateParamValue(this.panelOneParam[i].param[j].id, {
        param: this.panelOneParam[i].param[j].param,
        value: this.panelOneParam[i].param[j].value,
        type: this.panelOneParam[i].type,
      })
      .subscribe((data) => {
        this.panelOneParam[i].param = [];
        this.ngOnInit();
      });
  }

  editCertificate(i: number) {
    this.certificates[i].edit = true;
  }

  saveCertififcate(i: number) {
    this.certificates[i].edit = false;
    let editCertificate: certificatePush = {
      certificateOrganization: this.certificates[i].certificateOrganization,
      certificateNo: this.certificates[i].certificateNo,
      validStartDate: this.certificates[i].validStartDate,
      validEndDate: this.certificates[i].validEndDate,
    };
    this.certificateService
      .updateCertificateToAPI(this.certificates[i].id, editCertificate)
      .subscribe();
  }
}
