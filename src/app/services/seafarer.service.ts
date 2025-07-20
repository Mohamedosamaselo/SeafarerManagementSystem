import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Seafarer, SeafarerRequest } from '../models/seafarer.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SeafarerService {
  private baseUrl = 'http://176.9.184.190/api/MarineServices';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllSeafarers(): Observable<any> {
    const params = new HttpParams()
      .set('Direction', 'ltr')
      .set('InCT', '');

    return this.http.get<any>(`${this.baseUrl}/GetAllSeafarers`, {
      headers: this.authService.getAuthHeaders(),
      params
    }).pipe(
      catchError(this.handleError)
    );
  }

  getSeafarerById(id: number): Observable<any> {
    const params = new HttpParams()
      .set('Id', id.toString())
      .set('InCT', '');

    return this.http.get<any>(`${this.baseUrl}/GetSeafarerById`, {
      headers: this.authService.getAuthHeaders(),
      params
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Alternative method to try if the main endpoint fails
  getSeafarerDetails(id: number): Observable<any> {
    const params = new HttpParams()
      .set('SeafarerId', id.toString())
      .set('InCT', '');

    return this.http.get<any>(`${this.baseUrl}/GetSeafarerDetails`, {
      headers: this.authService.getAuthHeaders(),
      params
    }).pipe(
      catchError(this.handleError)
    );
  }

  saveSeafarer(seafarerData: SeafarerRequest): Observable<any> {
    const params = new HttpParams().set('InCT', '');

    return this.http.post<any>(`${this.baseUrl}/SaveSeafarer`, seafarerData, {
      headers: this.authService.getAuthHeaders(),
      params
    }).pipe(
      catchError(this.handleError)
    );
  }

  activateDeactivateSeafarer(id: number, status: number, empId: number): Observable<any> {
    const params = new HttpParams()
      .set('Id', id.toString())
      .set('InCT', '')
      .set('Status', status.toString()) // 1 for active, 2 for inactive
      .set('EmpId', empId.toString());

    return this.http.post<any>(`${this.baseUrl}/ActivateAndInActivateSeafarer`, null, {
      headers: this.authService.getAuthHeaders(),
      params
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 404:
          errorMessage = 'The requested resource was not found. Please check if the seafarer exists.';
          break;
        case 401:
          errorMessage = 'Unauthorized access. Please login again.';
          break;
        case 403:
          errorMessage = 'Access forbidden. You do not have permission to perform this action.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    
    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}

