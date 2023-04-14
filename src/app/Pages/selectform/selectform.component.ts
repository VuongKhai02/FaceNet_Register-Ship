import { PartsService } from './../../share/services/parts.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { part } from 'src/app/share/models/part.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-selectform',
  templateUrl: './selectform.component.html',
  styleUrls: ['./selectform.component.css'],
})
export class SelectformComponent implements OnInit {
  parts: part[] = [];
  constructor(
    private partsService: PartsService,
    private message: NzMessageService
  ) {}
  ngOnInit(): void {
    this.parts = this.partsService.setParts();
  }

  selectForm = new FormGroup({
    formName: new FormControl(''),
    formSelect: new FormControl<any>([]),
  });

  listForm = [];

  submit(): void {
    if (
      this.selectForm.value.formName !== '' &&
      this.selectForm.value.formSelect.length > 0
    ) {
      this.parts.push({
        partName: this.selectForm.value.formName,
        forms: this.selectForm.value.formSelect,
        visible: false,
      });
      this.message.create('success', 'Admit success');
    } else {
      this.selectForm.value.formSelect = ['selectForm'];
      this.message.create('error', 'Nhập thiếu thông tin');
    }
  }
}
