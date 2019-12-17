import { Component, OnInit } from '@angular/core';
import { TimeInService, IChantierLine } from '../../@core/data/timein.service';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeListModalComponent } from '../month-details/employee-list-modal/employee-list-modal.component';

@Component({
  selector: 'analyse-chantier',
  templateUrl: './analyse-chantier.component.html',
  styleUrls: ['./analyse-chantier.component.scss']
})
export class AnalyseChantierComponent implements OnInit {

  chantier : string;
  chantierList : Observable<IChantierLine[]>;
  chantierMap : Map<string,string>;
  month : string;
  monthList : Observable<string[]>;

  constructor(private timeInService : TimeInService, private theme: NbThemeService, private modalService: NgbModal) {
    this.chantierList = this.timeInService.getChantiers();
    this.monthList = this.timeInService.getMonthList();
    this.month = 'all';
    this.chantierList.subscribe(data => {
      this.chantierMap = new Map();
      for(let c of data) {
        this.chantierMap.set(c.Chantier,c.ChantierCode);
      }
    });
  }

  ngOnInit() {
  }

  total_heures : number;

  data : any;

  graph_conf = {
    mode : 'activite',
  };

  options = {
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
  };

  onByActivite() {
    this.graph_conf.mode = 'activite';
    this.updateData();
  }

  onByEmploye() {
    this.graph_conf.mode = 'employe';
    this.updateData();
  }
  
  onChangeChantier(chantier : string) {
    this.chantier = chantier;
    this.updateData();
  }
  
  onSelectMonth(month : string) {
    this.month = month;
    this.updateData();
  }

  updateData() {
    if (this.graph_conf.mode == 'activite') {
      this.timeInService.getChantierByActivite(this.chantier, this.month).subscribe(data => {
          this.updateGraphData(data);
      });
    } else {
      this.timeInService.getChantierByEmploye(this.chantier, this.month).subscribe(data => {
          this.updateGraphData(data);
      });
    }
  }

  updateGraphData(data : any) {
    if (this.graph_conf.mode == 'activite') {
      var activites_code = Array.from(new Set(data.map(a => a.ActiviteCode)));
      var activites = Array.from(new Set(data.map(a => a.Activite)));
      this.data = {
        labels: activites,
        codes : activites_code,
        datasets: [{
                  label: 'Heures',
                  data: data.map(a => a.Heures),
                  borderWidth: 2,
                  backgroundColor: '#00A6AA',
                },
        ],
      }
    } else {
      var employes_code = Array.from(new Set(data.map(a => a.EmployeCode)));
      var employes = Array.from(new Set(data.map(a => a.Employe)));
      this.data = {
        labels: employes,
        codes : employes_code,
        datasets: [{
                  label: 'Heures',
                  data: data.map(a => a.Heures),
                  borderWidth: 2,
                  backgroundColor: '#00A6AA',
                },
        ],
      }
    }
    var total = 0;
    data.map(a => total += a.Heures);
    this.total_heures = total;
  }

  updateEmployeDetails($event) {
    var clickedBar = $event[0];
    if (clickedBar) {
      var chantier = this.chantier;
      var month = this.month;
      if (this.graph_conf.mode == 'activite') {
        var activite = this.data.labels[clickedBar._index];
        var activite_code = this.data.codes[clickedBar._index];
        var employeeList = this.timeInService.getEmployeeList(month, chantier, activite);
        var activeModal = this.modalService.open(EmployeeListModalComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.employeeList = employeeList;
        activeModal.componentInstance.chantier = chantier;
        activeModal.componentInstance.activite = activite;
        activeModal.componentInstance.chantier_code = this.chantierMap.get(chantier);
        activeModal.componentInstance.activite_code = activite_code;
        activeModal.componentInstance.month = 'all';
        activeModal.componentInstance.onChangeData.subscribe((data: any) => {
              console.log(data);
              this.updateData();
        });
      } else {
        alert("Pas encore supporté sur cet écran.");
      }
    }
  }
}
