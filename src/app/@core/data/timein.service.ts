import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

const url = "http://192.168.1.35:4201";

export interface IEmployeeLine {
    "employe_code": string,
    "employe": string
}

export interface IMonthDetailsLine {
    "Chantier": string,
    "Activite": string,
    "Heures": number
}

export interface ISummaryLine {
    "employe_code": string,
    "employe": string,
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
        return Observable.of(['2018-01','2018-02','2018-03','2018-04','2018-05','2018-06','2018-07','2018-08','2018-09','2018-10','2018-11','2018-12']);
    }
    
    getCurrentMonth(): Observable<string> {
        return Observable.of('2018-05');
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
    
    private handleError(error: Response) {
         return Observable.throw(error.statusText);
    }
}
