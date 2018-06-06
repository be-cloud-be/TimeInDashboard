import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { TimeInService, IEmployeeLine, IEmployeeHoursLine } from '../../../@core/data/timein.service';

@Component({
  selector: 'employee-list-modal',
  templateUrl: './employee-list-modal.component.html',
  styleUrls: ['./employee-list-modal.component.scss']
})
export class EmployeeListModalComponent implements OnInit {

  @Input() employeeList : Observable<IEmployeeLine[]>;

  constructor() { }

  ngOnInit() {
  }

}
