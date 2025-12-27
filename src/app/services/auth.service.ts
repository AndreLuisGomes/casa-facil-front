import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserLoginDTO } from '../../models/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  name: string | null;
  token: string | null;
  role: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = "http://localhost:8080"

  constructor(private http: HttpClient, private router: Router) {
  }

  currentUser = signal<AuthResponse | null>(this.getUserFromStorage());

  isLoggedIn = computed(() => !!this.currentUser());

  currentName = computed(() => this.currentUser()?.name ?? null);

  // Função para login

  login(userLogin: UserLoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/auth/login`, userLogin).pipe(
      tap(response => {
        localStorage.setItem('user_data', JSON.stringify(response));
        this.currentUser.set({...response});
        this.router.navigate(['/home']);
      })
    )
  }

  // Função para registrar

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/auth/register`, user)
      .pipe(
        tap((session) => {
          localStorage.setItem('user_data', JSON.stringify(session))
          this.currentUser.set(session)
        }
        )
      )
  }

  logout() {
    localStorage.removeItem('user_data');
    this.currentUser.set(null);
  }

  getUserFromStorage(): AuthResponse | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }
}
