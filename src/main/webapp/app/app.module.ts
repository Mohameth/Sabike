import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbActiveModal, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { SabikeSharedModule } from 'app/shared';
import { SabikeCoreModule } from 'app/core';
import { SabikeAppRoutingModule } from './app-routing.module';
import { SabikeHomeModule } from 'app/home';
import { SabikeAccountModule } from './account/account.module';
import { SabikeEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import { DialogConnectComponent } from './layouts/dialog-connect/dialog-connect.component';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { SearchComponent } from './layouts/toolbar/search/search.component';
import { MatToolbarModule } from '@angular/material';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000
    }),
    SabikeSharedModule.forRoot(),
    SabikeCoreModule,
    SabikeHomeModule,
    SabikeAccountModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SabikeEntityModule,
    SabikeAppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    FooterComponent,
    DialogConnectComponent,
    ToolbarComponent,
    SearchComponent
  ],
  providers: [
    NgbActiveModal,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: false
      }
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: []
    }
  ],
  bootstrap: [JhiMainComponent],
  entryComponents: [DialogConnectComponent]
})
export class SabikeAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
