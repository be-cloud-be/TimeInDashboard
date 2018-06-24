import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MonthReviewComponent } from './month-review/month-review.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MonthDetailsComponent } from './month-details/month-details.component';
import { ChartModule } from 'angular2-chartjs';
import { EmployeeListModalComponent } from './month-details/employee-list-modal/employee-list-modal.component';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AnalyseChantierComponent } from './analyse-chantier/analyse-chantier.component';

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
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    MonthReviewComponent,
    MonthDetailsComponent,
    EmployeeListModalComponent,
    AnalyseChantierComponent,
  ],
  entryComponents: [EmployeeListModalComponent]
})
export class PagesModule {
}
