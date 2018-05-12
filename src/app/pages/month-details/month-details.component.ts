import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TimeInService, IEmployeeLine } from '../../@core/data/timein.service';
import { Observable } from "rxjs/Observable";
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'month-details',
  templateUrl: './month-details.component.html',
  styleUrls: ['./month-details.component.scss']
})
export class MonthDetailsComponent implements OnInit {

  month : string;
  monthList : string[];
  all_employe : boolean = true;
  employe : string;
  employeList : Observable<IEmployeeLine[]>;
  
  colors: any;
  chartjs: any;
  themeSubscription: any;

  constructor(private timeInService : TimeInService, private theme: NbThemeService) {
    this.timeInService.getMonthList().subscribe(data => {this.monthList = data});
    this.timeInService.getCurrentMonth().subscribe(data => {this.month = data; this.updateData();});
    this.employeList = this.timeInService.getEmployees();
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      this.chartjs = config.variables.chartjs;
    });
  }

  ngOnInit() {
  }

  onChangeAll() {
    this.updateData();
  }

  onChangeEmploye(employe : string) {
    this.employe = employe;
    this.updateData();
  }

  onNextMonth() {
    var idx = this.monthList.indexOf(this.month);
    if(idx < this.monthList.length-1) {
      this.month = this.monthList[idx+1];
      this.updateData();
    }
  }

  onPreviousMonth() {
    var idx = this.monthList.indexOf(this.month);
    if(idx > 0) {
      this.month = this.monthList[idx-1];
      this.updateData();
    }  
  }
  
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      Chantier: {
        title: 'Chantier',
        type: 'string',
        width: '30%',
      },
      Activite: {
        title: 'Activité',
        type: 'string',
        width: '30%',
      },
      Heures: {
        title: 'Heures',
        type: 'number',
      },
    },
  };
  
  source: LocalDataSource = new LocalDataSource();
  
  options = {
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
  
  data: any;
  
  updateData() {
    if(this.all_employe) {
      var data = this.timeInService.getMonthDetails(this.month,'all').subscribe(data => {
        this.source.load(data);
        updateData
      });
    } else {
      var data = this.timeInService.getMonthDetails(this.month,this.employe).subscribe(data => {
        this.source.load(data);
      });
    }
  }

}
