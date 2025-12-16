import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { User, UserLoginDTO } from '../../../../../models/interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  invalidLogin : boolean = false;
  loginForm : FormGroup;

  constructor(private userService : UserService) {
    this.loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  }

  login() {
    this.invalidLogin = false;
    this.loginForm.markAllAsTouched()
    if(this.loginForm.valid){
      this.userService.login(this.loginForm.value as UserLoginDTO).subscribe({
        next: (user) => {
          localStorage.clear(),
          console.log('Logando usuário: ', user.name , 'e Token: ', user.token),
          localStorage.setItem('token', user.token),
          localStorage.setItem('name', user.name)
        },
        error: (error) => {console.error('Erro', error),
          this.invalidLogin = true
        }
      });
    }
  }


}
