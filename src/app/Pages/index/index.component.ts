import { Component, OnInit } from '@angular/core';
import { part } from 'src/app/share/models/part.model';
import { PartsService } from 'src/app/share/services/parts.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  parts: part[] = [];

  constructor(private partsService: PartsService) {}

  ngOninit(): void {
    this.parts = this.partsService.setParts();
  }
}
