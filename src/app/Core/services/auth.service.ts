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
      'Content-Type': 'application/x-www-form-urlencoded' //application/x-www-form-urlencoded =>  [common header for Auth Request]
    });

    const body = `username=${username}&Password=${password}&grant_type=password&mobileid=9cb2fcb2de1c71e8`;

    return this.http.post<AuthToken>(`${this.baseUrl}/token`, body, { headers })
      .pipe(
        tap(response => {
          if (response.access_token) {// check on response
            localStorage.setItem('auth_token', response.access_token);// set Token in localStorage
            this.tokenSubject.next(response.access_token);// update TokenSbject with the latest value
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');// remove Token
    this.tokenSubject.next(null);// update tokenSubject with null
  }

  getToken(): string | null {
    return this.tokenSubject.value;// get the current tokenValue or null if it doesnot existed
  }

  isAuthenticated(): boolean {
    return !!this.getToken();// return true if it existed , false if it doesnot exist
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();       // Get Token
    return new HttpHeaders({             // Create HttpHeader Object [Immutable object Hold Http Request Header]
      'Authorization': `Bearer ${token}`,// BearerToken Satandar for jwt
      'Content-Type': 'application/json' // tell server that i will sinding json data
    });
  }

}

