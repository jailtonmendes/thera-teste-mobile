import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { error } from 'console';
import { User } from '../models/User.model';
import { LocalstorageService } from './localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class TimeService {

  urlApi = environment.apiUrl;
  accessToken = ''

  constructor(private http: HttpClient, private localStorage: LocalstorageService) {
    this.accessToken = JSON.stringify(this.localStorage.getLocalStorage('token'))
    // this.accessToken = this.localStorage.getLocalStorage('token')
  }


  login(login: Login): Observable<User> {
    let url = this.urlApi + 'Accounts';

    let head = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<User>(url, login, { responseType: 'json', headers: head })

  }


  getTimes(token: string) {
    let url = this.urlApi + 'Timesheet';

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', `application/json`)
        .set('Authorization', `Bearer ${token}`)
    }

    return this.http.get(url, header)
    .pipe(
      map(response => {
        // Transformar a resposta em um formato específico, se necessário
        return response;
      }),
      catchError(error => {
        // Tratar o erro da API
        console.error(error);
        return throwError(() => new Error('Erro ao buscar os timesheets.'));
      })
    );
  }

  startTime(start: string, token: string) {
    let url = this.urlApi + 'Timesheet';

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', `application/json`)
        .set('Authorization', `Bearer ${token}`)
    }

    return this.http.get(url, header)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error(error);
          return throwError(() => new Error('Erro ao cadastrar horário.'));
        })
      );

  }



}
