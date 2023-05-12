import { PartsService } from './../../share/services/parts.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { part } from 'src/app/share/models/part.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReportIndex } from 'src/app/share/models/report-index.model';
import { ReportIndexesService } from 'src/app/share/services/report-indexes.service';
import { main } from 'src/app/share/models/local.model';
import { LocalService } from 'src/app/share/services/local.service';
import { ReportIndexPush } from 'src/app/share/models/report-indexPush.model';
import { partLocal } from 'src/app/share/models/local.model';
import { Form } from 'src/app/share/models/form.model';

@Component({
  selector: 'app-selectform',
  templateUrl: './selectform.component.html',
  styleUrls: ['./selectform.component.css'],
})
export class SelectformComponent implements OnInit {
  parts: partLocal[] = [];
  mainData!: main;
  reportIndex!: ReportIndex;
  item: string = '';

  constructor(
    private partsService: PartsService,
    private message: NzMessageService,
    private reportIndexService: ReportIndexesService,
    private localService: LocalService
  ) {}
  ngOnInit(): void {
    this.parts = this.partsService.setParts();

    this.mainData = this.localService.getMainData();
  }

  selectForm = new FormGroup({
    formName: new FormControl(''),
    formSelect: new FormControl<any>([]),
  });

  listForm = [];

  submit(): void {
    let newReportIndexPush: ReportIndexPush = {
      item: this.item,
    };
    if (
      this.selectForm.value.formName !== '' &&
      this.selectForm.value.formSelect.length > 0
    ) {
      this.reportIndexService
        .addReportIndexToAPI(this.mainData.mainId, newReportIndexPush)
        .subscribe(
          (data) => {
            this.message.create('success', 'Create success');
            this.reportIndexService
              .getReportIndexFromAPI(this.mainData.mainId)
              .subscribe((data) => {
                let newForm: Form[] = [];

                for (
                  let i: number = 0;
                  i < this.selectForm.value.formSelect.length;
                  i++
                ) {
                  newForm.push({
                    index: -1,
                    name: this.selectForm.value.formSelect[i],
                  });
                }

                let newPart: partLocal = {
                  id: data.parts[data.parts.length - 1].id,
                  index: 0,
                  partName: this.item,
                  forms: newForm,
                  visible: false,
                };
                this.parts.push(newPart);
              });
          },
          (err) => {
            console.log(err);
            this.message.create('error', 'error');
          }
        );
    } else {
      this.selectForm.value.formSelect = ['selectForm'];
      this.message.create('error', 'Enter missing information');
    }
    // if (
    //   this.selectForm.value.formName !== '' &&
    //   this.selectForm.value.formSelect.length > 0
    // ) {
    //   this.partsService.addPartsToAPI({})
    // }
  }
}
