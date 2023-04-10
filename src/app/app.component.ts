import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
}
