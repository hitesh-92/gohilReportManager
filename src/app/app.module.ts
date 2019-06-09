import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

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
import { MatToolbarModule, MatGridListModule, MatCardModule, MatMenuModule, MatRadioModule } from '@angular/material';
// import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentArticlesComponent } from './current-articles/current-articles.component';
import { ColumnComponent } from './column/column.component';
import { ArchiveComponent } from './archive/archive.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OverviewComponent } from './overview/overview.component';
import { ColumnViewComponent } from './column-view/column-view.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { LandingComponent } from './landing/landing.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserSignupComponent, UserSignUpForm } from './user-signup/user-signup.component';
import { UserLoginComponent, UserLoginForm } from './user-login/user-login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainOverviewComponent } from './main-overview/main-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CurrentArticlesComponent,
    ColumnComponent,
    ArchiveComponent,
    NavbarComponent,
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
    MainOverviewComponent
  ],
  entryComponents: [UserSignUpForm, UserLoginForm],
  imports: [
    BrowserModule,
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
    MatMenuModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
