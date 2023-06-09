import { NewTime } from './../../models/NewTime';
import { CommonModule } from '@angular/common';
import { TimeService } from './../../services/time.service';
import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/User.model';
import { FormsModule } from '@angular/forms';
import * as moment from 'moment';
import { Timesheet } from 'src/app/models/Timesheet';
import { Observable, interval, map } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit{
  accessToken = localStorage.getItem('token');
  user!: User;
  userName = localStorage.getItem('userName');
  cheguei!: string;
  usuario = 'jailton.mendes@thera.com.br';
  dateTime!: Date;
  timeSheet!: Timesheet;
  newTime!: NewTime;
  startDate!: string;
  startTime!: string;
  startTimeLaunch!: string;
  backTimeLaunch!: string;
  endtime!: string;
  finalTime!: string;
  time!: string;
  tempo = '00:00:00';
  timer: any;
  stopTimer!: boolean;
  dataFormatada = new Date().toISOString();
  horaAtual = new Date().toLocaleTimeString('pt-br', {
    timeZone: 'America/Sao_Paulo',
  });

  dateTime$!: Observable<Date>;



  ss = 0;
  mm = 0;
  hh = 0;

  constructor(

    private timeService: TimeService,
    public loadingController: LoadingController

  ) {
    this.dateTime$ = interval(1000).pipe(map(() => new Date()));
  }

  ngOnInit(): void {
    this.getTimes();

    this.dateTime$.subscribe((dateTime) => {
      this.dateTime = dateTime;
      this.horaAtual = dateTime.toLocaleTimeString('pt-br', {
        timeZone: 'America/Sao_Paulo',
      });
      this.dataFormatada = moment(dateTime, 'America/Sao_Paulo').format('YYYY-MM-DD[T]HH:mm:ss.SSSSSS[Z]');

    });
  }





  async getTimes() {
    this.presentLoading();
    await this.timeService.getTimes(this.accessToken!).subscribe({
      next: (data) => {
        // lógica aqui
        this.timeSheet = data;
          this.dismissLoading();

      },
      error: (error) => {
        // lidar com erros aqui
        console.log('Error: ', error)
          this.dismissLoading();
      },
    });
  }

  start() {
    console.log(this.dataFormatada)
    let date = this.dataFormatada;
    this.timeService.newTime(date).subscribe({
      next: (data) => {
        this.newTime = {
          id: data.id
        }
        console.log('res: ', data)
      },
      error: (error) => {
        console.log('res', error);
      }
    })

    this.startDate = this.dateTime.toLocaleDateString('pt-br');
    this.startTime = this.horaAtual;
    this.cronometro();
  }


  startLunch() {
    this.timeService.updataTime(this.newTime.id!, this.dataFormatada).subscribe({
      next: (data) => {
        console.log('Hora registrada!');
      },
      error: (error) => {
        console.log('error: ', error);
      }
    })

    this.startTimeLaunch = this.horaAtual;
    clearInterval(this.timer);
  }


  endLunch() {
    this.timeService.updataTime(this.newTime.id!, '' ,this.dataFormatada).subscribe({
      next: (dados) => {
        console.log('Hora registrada!');
      },
      error: (error) => {
        console.log(error)
      }
    })
    this.backTimeLaunch = this.horaAtual;
    this.cronometro();
  }

  end() {
    this.timeService.updataTime(this.newTime.id!, '', '', this.dataFormatada).subscribe({
      next: (dados) => {
        console.log('Hora registrada!');
      },
      error: (error) => {
        console.log(error);
      }
    })
    this.endtime = this.horaAtual;
    this.finalTime = this.tempo;
    clearInterval(this.timer);
    // this.clearInputs();
    this.getTimes();
  }


  cronometro() {

    let tempoFormatado = '';

    this.timer = setInterval(() => {
      this.ss++;

      if(this.ss == 60) {
        this.ss = 0;
        this.mm++;
      }

      if(this.mm == 60) {
        this.mm = 0;
        this.hh++
      }

      tempoFormatado = (this.hh < 10 ? '0' + this.hh : this.hh) + ':' + (this.mm < 10 ? '0' + this.mm : this.mm) + ':' + (this.ss < 10 ? '0' + this.ss : this.ss);


      this.tempo = tempoFormatado;

    }, 1000)

  }

  home() {
    location.reload();
  }


  clearInputs() {
    this.startDate = '';
    this.startTime = '';
    this.startTimeLaunch = '';
    this.backTimeLaunch = '';
    this.endtime = '';
    this.finalTime = '';
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 2000
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }
}
