import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TimeInService, IEmployeeLine, IEmployeeHoursLine } from '../../@core/data/timein.service';
import { Observable } from "rxjs/Observable";
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { YearEmployeeListModalComponent } from './year-employee-list-modal/year-employee-list-modal.component';

@Component({
  selector: 'year-details',
  templateUrl: './year-details.component.html',
  styleUrls: ['./year-details.component.scss']
})

export class YearDetailsComponent implements OnInit {

  year = '2019';
  yearList = ['2018','2019','2020'];
  all_employe : boolean = true;
  employe : string;
  employeList : Observable<IEmployeeLine[]>;
  
  colors: any;
  chartjs: any;
  themeSubscription: any;

  color_index = {
    'Démolition' : '#00000',
    'Terrassement' : '#FFFF00',
    'Maçonnerie' : '#1CE6FF',
    'Charpente' : '#FF34FF',
    'Couverture' : '#FF4A46',
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
    'Façade isol/cimentage' : '#1E6E00',
    'Façade crépis' : '#7900D7',
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
    this.employeList = this.timeInService.getEmployees();
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      this.chartjs = config.variables.chartjs;
    });
  }

  ngOnInit() {
    this.updateData();
  }

  onChangeAll() {
    this.updateData();
  }

  onChangeEmploye(employe : string) {
    this.employe = employe;
    this.updateData();
  }

  onNextYear() {
    var idx = this.yearList.indexOf(this.year);
    if(idx < this.yearList.length-1) {
      this.year = this.yearList[idx+1];
      this.updateData();
    }
  }

  onPreviousYear() {
    var idx = this.yearList.indexOf(this.year);
    if(idx > 0) {
      this.year = this.yearList[idx-1];
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
    maintainAspectRatio: false,
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
      this.timeInService.getYearDetails(this.year,'all').subscribe(data => {
        console.log(data);
        this.source.load(data);
        this.updateGraphData(data);
      });
    } else {
      this.timeInService.getYearDetails(this.year,this.employe).subscribe(data => {
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
      var activeModal = this.modalService.open(YearEmployeeListModalComponent, { size: 'lg', container: 'nb-layout' });
      activeModal.componentInstance.chantier = this.data.labels[clickedBar._index];
      activeModal.componentInstance.activite = this.data.datasets[clickedBar._datasetIndex].label;
      activeModal.componentInstance.employeeList = this.timeInService.getEmployeeList(this.year, activeModal.componentInstance.chantier, activeModal.componentInstance.activite);
      activeModal.componentInstance.chantier_code = this.data.codes[clickedBar._index];
      activeModal.componentInstance.activite_code = this.data.datasets[clickedBar._datasetIndex].code;
      activeModal.componentInstance.year = this.year;
      activeModal.componentInstance.onChangeData.subscribe((data: any) => {
            console.log(data);
            this.updateData();
      });
    }
  }  
}
