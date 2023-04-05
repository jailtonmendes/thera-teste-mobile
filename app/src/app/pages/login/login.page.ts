import { User } from './../../models/User.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TimeService } from 'src/app/services/time.service';
import { Login } from 'src/app/models/login.model';
import { error } from 'console';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  usuario = 'jailton.mendes@thera.com.br';
  senha = '123456';
  loginModel!: Login;
  user!: User;

  constructor(
    private router: Router,
    private timeService: TimeService,
    private localStorage: LocalstorageService
    ) { }

  ngOnInit() {
  }

  login() {

    this.loginModel = {
      userID: this.usuario,
      accessKey: this.senha,
      grantType: 'password'
    }


      this.timeService.login(this.loginModel)
      .subscribe({
        next: response => {
          // Tratar a resposta da API aqui
          console.log(response);
          this.user = response;
          localStorage.setItem('token', response.accessToken)
          this.localStorage.setLocalStorage('accessToken', this.user.accessToken)
          this.localStorage.setLocalStorage('userName', this.user.name)
          this.router.navigate(['/home'])
        },
        error: err => {
          // Tratar o erro da API aqui
          console.error(err);
          if (err.status === 401) {
            // Redirecionar para a página de login novamente
            console.log('erro: ', err)
          } else {
            // Exibir uma mensagem de erro genérica para o usuário
            alert('Dados incorretos!')
          }
        }
      });

  }

}
