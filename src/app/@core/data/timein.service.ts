import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import { environment } from '../../../environments/environment';

const url = environment.server;

console.log('use server' + url);

export interface IEmployeeLine {
    "EmployeCode": string,
    "Employe": string
}

export interface IChantierLine {
    "ChantierCode": string
    "Chantier": string
}

export interface IActiviteLine {
    "ActiviteCode": string
    "Activite": string
}

export interface IEmployeeHoursLine {
    "EmployeCode": string,
    "Employe": string,
    "Heures": number
}

export interface IMonthDetailsLine {
    "ChantierCode": string,
    "Chantier": string,
    "ActiviteCode": string,
    "Activite": string,
    "Heures": number
}

export interface ISummaryLine {
    "EmployeCode": string,
    "Employe": string,
    "Mois": string,
    "Heures": number,
    "HeuresSupp": number,
    "Chomage": number,
    "SansSolde": number,
    "Maladie": number,
    "Conge": number,
    "TotalHours": number
}

export interface IDashboardHoursSummaryLine {
    "Mois": string,
    "Heures": number,
    "HeuresSupp": number,
    "Chomage": number,
    "SansSolde": number,
    "Maladie": number,
    "Conge": number,
    "TotalHours": number
}

@Injectable()
export class TimeInService {

    constructor(private http: Http) {
    }

    getMonthList(): Observable<string[]> {
        return Observable.of(['2018-01','2018-02','2018-03','2018-04','2018-05','2018-06','2018-07','2018-08','2018-09','2018-10','2018-11','2018-12',
                              '2019-01','2019-02','2019-03','2019-04','2019-05','2019-06','2019-07','2019-08','2019-09','2019-10','2019-11','2019-12']);
    }

    getCurrentMonth(): Observable<string> {
        var d = new Date();
        return Observable.of(d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth()+1) : d.getMonth()+1));
    }

    getMonthSummary(month : string) {
        return this.http.get(`${url}/month_summary?month=${month}`)
            .map((response: Response) => {
                 return <ISummaryLine[]>response.json();
             })
             .catch(this.handleError);
    }

    getDashboardHoursSummary() {
        return this.http.get(`${url}/dashboard_month_hours_summary`)
            .map((response: Response) => {
                 return <IDashboardHoursSummaryLine[]>response.json();
             })
             .catch(this.handleError);
    }

    getEmployees() {
        return this.http.get(`${url}/employees`)
            .map((response: Response) => {
                 return <IEmployeeLine[]>response.json();
             })
             .catch(this.handleError);
    }

    getMonthDetails(month : string, employe : string) {
        return this.http.get(`${url}/month_details?month=${month}&code=${employe}`)
            .map((response: Response) => {
                 return <IMonthDetailsLine[]>response.json();
             })
             .catch(this.handleError);
    }

    getEmployeeList(month : string, chantier : string, activite : string) {
        return this.http.get(`${url}/month_employee_details?month=${month}&chantier=${chantier}&activite=${activite}`)
            .map((response: Response) => {
                 return <IEmployeeHoursLine[]>response.json();
             })
             .catch(this.handleError);
    }

    getChantiers() {
        return this.http.get(`${url}/chantiers`)
            .map((response: Response) => {
                 return <IChantierLine[]>response.json();
             })
             .catch(this.handleError);
    }

    getActivites() {
        return this.http.get(`${url}/activites`)
            .map((response: Response) => {
                 return <IActiviteLine[]>response.json();
             })
             .catch(this.handleError);
    }

    getChantierByActivite(chantier : string) {
        return this.http.get(`${url}/chantier_activites?chantier=${chantier}`)
            .map((response: Response) => {
                 return <IMonthDetailsLine[]>response.json();
             })
             .catch(this.handleError);
    }

    changeChantier(month: string, employe_code:string, activite_code: string, from_code: string, to_code: string) {
        return this.http.patch(`${url}/change_chantier?month=${month}&employe_code=${employe_code}&activite_code=${activite_code}&from_code=${from_code}&to_code=${to_code}`, {})
            .map((response: Response) => {
                 return response.json();
             })
             .catch(this.handleError);
    }

    changeActivite(month: string, employe_code:string, chantier_code: string, from_code: string, to_code: string) {
        return this.http.patch(`${url}/change_activite?month=${month}&employe_code=${employe_code}&chantier_code=${chantier_code}&from_code=${from_code}&to_code=${to_code}`, {})
            .map((response: Response) => {
                 return response.json();
             })
             .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.status + '-' + error.statusText);
    }
}
