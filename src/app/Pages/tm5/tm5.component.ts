import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, retry, throwError } from 'rxjs';
import { formTM5 } from 'src/app/share/models/form/formTM5.model';
import { measurementTM5 } from 'src/app/share/models/form/measurementTM5.model';
import { ParamValue } from 'src/app/share/models/paramValue.model';
import { FormService } from 'src/app/share/services/form/form.service';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { CdkDragEnd, CdkDragDrop } from '@angular/cdk/drag-drop';
import { NavigationEnd, Router } from '@angular/router';
import { GeneralParticular } from 'src/app/share/models/generalParticulars.model';
import { API_END_POINT } from 'src/environments/environment';

@Component({
  selector: 'app-tm5',
  templateUrl: './tm5.component.html',
  styleUrls: ['./tm5.component.css'],
})
export class Tm5Component implements OnInit {
  constructor(
    public formService: FormService,
    public paramValueService: ParamValueService,
    private message: NzMessageService,
    private router: Router
  ) {}

  addRowValue: number = 0;

  listRow: measurementTM5[] = [];

  formTM5: formTM5 = {
    code: '',
    description: '',
    name: '',
    locationOfStructure: '',
    tankHolDescription: '',
    frameNo: '',
    measurementTM5List: this.listRow,
  };

  isPercentVisible: boolean = false;
  isAddRowVisible: boolean = false;

  percentSelected: number = 0;

  listStructuralMember: ParamValue[] = [];

  partId: string = this.router.url.split('/')[2];
  tmId: string = this.router.url.split('/')[4];
  API_URL: string = `http://222.252.25.37:9080/api/v1/report-indexes/${this.partId}/tm5s`;

  emptyRow: measurementTM5 = {
    structuralComponentType: '',
    structuralComponent: '',
    measurementDetail: {
      originalThickness: '',
      maxAlwbDim: '',
      gaugedP: '',
      gaugedS: '',
      percent: '',
    },
  };

  isVisible = false;
  isLoadingSaveButton: boolean = false;

  selectedRow: number[] = [];
  listFormCode: ParamValue[] = [];

  isLoadingImportExcel: boolean = false;

