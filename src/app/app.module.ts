import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Tm1Component } from './Pages/tm1/tm1.component';
import { Tm2Component } from './Pages/tm2/tm2.component';
import { Tm3Component } from './Pages/tm3/tm3.component';
import { Tm4Component } from './Pages/tm4/tm4.component';
import { Tm5Component } from './Pages/tm5/tm5.component';
import { Tm6Component } from './Pages/tm6/tm6.component';
import { Tm7Component } from './Pages/tm7/tm7.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { GeneralParticularsComponent } from './Pages/general-particulars/general-particulars.component';
import { AccountManagementComponent } from './Pages/account-management/account-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { LoginComponent } from './Pages/login/login.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SelectformComponent } from './Pages/selectform/selectform.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { HistoryComponent } from './Pages/history/history.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { ReviewComponent } from './Pages/review/review.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ShipFilterPipe } from './share/pipes/ship-filter.pipe';
import { CertificateLoadPipe } from './share/pipes/certificate-load.pipe';
import { LocalService } from './share/services/local.service';
import { TableOfContentsComponent } from './Pages/table-of-contents/table-of-contents.component';
import { ManagingDefaultValuesComponent } from './Pages/managing-default-values/managing-default-values.component';
import { Tm2iComponent } from './Pages/tm2i/tm2i.component';
import { Tm2iiComponent } from './Pages/tm2ii/tm2ii.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ExportPdfComponent } from './Pages/export-pdf/export-pdf.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AuthInterceptorProvider } from './share/services/auth.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    Tm1Component,
    Tm2Component,
    Tm2iComponent,
    Tm2iiComponent,
    Tm3Component,
    Tm4Component,
    Tm5Component,
    Tm6Component,
    Tm7Component,
    ReviewComponent,
    ShipFilterPipe,
    CertificateLoadPipe,
    AccountManagementComponent,
    GeneralParticularsComponent,
    LoginComponent,
    SelectformComponent,
    HistoryComponent,
    ReviewComponent,
    TableOfContentsComponent,
    ManagingDefaultValuesComponent,
    ExportPdfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzDatePickerModule,
    NzTableModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzIconModule,
    NzDividerModule,
    NzInputModule,
    NzCardModule,
    NzListModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzMessageModule,
    NzAffixModule,
    NzCollapseModule,
    NzModalModule,
    DragDropModule,
    KeycloakAngularModule,
    NzUploadModule,
    NzSpinModule,
    NgxSpinnerModule,
    RouterModule,
    NzCheckboxModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    LocalService,
    AuthInterceptorProvider,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
