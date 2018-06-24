import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MonthReviewComponent } from './month-review/month-review.component';
import { MonthDetailsComponent } from './month-details/month-details.component';
import { AnalyseChantierComponent } from './analyse-chantier/analyse-chantier.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,

  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'month-review',
      component: MonthReviewComponent,
    },
    {
      path: 'month-details',
      component: MonthDetailsComponent,
    },
    {
      path: 'analyse-chantier',
      component: AnalyseChantierComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
