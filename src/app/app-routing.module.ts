import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { ColumnViewComponent } from './column-view/column-view.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { OverviewComponent } from './overview/overview.component';
import { LeftColumnComponent } from './left-column/left-column.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'app',
    component: MainNavComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'articles', component: ColumnViewComponent },
      { path: 'editor/:id', component: ArticleEditorComponent },
      { path: 'left-column', component: LeftColumnComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
