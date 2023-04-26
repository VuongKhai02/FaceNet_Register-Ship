import { certificate } from './../../share/models/certificate.model';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CertificateService } from 'src/app/share/services/certificate.service';
import { HttpClient } from '@angular/common/http';
import { paramValue } from 'src/app/share/models/paramValue.model';
import { ParamValueService } from 'src/app/share/services/param-value.service';

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

  panels = [
    {
      active: false,
      name: 'Company name',
      disabled: false,
      adding: false,
    },
    {
      active: false,
      name: 'Surveyor',
      disabled: false,
      adding: false,
    },
    {
      active: false,
      name: 'Details of measurement equipment',
      disabled: false,
      adding: false,
    },
    {
      active: false,
      name: 'Operator',
      disabled: false,
      adding: false,
    },
    {
      active: false,
      name: 'Qualification of operator',
      disabled: false,
      adding: false,
    },
    // {
    //   active: false,
    //   disabled: false,
    //   name: 'Strake position of tm2',
    //   adding: false,
    // },
    {
      active: false,
      name: 'Structural member of tm3',
      disabled: false,
      adding: false,
    },
    {
      active: false,
      disabled: false,
      name: 'Structural member of tm4',
      adding: false,
    },
    {
      active: false,
      disabled: false,
      name: 'Structural component (plating/stiffener) of TM5',
      adding: false,
    },
    {
      active: false,
      disabled: false,
      name: 'Description of tm6',
      adding: false,
    },
    {
      active: false,
      disabled: false,
      name: 'Frame number of tm7',
      adding: false,
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
            this.certificates.push({
              certificateOrganization: this.newCertificateName,
              certificateNo: this.newCertificateNo,
              validStartDate: this.newCertificateStartDate,
              validEndDate: this.newCertificateEndtDate,
            });
          },
          (err) => {
            console.log(err);
            alert('failure');
          }
        );
      this.getCertificates();
      this.message.create('success', 'Add new success');
    } else {
      this.message.create('error', 'Enter missing informations');
    }
  }

  deleteCerficate(i: number) {
    let id: any = 0;
    this.certificateService.getCertificateFromAPI().subscribe((data) => {
      id = data[i].id;
    });
    this.certificateService.deleteCertificateFormAPI(id).subscribe(
      (data) => {},
      (err) => {
        console.log(err);
      }
    );
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
      this.paramService.addParamValue(this.newParamValue).subscribe(() => {
        this.paramService.getParamValueByType(type).subscribe((data) => {
          this.listParamValue = data;
        });
      });

      this.newParamValue.param = '';
      this.newParamValue.value = '';
      this.newParamValue.type = -1;
    }
  }

  addItem(i: number) {
    this.message.create('success', 'Add new success');
  }

  cancel() {}

  deleteItem() {
    // this.panels[i].items.splice(j, 1);
  }

  editItem() {}
}
