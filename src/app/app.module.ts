import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule, MatGridListModule, MatCardModule, MatMenuModule, MatRadioModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentArticlesComponent } from './current-articles/current-articles.component';
import { ArchiveComponent } from './archive/archive.component';
import { OverviewComponent } from './overview/overview.component';
import { ColumnViewComponent } from './column-view/column-view.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { LandingComponent } from './landing/landing.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserSignupComponent, UserSignUpForm } from './user-signup/user-signup.component';
import { UserLoginComponent, UserLoginForm } from './user-login/user-login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LeftColumnComponent } from './left-column/left-column.component';
import { CenterColumnComponent } from './center-column/center-column.component';
import { RightColumnComponent } from './right-column/right-column.component';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentArticlesComponent,
    ArchiveComponent,
    OverviewComponent,
    ColumnViewComponent,
    ArticleEditorComponent,
    LandingComponent,
    UserAuthComponent,
    UserSignupComponent,
    UserLoginComponent,
    UserSignUpForm,
    UserLoginForm,
    MainNavComponent,
    LeftColumnComponent,
    CenterColumnComponent,
    RightColumnComponent,
    AlertsComponent
  ],
  entryComponents: [UserSignUpForm, UserLoginForm],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
