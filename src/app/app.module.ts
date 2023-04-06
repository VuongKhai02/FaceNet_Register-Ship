import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Tm1Component } from './Pages/tm1/tm1.component';
import { Tm2Component } from './Pages/tm2/tm2.component';

@NgModule({
  declarations: [
    AppComponent,
    Tm1Component,
    Tm2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
