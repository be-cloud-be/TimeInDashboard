import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MonthReviewComponent } from './month-review/month-review.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MonthDetailsComponent } from './month-details/month-details.component';
import { ChartModule } from 'angular2-chartjs';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    Ng2SmartTableModule,
    ChartModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    MonthReviewComponent,
    MonthDetailsComponent,
  ],
})
export class PagesModule {
}
