import { Component } from '@angular/core';
import { TimeInService, IDashboardHoursSummaryLine } from '../../@core/data/timein.service';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  
  data: any;
  options: any;
  themeSubscription: any;
  
  constructor(private timeInService : TimeInService, private theme: NbThemeService) {
    this.options = {
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
  
      }
    };
    
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.timeInService.getDashboardHoursSummary().subscribe(data => {
        var labels = data.map(a => a.Mois);
        this.data = {
            labels: labels,
            datasets: [{
                label: 'Heures',
                data: data.map(a => a.Heures),
                borderWidth: 2,
                backgroundColor: NbColorHelper.hexToRgbA(colors.successLight, 0.8),
              },
              {
                label: 'Heures Supp',
                data: data.map(a => a.HeuresSupp),
                borderWidth: 2,
                backgroundColor: NbColorHelper.hexToRgbA(colors.successLight, 0.4),
              },
              {
                label: 'Chomage',
                data: data.map(a => a.Chomage),
                borderWidth: 2,
                backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
              },
              {
                label: 'SansSoldep',
                data: data.map(a => a.SansSolde),
                borderWidth: 2,
                backgroundColor: NbColorHelper.hexToRgbA(colors.warningLight, 0.8),
              },
              {
                label: 'Maladie',
                data: data.map(a => a.Maladie),
                borderWidth: 2,
                backgroundColor: NbColorHelper.hexToRgbA(colors.warningLight, 0.4),
              },
              {
                label: 'Conge',
                data: data.map(a => a.Conge),
                borderWidth: 2,
                backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
              },
            ]
          }
      });
    });
  }
  
}