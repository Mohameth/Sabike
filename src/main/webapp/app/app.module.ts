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
import { DialogConnectComponent } from './sabike/components/dialog-connect/dialog-connect.component';
import { ToolbarComponent } from './sabike/components/toolbar/toolbar.component';
import { SearchComponent } from './sabike/components/toolbar/search/search.component';
import { MatToolbarModule } from '@angular/material';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationPanelComponent } from './sabike/components/navigationpanel/navigation-panel.component';
import { ListArticlesComponent } from 'app/sabike/activities/articles-list/list-articles.component';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { GridArticleComponent } from 'app/sabike/components/grid-article/grid-article.component';
import { CardArticleComponent } from 'app/sabike/components/card-article/card-article.component';
import { DetailsArticleComponent } from 'app/sabike/activities/article-details/details-article.component';
import { CartComponent } from './sabike/activities/cart/cart.component';
import { ListCartComponent } from './sabike/components/list-cart/list-cart.component';
import { ItemListCartComponent } from './sabike/components/list-cart/item-list-cart/item-list-cart.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CheckoutComponent } from './sabike/activities/checkout/checkout.component';
import { MatStepperModule } from '@angular/material/stepper';

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
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatRippleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatStepperModule
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    FooterComponent,
    DialogConnectComponent,
    ToolbarComponent,
    SearchComponent,
    NavigationPanelComponent,
    ListArticlesComponent,
    GridArticleComponent,
    CardArticleComponent,
    DetailsArticleComponent,
    CartComponent,
    ListCartComponent,
    ItemListCartComponent,
    CheckoutComponent
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
