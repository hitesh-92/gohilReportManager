import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';

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
    ArticleEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
