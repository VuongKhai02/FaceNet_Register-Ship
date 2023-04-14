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

const routes: Routes = [
  { path: '', component: GeneralParticularsComponent },
  { path: 'Tm1', component: Tm1Component },
  { path: 'Tm2', component: Tm2Component },
  { path: 'Tm3', component: Tm3Component },
  { path: 'Tm4', component: Tm4Component },
  { path: 'Tm5', component: Tm5Component },
  { path: 'Tm6', component: Tm6Component },
  { path: 'Tm7', component: Tm7Component },
  { path: 'generalParticulars', component: GeneralParticularsComponent },
  { path: 'accountManagement', component: AccountManagementComponent },
  { path: 'login', component: LoginComponent },
  { path: 'selectForm', component: SelectformComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'review', component: ReviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
