import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tm1Component } from './Pages/tm1/tm1.component';
import { Tm2Component } from './Pages/tm2/tm2.component';
import { Tm3Component } from './Pages/tm3/tm3.component';
import { Tm4Component } from './Pages/tm4/tm4.component';
import { Tm5Component } from './Pages/tm5/tm5.component';
import { Tm6Component } from './Pages/tm6/tm6.component';
import { Tm7Component } from './Pages/tm7/tm7.component';
import { GeneralParticularsComponent } from './Pages/general-particulars/general-particulars.component';
import { AccountManagementComponent } from './Pages/account-management/account-management.component';
import { LoginComponent } from './Pages/login/login.component';
import { SelectformComponent } from './Pages/selectform/selectform.component';
import { AppComponent } from './app.component';
import { HistoryComponent } from './Pages/history/history.component';
import { ReviewComponent } from './Pages/review/review.component';
import { TableOfContentsComponent } from './Pages/table-of-contents/table-of-contents.component';
import { ManagingDefaultValuesComponent } from './Pages/managing-default-values/managing-default-values.component';
import { Tm2iComponent } from './Pages/tm2i/tm2i.component';
import { Tm2iiComponent } from './Pages/tm2ii/tm2ii.component';
import { ExportPdfComponent } from './Pages/export-pdf/export-pdf.component';

const routes: Routes = [
  { path: '', component: GeneralParticularsComponent },
  { path: 'part/:id/tm1/:id', component: Tm1Component },
  { path: 'part/:id/tm2/:id', component: Tm2Component },
  { path: 'part/:id/tm2i/:id', component: Tm2iComponent },
  { path: 'part/:id/tm2ii/:id', component: Tm2iiComponent },
  { path: 'part/:id/tm3/:id', component: Tm3Component },
  { path: 'part/:id/tm4/:id', component: Tm4Component },
  { path: 'part/:id/tm5/:id', component: Tm5Component },
  { path: 'part/:id/tm6/:id', component: Tm6Component },
  { path: 'part/:id/tm7/:id', component: Tm7Component },
  { path: 'generalParticulars', component: GeneralParticularsComponent },
  { path: 'accountManagement', component: AccountManagementComponent },
  { path: 'login', component: LoginComponent },
  { path: 'selectForm', component: SelectformComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'index', component: TableOfContentsComponent },
  { path: 'export-pdf', component: ExportPdfComponent },
  {
    path: 'managing-default-values',
    component: ManagingDefaultValuesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
