import { Injectable } from '@angular/core';
import { Log } from '../models/log';
import { BehaviorSubject, Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];
  private logSource = new BehaviorSubject<Log>({ id: null, text: null, date: null });
  selectedLog = this.logSource.asObservable();

  //get the highlighted state 
  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   { id: '1', text: 'Generated components', date: new Date('09/07/2018 09:38:54') },
    //   { id: '2', text: 'Added bootstrap', date: new Date('10/07/2018 10:40:01') },
    //   { id: '3', text: 'Added logs component', date: new Date('11/07/2018 08:30:40') },
    // ]
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {

    if(localStorage.getItem('logs')===null){
      this.logs = [];
    }else{
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    //to sort the results by date
    return of(this.logs.sort((a, b)=>{
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    //unshift add in front of array unlike push which send at the back
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }

}
