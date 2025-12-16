import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { User, UserLoginDTO, UserRegisterDTO } from '../../../../../models/interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private userService: UserService){
    this.registerForm = new FormGroup({
    name : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });
  }

  register(){
    this.registerForm.markAllAsTouched()
    if(this.registerForm.valid){
      this.userService.register(this.registerForm.value as UserRegisterDTO).subscribe({
        next: (user) => {
          console.log('Usuário registrado!', user.name)
        },
        error: error => console.error('Erro', error)
      });
    }
  }

  isControlValid(controlName: string) : boolean{
    const control = this.registerForm.get(controlName);
    return !!control && control?.invalid && (control.dirty || control?.touched);
  }
}
