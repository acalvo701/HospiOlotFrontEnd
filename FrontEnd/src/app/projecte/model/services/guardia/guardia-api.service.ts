import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardiaApiService {

  constructor(private http: HttpClient) { }
  getHistoryTreballador(idTreballador: number):Observable<any> {
    const requestOptions = this.createHeader();
    const json = {idTreballador: 8};
    return this.http.get('http://172.24.4.61:4000/guardiatreballador/getHistoryTreballador?idTreballador='+idTreballador, requestOptions);
  }
  private createHeader() {
    const header = {
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Accept-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization',
    }
    return { headers: new HttpHeaders(header)}
}
}
