import { certificate } from './../../share/models/certificate.model';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CertificateService } from 'src/app/share/services/certificate.service';
import { HttpClient } from '@angular/common/http';
import { paramValue } from 'src/app/share/models/paramValue.model';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { catchError, retry, throwError } from 'rxjs';

interface newParam {
  param: string;
  value: string;
  type: number;
}

@Component({
  selector: 'app-managing-default-values',
  templateUrl: './managing-default-values.component.html',
  styleUrls: ['./managing-default-values.component.css'],
})
export class ManagingDefaultValuesComponent implements OnInit {
  certificates: certificate[] = [];
  newCertificateName: string = '';
  newCertificateNo: string = '';
  newCertificateStartDate: Date = new Date();
  newCertificateEndtDate: Date = new Date();

  constructor(
    private message: NzMessageService,
    private certificateService: CertificateService,
    private httpClient: HttpClient,
    private paramService: ParamValueService
  ) {}
  getCertificates() {
    this.certificateService.getCertificateFromAPI().subscribe(
      (data) => {
        this.certificates = data;
      },
      (err) => {
        console.log(err);
        alert('Failure to load data from server');
      }
    );
  }

  ngOnInit(): void {
    this.getCertificates();
  }

  certificatePanel = {
    active: false,
    name: 'Certificates',
    disabled: false,
    adding: false,
    newItem: '',
  };
  listParamValue: paramValue[] = [];

  newParamValue: newParam = {
    param: '',
    value: '',
    type: -1,
  };

  panelOnlyEdit = [
    {
      active: false,
      name: 'Company name',
      disabled: false,
      adding: false,
      type: 1,
      edit: false,
    },
    {
      active: false,
      name: 'Qualification of operator',
      disabled: false,
      adding: false,
      type: 5,
      edit: false,
    },
  ];

  panels = [
    {
      active: false,
      name: 'Surveyor',
      disabled: false,
      adding: false,
      type: 2,
    },
    {
      active: false,
      name: 'Details of measurement equipment',
      disabled: false,
      adding: false,
      type: 3,
    },
    {
      active: false,
      name: 'Operator',
      disabled: false,
      adding: false,
      type: 4,
    },
    {
      active: false,
      name: 'Structural member of tm3',
      disabled: false,
      adding: false,
      type: 6,
    },
    {
      active: false,
      disabled: false,
      name: 'Structural member of tm4',
      adding: false,
      type: 7,
    },
    {
      active: false,
      disabled: false,
      name: 'Structural component (plating/stiffener) of tm5',
      adding: false,
      type: 8,
    },
    {
      active: false,
      disabled: false,
      name: 'Description of tm6',
      adding: false,
      type: 9,
    },
    {
      active: false,
      disabled: false,
      name: 'Frame number of tm7',
      adding: false,
      type: 10,
    },
  ];

  checkCertificate() {
    let newCertificates: certificate[] = [];
    this.certificateService.getCertificateFromAPI().subscribe(
      (data) => {
        newCertificates = data;
      },
      (err) => {
        console.log(err);
        alert('Failure to load data from server');
      }
    );
    if (this.certificates === newCertificates) {
      this.checkCertificate;
    } else {
      this.certificates = newCertificates;
    }
  }

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
            console.log('adding');
            this.certificateService.getCertificateFromAPI().subscribe(
              (data) => {
                this.certificates = data;
                console.log(data);
                console.log(this.certificates);
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

  deleteCerficate(id: number) {
    this.certificateService.deleteCertificateFormAPI(id).subscribe(
      (data) => {
        this.certificateService.getCertificateFromAPI().subscribe(
          (data) => {
            this.certificates = data;
            console.log(data);
            console.log(this.certificates);
          },
          (err) => {
            console.log(err);
            alert('Failure to load data from server');
          }
        );
      },
      (err) => {
        console.log('error delete:', err);
        this.certificateService.getCertificateFromAPI().subscribe(
          (data) => {
            this.certificates = data;
          },
          (err) => {
            console.log(err);
            alert('Failure to load data from server');
          }
        );
      }
    );

    setTimeout(this.getCertificates, 1000);
  }

  showParamValue(isActive: boolean, id: number) {
    if (isActive === true)
      this.paramService.getParamValueByType(id).subscribe((data) => {
        this.listParamValue = data;
      });
  }

  addParam(type: number) {
    this.newParamValue.type = type;
    if (this.newParamValue.type !== -1) {
      this.paramService
        .addParamValue(type, this.newParamValue)
        .pipe(
          retry(3),
          catchError(() => {
            return throwError('Something went wrong');
          })
        )
        .subscribe({
          next: () => {
            this.paramService
              .getParamValueByType(type)
              .pipe(
                retry(3),
                catchError(() => {
                  return throwError('Something went wrong');
                })
              )
              .subscribe({
                next: (data) => {
                  this.listParamValue = data;
                },
                error: (error) => {
                  this.message.create(
                    'error',
                    'Something went wrong, please try later'
                  );
                },
              });
          },
          error: () => {
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
          },
        });

      this.newParamValue.param = '';
      this.newParamValue.value = '';
      this.newParamValue.type = -1;
    }
  }

  addItem(i: number) {
    this.message.create('success', 'Add new value success');
  }

  cancel() {}

  deleteItem() {
    // this.panels[i].items.splice(j, 1);
  }

  editItem() {}
}
