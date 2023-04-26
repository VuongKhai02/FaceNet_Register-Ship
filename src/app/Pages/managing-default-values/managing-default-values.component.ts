import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  constructor(
    private message: NzMessageService,
    private httpClient: HttpClient,
    private paramService: ParamValueService
  ) {}

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

  ngOnInit(): void {}

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

  editItem(i: number, j: number) {}
}