  generalParticular!: GeneralParticular;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        this.router.url.split('/')[1] === 'part' &&
        this.router.url.split('/')[3].slice(0, 3) === 'tm5' &&
        this.router.url.split('/')[4] !== '-1'
      ) {
        this.partId = this.router.url.split('/')[2];
        this.tmId = this.router.url.split('/')[4];
        this.formService.getDataForm('tm5s', this.tmId).subscribe((data) => {
          this.formTM5.code = data.code;
          this.formTM5.tankHolDescription = data.tankHolDescription;
          this.formTM5.locationOfStructure = data.locationOfStructure;
          this.formTM5.frameNo = data.frameNo;
          this.listRow = data.measurementTM5List;

          this.listStructuralMember.map((member) => {
            data.measurementTM5List.forEach((e: any) => {
              if (member.param == e.structuralComponent) {
                member.value = e.measurementDetail.percent;
                return;
              }
            });
          });
        });
      } else if (
        event instanceof NavigationEnd &&
        this.router.url.split('/')[4] === '-1'
      ) {
        for (let i = 1; i <= 20; i++)
          this.listRow.push(JSON.parse(JSON.stringify(this.emptyRow)));
      }
    });

    if (Number(this.tmId) === -1) {
      for (let i = 1; i <= 20; i++)
        this.listRow.push(JSON.parse(JSON.stringify(this.emptyRow)));
    } else {
      this.formService.getDataForm('tm5s', this.tmId).subscribe((data) => {
        this.formTM5.code = data.code;
        this.formTM5.tankHolDescription = data.tankHolDescription;
        this.formTM5.locationOfStructure = data.locationOfStructure;
        this.formTM5.frameNo = data.frameNo;
        this.listRow = data.measurementTM5List;

        this.listStructuralMember.map((member) => {
          data.measurementTM5List.forEach((e: any) => {
            if (member.param == e.structuralComponent) {
              member.value = e.measurementDetail.percent;
              return;
            }
          });
        });
      });
    }

    this.paramValueService.getParamValueByType(8).subscribe((data) => {
      this.listStructuralMember = data;
    });

    this.paramValueService.getParamValueByType(11).subscribe((data) => {
      this.listFormCode = data;
    });

    if (this.formService.getParticularData() != null)
      this.generalParticular = this.formService.getParticularData();
  }

  addRow() {
    if (this.addRowValue > 0 && this.addRowValue <= 100)
      for (let i = 1; i <= this.addRowValue; i++)
        this.listRow.push(JSON.parse(JSON.stringify(this.emptyRow)));
  }

  showModalPercentManage() {
    this.isPercentVisible = true;
  }

  onCancelModal() {
    this.isPercentVisible = false;
  }

  onOkModal() {
    this.isPercentVisible = false;
  }

  convertToNumber(str: string): number {
    return Number(str);
  }

  showModal(): void {
    this.isAddRowVisible = true;
  }

  handleOk(): void {
    if (this.addRowValue > 0 && this.addRowValue <= 100) {
      this.addRow();
      this.isAddRowVisible = false;
      this.message.create('success', 'Add row success');
    } else {
      this.message.create(
        'error',
        'Row value must be greater than 0 and less than or equal to 100'
      );
    }
  }

  handleCancel(): void {
    this.percentSelected = 0;
    this.isAddRowVisible = false;
  }

  setPercent(percent: string, param: string): void {
    this.listRow
      .filter((row) => row.structuralComponent === param)
      .map((row) => {
        row.measurementDetail.percent = percent;
      });
  }

  onSelected(value: string, index: number): void {
    this.listStructuralMember.map((param) => {
      if (param.param === value) {
        this.listRow[index].measurementDetail.percent = param.value;
      }
    });
  }

  onSaveForm() {
    this.isLoadingSaveButton = true;
    this.formTM5.measurementTM5List = this.listRow;
    this.formTM5.measurementTM5List = this.formTM5.measurementTM5List.filter(
      (form) =>
        form.structuralComponentType !== '' ||
        form.structuralComponent !== '' ||
        form.measurementDetail.originalThickness !== '' ||
        form.measurementDetail.gaugedP !== '' ||
        form.measurementDetail.gaugedS !== ''
    );

    this.listRow = this.formTM5.measurementTM5List;

    if (Number(this.tmId) === -1) {
      this.formService
        .addFormToAPI(this.API_URL, this.formTM5)
        .pipe(
          retry(3),
          catchError(() => {
            return throwError('Something went wrong');
          })
        )
        .subscribe({
          next: (result) => {
            this.isLoadingSaveButton = false;
            this.message.create('success', 'Save form success');
            this.router.navigate([
              'part',
              this.partId,
              this.router.url.split('/')[3],
              result.id,
            ]);
          },
          error: (error) => {
            this.isLoadingSaveButton = false;
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
          },
        });
    } else {
      this.formService
        .updateForm('tm5s', this.tmId, this.formTM5)
        .pipe(
          retry(3),
          catchError(() => {
            return throwError('Something went wrong');
          })
        )
        .subscribe({
          next: (result) => {
            this.isLoadingSaveButton = false;
            this.message.create('success', 'Save form success');
          },
          error: (error) => {
            this.isLoadingSaveButton = false;
            this.message.create(
              'error',
              'Something went wrong, please try later'
            );
          },
        });
    }
  }

  onDragEnded(event: CdkDragEnd) {
    event.source.reset();
  }

  selectRow(index: number): void {
    if (
      index === this.selectedRow.sort()[0] - 1 ||
      index === this.selectedRow.sort()[this.selectedRow.length - 1] + 1 ||
      index === this.selectedRow.sort()[0] ||
      index === this.selectedRow.sort()[this.selectedRow.length - 1]
    ) {
      if (this.selectedRow.includes(index) === false)
        this.selectedRow.push(index);
      else this.selectedRow = this.selectedRow.filter((e) => e !== index);
    } else if (this.selectedRow.length === 0) this.selectedRow.push(index);
  }

  onDrop(event: CdkDragDrop<measurementTM5[]>) {
    this.selectedRow.forEach((row) => {
      for (
        let i = row + this.selectedRow.length;
        i <= event.currentIndex;
        i += this.selectedRow.length
      ) {
        this.listRow[i] = JSON.parse(JSON.stringify(this.listRow[row]));
      }
    });
  }

  clearRow(index: number) {
    this.listRow[index] = JSON.parse(JSON.stringify(this.emptyRow));
  }

  deleteRow(index: number) {
    this.listRow.splice(index, 1);
    if (this.listRow.length === 0) {
      this.listRow = [];
    } else {
      this.listRow = this.listRow;
    }
  }

  onImportExcel(event: any) {
    const formData = new FormData();
    formData.append('excelFile', event.target.files[0]);
    this.formService
      .importExcel(`${API_END_POINT}/report-indexes/1/tm5s/sheet`, formData)
      .subscribe((data) => {
        data.measurementTM5List.forEach((data: any) => {});
      });
  }
}
