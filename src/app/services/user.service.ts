import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserLoginDTO, UserRegisterDTO, UserSession } from '../../models/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL: string = "http://localhost:8080/auth";

  constructor(private client: HttpClient) {

  }

  login(user: UserLoginDTO) : Observable<UserSession> {
    return this.client.post<UserSession>(this.apiURL + `/login`, user);
  }

  register(user: UserRegisterDTO): Observable<User> {
    return this.client.post<User>(this.apiURL + `/register`, user);
  }
}
