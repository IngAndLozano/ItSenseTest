import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private url = "http://localhost:5041/api";

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = window.localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  login(credentials: any): Observable<any> {
    const url = `${this.url}/usuarios/login`;
    return this.http.post(url, credentials);
  }

  getProducts(): Observable<any> {
    const url = `${this.url}/Productoes`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  getStates(available: boolean | null, defective: boolean | null): Observable<any> {
    let url = `${this.url}/Productoes`;
    if (available != null) {
      url += available ? '/AvailableProducts' : '/UnavailableProducts';
    } else if (defective != null) {
      url += defective ? '/DefectiveProducts' : '/NonDefectiveProducts';
    }
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }

  postProducts(data: any): Observable<any> {
    const url = `${this.url}/Productoes/bulk`;
    return this.http.post(url, data, { headers: this.getAuthHeaders() });
  }

  putProducts(id: number): Observable<any> {
    const url = `${this.url}/Productoes/${id}`;
    const options = { headers: this.getAuthHeaders() };
    return this.http.put(url, {}, options);
  }
}
