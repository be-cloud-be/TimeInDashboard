import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() onChangeData = new EventEmitter<any>(true);

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
    var emps:string[] = Array.from(this.employeeSelected);
    for (var i = 0; i < emps.length; i++) {
      console.log(emps[i]);
      this.timeInService.changeChantier(this.month, emps[i], this.activite_code, this.chantier_code, this.new_chantier)
        .subscribe(data => {
          this.chantier_code = this.new_chantier;
          this.onChangeData.emit('Chantier changé de ' + this.chantier_code +' à ' + this.new_chantier);
        });
    }
  }
  
  changeActivite() {
    var emps:string[] = Array.from(this.employeeSelected);
    for (var i = 0; i < emps.length; i++) {
      console.log(emps[i]);
      this.timeInService.changeActivite(this.month, emps[i], this.chantier_code, this.activite_code, this.new_activite)
        .subscribe(data => {
          this.activite_code = this.new_activite;
          this.onChangeData.emit('Activité changée de ' + this.activite_code + ' à ' + this.new_activite);
        });
    }
  }
  
  log_details() {
    console.log(this.employeeSelected);
    console.log(this.new_chantier);
    console.log(this.new_activite);
  }

}
