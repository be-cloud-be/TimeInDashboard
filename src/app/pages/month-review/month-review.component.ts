import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TimeInService, ISummaryLine } from '../../@core/data/timein.service';

@Component({
  selector: 'month-review',
  templateUrl: './month-review.component.html',
  styleUrls: ['./month-review.component.scss']
})
export class MonthReviewComponent implements OnInit {

  month : string;
  monthList : string[];

  constructor(private timeInService : TimeInService) {
    this.timeInService.getMonthList().subscribe(data => {this.monthList = data});
    this.timeInService.getCurrentMonth().subscribe(data => {this.month = data;this.updateData();});
  }

  ngOnInit() {
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
      /*employe_code: {
        title: '',
        type: 'string',
      },*/
      employe: {
        title: 'Employé',
        type: 'string',
        width: '200px',
      },
      Mois: {
        title: 'Mois',
        type: 'string',
      },
      Heures: {
        title: 'Heures',
        type: 'number',
      },
      HeuresSupp: {
        title: 'Heures Supp',
        type: 'number',
      },
      Chomage: {
        title: 'Chômage',
        type: 'number',
      },
      SansSolde: {
        title: 'Sans Solde',
        type: 'number',
      },
      Maladie: {
        title: 'Maladie',
        type: 'number',
      },
      Conge: {
        title: 'Congé',
        type: 'number',
      },
      TotalHours: {
        title: 'Total',
        type: 'number',
      },
    },
  };

  settingsTotal = {
    hideHeader : true,
    hideSubHeader : true,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      /*employe_code: {
        title: '',
        type: 'string',
      },*/
      employe: {
        title: '',
        type: 'string',
        width: '200px',
      },
      Mois: {
        title: 'Mois',
        type: 'string',
      },
      Heures: {
        title: 'Heures',
        type: 'number',
      },
      HeuresSupp: {
        title: 'Heures Supp',
        type: 'number',
      },
      Chomage: {
        title: 'Chômage',
        type: 'number',
      },
      SansSolde: {
        title: 'Sans Solde',
        type: 'number',
      },
      Maladie: {
        title: 'Maladie',
        type: 'number',
      },
      Conge: {
        title: 'Congé',
        type: 'number',
      },
      TotalHours: {
        title: 'Total',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceTotal: LocalDataSource = new LocalDataSource();
  
  updateData() {
    var data = this.timeInService.getMonthSummary(this.month).subscribe(data => {
      this.source.load(data);
      var total = {
        "employe_code": "",
        "employe": "",
        "Mois": "",
        "Heures": 0,
        "HeuresSupp": 0,
        "Chomage": 0,
        "SansSolde": 0,
        "Maladie": 0,
        "Conge": 0,
        "TotalHours": 0
      }
      
      for (var i = 0; i < data.length; i++) {
        var line = data[i];
        total.Mois = line.Mois;
        total.Heures += line.Heures;
        total.HeuresSupp += line.HeuresSupp;
        total.Chomage += line.Chomage;
        total.SansSolde += line.SansSolde;
        total.Maladie += line.Maladie;
        total.Conge += line.Conge;
        total.TotalHours += line.TotalHours;
      }
      total.Heures = Number(total.Heures.toFixed(2));
      total.HeuresSupp = Number(total.HeuresSupp.toFixed(2));
      total.Chomage = Number(total.Chomage.toFixed(2));
      total.SansSolde = Number(total.SansSolde.toFixed(2));
      total.Maladie = Number(total.Maladie.toFixed(2));
      total.Conge = Number(total.Conge.toFixed(2));
      total.TotalHours = Number(total.TotalHours.toFixed(2));
    
      this.sourceTotal.load([total]);
    });
  }
}
