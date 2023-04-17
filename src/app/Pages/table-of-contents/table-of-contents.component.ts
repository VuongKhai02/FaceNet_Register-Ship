import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { part } from 'src/app/share/models/part.model';
import { PartsService } from 'src/app/share/services/parts.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.css'],
})
export class TableOfContentsComponent implements OnInit {
  parts: part[] = [];

  @ViewChild('myElement')
  myElement!: ElementRef;

  constructor(
    private partsService: PartsService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.parts = this.partsService.setParts();
    var height: number = this.myElement.nativeElement.offsetHeight;
    var tbheight: string = `${String(height)}px`;
  }

  moveUpPart(num: any) {
    if (num === 0) {
      this.message.create('error', 'This is the first part');
    } else {
      let temporaryPart: part = this.parts[num - 1];
      this.parts.splice(num - 1, 1, this.parts[num]);
      this.parts.splice(num, 1, temporaryPart);
      this.message.create('success', 'Move up success');
    }
  }

  moveUpForm(num1: any, num2: any) {
    if (num2 === 0) {
      this.message.create('error', 'This is the first form of part');
    } else {
      let temporaryForm: string = this.parts[num1].forms[num2 - 1];
      this.parts[num1].forms.splice(num2 - 1, 1, this.parts[num1].forms[num2]);
      this.parts[num1].forms.splice(num2, 1, temporaryForm);
      this.message.create('success', 'Move up success');
    }
  }

  moveDownPart(num: any) {
    if (num === this.parts.length - 1) {
      this.message.create('error', 'This is the last part');
    } else {
      let temporaryPart: part = this.parts[num + 1];
      this.parts.splice(num + 1, 1, this.parts[num]);
      this.parts.splice(num, 1, temporaryPart);
      this.message.create('success', 'Move down success');
    }
  }

  moveDownForm(num1: any, num2: any) {
    if (num2 === this.parts[num1].forms.length - 1) {
      this.message.create('error', 'This is the last form of part');
    } else {
      let temporaryForm: string = this.parts[num1].forms[num2 + 1];
      this.parts[num1].forms.splice(num2 + 1, 1, this.parts[num1].forms[num2]);
      this.parts[num1].forms.splice(num2, 1, temporaryForm);
      this.message.create('success', 'Move down success');
    }
  }

  cancel() {}
}
