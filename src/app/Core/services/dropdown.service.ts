import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DropdownItem } from '../models/seafarer.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private baseUrl = 'http://176.9.184.190/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getEmployees(): Observable<DropdownItem[]> {
    const params = new HttpParams() // Set Params
      .set('Id', '0')
      .set('text', '')
      .set('Direction', 'ltr')
      .set('InCT', '');

    return this.http.get<DropdownItem[]>(`${this.baseUrl}/POS/FillEmployee`, {
      headers: this.authService.getAuthHeaders(),// Send Header
      params                                     // Send Params
    });
  }

  getVendors(): Observable<DropdownItem[]> {
    const params = new HttpParams()
      .set('Id', '0')
      .set('text', '')
      .set('Direction', 'ltr')
      .set('InCT', '');

    return this.http.get<DropdownItem[]>(`${this.baseUrl}/LegalAffairs/FillVendor`, {
      headers: this.authService.getAuthHeaders(),
      params
    });
  }


}

