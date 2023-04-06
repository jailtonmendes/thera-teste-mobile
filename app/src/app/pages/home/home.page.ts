import { NewTime } from './../../models/NewTime';
import { CommonModule } from '@angular/common';
import { TimeService } from './../../services/time.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/User.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  user!: User;
  userName = localStorage.getItem('userName');
  cheguei!: string;
  usuario = 'jailton.mendes@thera.com.br';
  dateTime!: Date;
  newTime!: NewTime;
  dataInicio!: string;
  horaInicio!: string;
  horaAlmoco!: string;
  horaVoltaAlmoco!: string;
  horaFim!: string;
  tempoFinal!: string;
  tempoFinall!: string;
  time!: string;
  tempo = null;
  timer: any;
  stopTimer!: boolean;
  dataFormatada = new Date().toISOString();
  horaAtual = new Date().toLocaleTimeString('pt-br', {
    timeZone: 'America/Sao_Paulo',
  });

  ss = 0;
  mm = 0;
  hh = 0;

  constructor(

    private timeService: TimeService,

  ) {

    this.getTimes();

    this.timeService.dateTime$.subscribe((dateTime) => {
      this.dateTime = dateTime;
      this.horaAtual = dateTime.toLocaleTimeString('pt-br', {
        timeZone: 'America/Sao_Paulo',
      });
      this.dataFormatada = dateTime.toISOString();
    });
  }


  getTimes() {
    const token = localStorage.getItem('accessToken');

    this.timeService.getTimes().subscribe({
      next: (data) => {
        // lógica aqui
        console.log('Data: ', data);
      },
      error: (error) => {
        // lidar com erros aqui
        console.log('Error: ', error);
      },
      complete: () => {
        // lidar com a conclusão aqui
      },
    });
  }

  startTime() {

    this.timeService.newTime(this.dataFormatada).subscribe({
      next: (data) => {
        this.newTime = {
          id: data.id
        }
        console.log('res', data);
        console.log('this.newTime: ', this.newTime)
      },
      error: (error) => {
        console.log('res', error);
      }
    })

    this.dataInicio = this.dateTime.toLocaleDateString('pt-br');
    this.horaInicio = this.horaAtual;
    this.cronometro();
  }


  startAlmoco() {

    console.log(this.newTime.id)
    console.log(this.dataFormatada)
    this.timeService.updataTime(this.newTime.id!, this.dataFormatada).subscribe({
      next: (data) => {
        console.log('update', data);
      },
      error: (error) => {
        console.log('error: ', error);
      }
    })

    this.horaAlmoco = this.horaAtual;
    clearInterval(this.timer);
  }


  backAlmoco() {
    this.timeService.updataTime(this.newTime.id!, '' ,this.dataFormatada).subscribe({
      next: (dados) => {
        console.log(dados)
      },
      error: (error) => {
        console.log(error)
      }
    })
    this.horaVoltaAlmoco = this.horaAtual;
    this.cronometro();
  }

  hourEnd() {
    this.timeService.updataTime(this.newTime.id!, '', '', this.dataFormatada).subscribe({
      next: (dados) => {
        console.log(dados)
      },
      error: (error) => {
        console.log(error);
      }
    })
    this.horaFim = this.horaAtual;
    this.tempoFinal = this.tempoFinall;
    clearInterval(this.timer);
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

      // adicionando zero na frente da this.horaAlmoco, caso hora seja menor que 10
      tempoFormatado = (this.hh < 10 ? '0' + this.hh : this.hh) + ':' + (this.mm < 10 ? '0' + this.mm : this.mm) + ':' + (this.ss < 10 ? '0' + this.ss : this.ss);


      this.tempoFinall = tempoFormatado;

    }, 1000)


  }
}
