import { PartsService } from 'src/app/share/services/parts.service';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { part } from './share/models/part.model';
import { SelectformComponent } from './Pages/selectform/selectform.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  parts: part[] = [];

  constructor(private partsService: PartsService) {}

  ngOnInit(): void {
    this.parts = this.partsService.setParts();
  }

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isCollapsed = false;
  Islogin: boolean = true;

  logIn(title: boolean): void {
    this.Islogin = title;
  }

  logOut(): void {
    this.Islogin = true;
  }
}
