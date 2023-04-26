import { PartsService } from 'src/app/share/services/parts.service';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { part } from './share/models/part.model';
import { SelectformComponent } from './Pages/selectform/selectform.component';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalService } from './share/services/local.service';
import { main } from './share/models/local.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  parts: part[] = [];
  formSelect: string[] = [];
  mainData!: main;
  constructor(
    private partsService: PartsService,
    private localService: LocalService
  ) {}

  clickMe(i: number): void {
    this.parts[i].visible = false;
  }

  addForm(i: number) {
    for (let j: number = 0; j < this.formSelect.length; j++) {
      this.parts[i].forms.push(this.formSelect[j]);
    }
  }

  change(value: boolean): void {
    console.log(value);
  }

  ngOnInit(): void {
    this.parts = this.partsService.setParts();
    this.mainData = this.localService.getMainData();
  }

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isCollapsed = false;
  Islogin: boolean = false;

  logIn(title: boolean): void {
    this.Islogin = title;
  }

  logOut(): void {
    this.Islogin = true;
  }

  deleteTm(i: number, j: number) {
    this.parts[i].forms.splice(j, 1);
    console.log('ok');
  }

  deletePart(i: number) {
    this.parts.splice(i, 1);
  }
  cancel() {}
}
