import { certificate } from './../../share/models/certificate.model';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CertificateService } from 'src/app/share/services/certificate.service';

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
    private certificateService: CertificateService
  ) {}

  getCertificates() {
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

  panels = [
    {
      active: false,
      name: 'Details of measurement equipment',
      disabled: false,
      adding: false,
      newItem: '',
      items: ['T-GAGE V (Serri 05058879)', 'OLYMPUS 27MG (Serri 150239211)'],
    },
    {
      active: false,
      name: 'Structural member of tm4',
      disabled: false,
      adding: false,
      newItem: '',
      items: [
        'Web Plating',
        'Longi Bulkhead',
        'T.S.T Bottom Longi',
        'Main Deck Plating',
        'T.S.T Bottom Plate',
      ],
    },
    {
      active: false,
      disabled: false,
      name: 'Description of tm6',
      adding: false,
      newItem: '',
      items: ['items', 'Deck Beam', 'Deck Girder - Web', 'Deck Girder - Face'],
    },
    {
      active: false,
      disabled: false,
      name: 'Frame number of tm7',
      adding: false,
      newItem: '',
      items: ['Web', 'Side Shell', 'Face'],
    },
    {
      active: false,
      disabled: false,
      name: 'Strake position of tm2',
      adding: false,
      newItem: '',
      items: ['Web', 'Face', 'Side Shell'],
    },
    {
      active: false,
      disabled: false,
      name: 'Structural member of tm3',
      adding: false,
      newItem: '',
      items: [
        'Hatch Coaming',
        'Hatch Coaming',
        'T.S.T Bottom Plate',
        'Hopper Plate',
        'Bottom Longi',
        'Side longi',
        'T.S.T Bottom Longi',
        'Side Girder',
        'Longi BHD',
      ],
    },
    {
      active: false,
      disabled: false,
      name: 'Structural component (plating/stiffener)',
      adding: false,
      newItem: '',
      items: ['Plating'],
    },
  ];

  checkCertificate() {
    let newCertificates: certificate[] = [];
    this.certificateService.getCertificateFromAPI().subscribe(
      (data) => {
        newCertificates = data;
        console.log('Data', data);
        console.log('New', newCertificates);
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
  test() {
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

  addItem() {
    // this.panels[i].items.push(this.panels[i].newItem);
    // this.panels[i].newItem = '';
    // this.message.create('success', 'Add new success');
  }

  cancel() {}

  deleteItem() {
    // this.panels[i].items.splice(j, 1);
  }

  editItem() {}
}
