import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken)
    )
  }

  private setToken(response: any) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn*1000);
      localStorage.setItem("fb-token-exp", expDate.toString());
      localStorage.setItem("fb-token", response.idToken)
    } else {
      localStorage.clear();
    }
  }

  get token() {
    const tokenExp = new Date(localStorage.getItem("fb-token-exp")!);
    if (new Date() > tokenExp) {
      this.logout();
      return null;
    }
    return localStorage.getItem("fb-token");
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
