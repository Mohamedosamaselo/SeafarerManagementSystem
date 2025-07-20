import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthToken } from '../models/seafarer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://176.9.184.190';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check for existing token in localStorage
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      this.tokenSubject.next(savedToken);
    }
  }

  login(username: string, password: string): Observable<AuthToken> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = `username=${username}&Password=${password}&grant_type=password&mobileid=9cb2fcb2de1c71e8`;

    return this.http.post<AuthToken>(`${this.baseUrl}/token`, body, { headers })
      .pipe(
        tap(response => {
          if (response.access_token) {
            localStorage.setItem('auth_token', response.access_token);
            this.tokenSubject.next(response.access_token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}

