import { Component } from '@angular/core';
import { part } from 'src/app/share/models/part.model';
import { PartsService } from 'src/app/share/services/parts.service';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.css'],
})
export class TableOfContentsComponent {
  parts: part[] = [];

  constructor(private partsService: PartsService) {}

  ngOninit(): void {
    this.parts = this.partsService.setParts();
  }
}
