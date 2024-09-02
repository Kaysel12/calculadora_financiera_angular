import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_URL = "http://localhost:8000/api/token/";
  private tokenKey = "authToken";

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any>{
    return this.httpClient.post<any>(this.AUTH_URL, {username, password}).pipe(
      tap(response => (
        this.setToken(response.access)
      ))
    )
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    if (typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else {
      return null;
    }
  }

  isAuthenticated (): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    return Date.now() < exp;
  }

  logout (): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
