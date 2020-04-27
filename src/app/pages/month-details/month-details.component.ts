import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TimeInService, IEmployeeLine, IEmployeeHoursLine } from '../../@core/data/timein.service';
import { Observable } from "rxjs/Observable";
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeListModalComponent } from './employee-list-modal/employee-list-modal.component';

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

  color_index = {
    'Démolition/Terrassement' : '#00000',
    'Maçonnerie' : '#1CE6FF',
    'Charpente/Couverture' : '#FF34FF',
    'Isolation intérieure' : '#1B4400',
    'Chassis' : '#3B5DFF',
    'Menuiserie intérieure' : '#FF2F80',
    'Chape' : '#885578',
    'Electricité Phase 1' : '#FF8A9A',
    'Electricité Phase 2' : '#BEC459',
    'HVAC Phase 1' : '#7A87A1',
    'HVAC Phase 2' : '#34362D',
    'Plafonnage' : '#00A6AA',
    'Carrelage' : '#636375',
    'Peinture' : '#04F757',
    'Façade' : '#1E6E00',
    'Raccordement' : '#A77500',
    'Aménagements extérieurs' : '#A05837',
    'Ferronerie' : '#D790FF',
    'Transport' : '#9B9700',
    'Manutention' : '#FDE8DC',
    'Entretient Véhicule' : '#0089A3',
    'Entretient Divers' : '#A4E804',
    'Divers' : '#324E72',
    'A répartir' : '#6A3A4C',
  };

  constructor(private timeInService : TimeInService, private theme: NbThemeService, private modalService: NgbModal) {
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
    scales : {
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
      this.timeInService.getMonthDetails(this.month,'all').subscribe(data => {
        console.log(data);
        this.source.load(data);
        this.updateGraphData(data);
      });
    } else {
      this.timeInService.getMonthDetails(this.month,this.employe).subscribe(data => {
        this.source.load(data);
        this.updateGraphData(data);
      });
    }
  }
  
  updateGraphData(data : any) {
    var chantiers_code = Array.from(new Set(data.map(a => a.ChantierCode)));
    var activites_code = Array.from(new Set(data.map(a => a.ActiviteCode)));
    var chantiers = Array.from(new Set(data.map(a => a.Chantier)));
    var activites = Array.from(new Set(data.map(a => a.Activite)));
    var data_matrix : number[][] = Array(activites.length).fill(0).map(() => Array(chantiers.length).fill(0));
    for(var i = 0; i < data.length; i++) {
      data_matrix[activites.indexOf(data[i].Activite)][chantiers.indexOf(data[i].Chantier)] += data[i].Heures;
    }
    this.data = {
        codes: chantiers_code,
        labels: chantiers,
        datasets: []
    }
    for(var i = 0; i < data_matrix.length; i++) {
      this.data.datasets.push({
          label: activites[i],
          code: activites_code[i],
          data: data_matrix[i],
          borderWidth: 2,
          backgroundColor: this.color_index[String(activites[i])],
        }
      );  
    }
  }
  
  updateEmployeDetails($event) {
    var clickedBar = $event[0];
    if (clickedBar) {
      var activeModal = this.modalService.open(EmployeeListModalComponent, { size: 'lg', container: 'nb-layout' });
      activeModal.componentInstance.chantier = this.data.labels[clickedBar._index];
      activeModal.componentInstance.activite = this.data.datasets[clickedBar._datasetIndex].label;
      activeModal.componentInstance.employeeList = this.timeInService.getEmployeeList(this.month, activeModal.componentInstance.chantier, activeModal.componentInstance.activite);
      activeModal.componentInstance.chantier_code = this.data.codes[clickedBar._index];
      activeModal.componentInstance.activite_code = this.data.datasets[clickedBar._datasetIndex].code;
      activeModal.componentInstance.month = this.month;
      activeModal.componentInstance.onChangeData.subscribe((data: any) => {
            console.log(data);
            this.updateData();
      });
    }
  }  
}
