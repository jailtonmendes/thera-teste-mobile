import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Login } from '../models/login.model';
import { Observable, interval, catchError, map, tap, throwError } from 'rxjs';
import { error } from 'console';
import { User } from '../models/User.model';
import { LocalstorageService } from './localstorage.service';
import { NewTime } from '../models/NewTime';
import { Timesheet } from '../models/Timesheet';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  urlApi = environment.apiUrl;
  accessToken = '';


  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService

  ) {
    this.accessToken = this.localStorage.getLocalStorage('token')!;
  }

  login(login: Login): Observable<User> {
    let url = this.urlApi + 'Accounts';
    let head = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<User>(url, login, {
      responseType: 'json',
      headers: head,
    });
  }


  getTimes(token: string): Observable<Timesheet> {
    let url = this.urlApi + 'Timesheet';
    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', `application/json`)
        .set('Authorization', `Bearer ${token}`),
    };

    return this.http.get<Timesheet>(url, header).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Erro ao buscar os times.'));
      })
    );
  }

  newTime(startLunch: string): Observable<NewTime> {
    let url = this.urlApi + 'Timesheet';
    let header = {
      headers: new HttpHeaders()
        .set('Content-Type', `application/json`)
        .set('Authorization', `Bearer ${this.accessToken}`),
    };

    return this.http.post<NewTime>(url, startLunch, header).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Erro ao cadastrar horário.'));
      })
    );
  }


  updataTime(id: number, startLunch?: string, endLunch?: string, end?: string) {
    const url = this.urlApi + `Timesheet/${id}`;
    const header = new HttpHeaders()
      .set('Content-Type', `application/json`)
      .set('Authorization', `Bearer ${this.accessToken}`);
    const body = { startLunch: startLunch, endLunch: endLunch, end: end };

    return this.http.put(url, body, { headers: header }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error('Erro ao cadastrar horário.'));
      })
    );
  }


}
