import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreballadorApiService {
  IP: string;

  constructor(private http: HttpClient) {
    this.IP = environment.ip;
  }

  login(dni:string,password:string): Observable<any> {
    const requestOptions = this.createHeader();

    let userData = {dni: dni, password:password}
    return this.http.post(`http://${this.IP}:4000/treballador/login`, userData,requestOptions);
  }

  private createHeader() {
    const token = localStorage.getItem('SGrefreshToken');
    
    const header = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization',
      'Authorization': `Bearer ${token}`
    }
    return { headers: new HttpHeaders(header) }
  }
}
