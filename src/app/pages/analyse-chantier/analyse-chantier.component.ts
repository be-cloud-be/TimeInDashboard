import { Component, OnInit } from '@angular/core';
import { TimeInService, IChantierLine } from '../../@core/data/timein.service';
import { Observable } from "rxjs/Observable";
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

  constructor(private timeInService : TimeInService, private theme: NbThemeService, private modalService: NgbModal) { 
    this.chantierList = this.timeInService.getChantiers();
  }

  onChangeChantier(chantier : string) {
    this.chantier = chantier;
    this.updateData();
  }

  ngOnInit() {
  }

  total_heures : number;

  data : any;

  graph_conf = {
  };

  options = {
  };

  updateData() {
    this.timeInService.getChantierByActivite(this.chantier).subscribe(data => {
        this.updateGraphData(data);
    });
  }

  updateGraphData(data : any) {
    var activites = Array.from(new Set(data.map(a => a.Activite)));
    this.data = {
      labels: activites,
      datasets: [{
                label: 'Heures',
                data: data.map(a => a.Heures),
                borderWidth: 2,
                backgroundColor: '#00A6AA',
              },
      ],
    }
    var total = 0;
    data.map(a => total += a.Heures);
    this.total_heures = total;
  }
  
  updateEmployeDetails($event) {
    var clickedBar = $event[0];
    if (clickedBar) {
      var chantier = this.chantier;
      var activite = this.data.labels[clickedBar._index];
      var employeeList = this.timeInService.getEmployeeList('all', chantier, activite);
      var activeModal = this.modalService.open(EmployeeListModalComponent, { size: 'lg', container: 'nb-layout' });
      activeModal.componentInstance.employeeList = employeeList;
      activeModal.componentInstance.chantier = chantier;
      activeModal.componentInstance.activite = activite;
      activeModal.componentInstance.month = 'all';
    }
  }
}
