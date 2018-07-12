import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { TimeInService, IEmployeeLine, IChantierLine, IActiviteLine, IEmployeeHoursLine } from '../../../@core/data/timein.service';

@Component({
  selector: 'employee-list-modal',
  templateUrl: './employee-list-modal.component.html',
  styleUrls: ['./employee-list-modal.component.scss']
})
export class EmployeeListModalComponent implements OnInit {

  @Input() employeeList : Observable<IEmployeeLine[]>;
  
  employeeSelected : any;
  
  @Input() chantier_code : string;
  @Input() activite_code : string;
  @Input() chantier : string;
  @Input() activite : string;
  @Input() month : string;

  chantiers : Observable<IChantierLine[]>;
  activites : Observable<IActiviteLine[]>;
  
  new_chantier : string;
  new_activite : string;

  constructor(private timeInService : TimeInService) {
    this.employeeSelected = new Set();
    this.chantiers = this.timeInService.getChantiers();
    this.activites = this.timeInService.getActivites();
  }

  ngOnInit() {
  }
  
  selectEmployee(event) {
    if(event.target.checked) {
      this.employeeSelected.add(event.target.defaultValue);
    } else {
      this.employeeSelected.delete(event.target.defaultValue);
    }
  }
  
  onChangeChantier(chantier : string) {
    this.new_chantier = chantier;
  }
  
  onChangeActivite(activite : string) {
    this.new_activite = activite;
  }
  
  changeChantier() {
    var emps = Array.from(this.employeeSelected);
    for (var i = 0; i < emps.length; i++) {
      console.log(emps[i]);
      this.timeInService.changeChantier(this.month, emps[i], this.activite_code, this.chantier_code, this.new_chantier)
        .subscribe(data => {
          console.log(data);
        });
    }
  }
  
  changeActivite() {
    console.log(this.employeeSelected);
    console.log(this.activite_code);
    console.log(this.new_activite);
    console.log(this.month);
  }
  
  log_details() {
    console.log(this.employeeSelected);
    console.log(this.new_chantier);
    console.log(this.new_activite);
  }

}
