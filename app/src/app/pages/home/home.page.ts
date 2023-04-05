import { CommonModule } from '@angular/common';
import { TimeService } from './../../services/time.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/User.model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage {

  user!: User;
  userName = localStorage.getItem('userName');
  cheguei!: string;
  usuario = 'jailton.mendes@thera.com.br';
  dateTime!: Date;

  dataInicio!: string;
  horaInicio!: string;
  horaAlmoco!: string;
  horaVoltaAlmoco!: string;
  horaFim!: string;


  constructor(private timeService: TimeService, private localStorageService:LocalstorageService) {
    // this.userName = JSON.stringify.localStorageService.getLocalStorage('userName');
    this.getTimes();

    this.timeService.dateTime$.subscribe(dateTime => {
      this.dateTime = dateTime
    })
  }


  getTimes() {
    this.userName = localStorage.getItem('userName');
    const token = localStorage.getItem('accessToken');

    this.timeService.getTimes(token!).subscribe({
      next: data => {
        // lógica aqui
        console.log('Data: ', data)
      },
      error: error => {
        // lidar com erros aqui
        console.log('Error: ', error)
      },
      complete: () => {
        // lidar com a conclusão aqui
      }
    });
  }


  startTime() {
    this.dataInicio = this.dateTime.toLocaleDateString("pt-br");
    this.horaInicio = this.dateTime.toLocaleTimeString("pt-br", {timeZone: "America/Sao_Paulo"})
    console.log('chegueiiii')
  }

  startAlmoco() {
    this.horaAlmoco = this.dateTime.toLocaleTimeString("pt-br", {timeZone: "America/Sao_Paulo"})
  }

  backAlmoco() {
    this.horaVoltaAlmoco = this.dateTime.toLocaleTimeString("pt-br", {timeZone: "America/Sao_Paulo"})
  }

  hourEnd() {
    this.horaFim = this.dateTime.toLocaleTimeString("pt-br", {timeZone: "America/Sao_Paulo"})
  }


}
