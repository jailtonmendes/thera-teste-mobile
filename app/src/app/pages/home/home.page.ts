import { TimeService } from './../../services/time.service';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/User.model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {

  user!: User;
  userName = localStorage.getItem('userName');
  cheguei!: string;
  usuario = 'jailton.mendes@thera.com.br';
  // hora: string = moment(new Date()).format("HH:mm");

  now = new Date();
  dateString = this.now.toISOString();


  newDate = new Date();
  formattedDate = this.newDate.toLocaleDateString('pt-BR');

  hora = new Date();
  formattedTime = this.hora.toLocaleTimeString('pt-BR');



  constructor(private timeService: TimeService, private localStorageService:LocalstorageService) {
    // this.userName = JSON.stringify.localStorageService.getLocalStorage('userName');
    this.getTimes();
    console.log('DD', this.dateString)
    console.log('PT', this.formattedDate)
    console.log('Hours', this.formattedTime)
    // console.log('UserModel: ', this.user)
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
    console.log('chegueiiii')
  }


}
