import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardiaApiService {
  IP: string;

  constructor(private http: HttpClient) {
    this.IP = "172.24.4.61";
  }

  getHistoryTreballador(idTreballador: number): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${this.IP}:4000/guardiatreballador/getHistoryTreballador?idTreballador=` + idTreballador, requestOptions);
  }

  getGuardiesByDay(data: string): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${this.IP}:4000/guardia/getGuardiesByDay?data=` + data, requestOptions);
  }

  reservarGuardia(idGuardia: string, idTreballador: string = "8"): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.post(`http://${this.IP}:4000/guardiatreballador/bookGuardia?idGuardia=` + idGuardia + '&idTreballador=' + idTreballador, requestOptions);
  }

  getGuardiesByDayFromTreballador(dia: string, idTreballador: string = "8"): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${this.IP}:4000/guardiatreballador/getGuardiesByDayFromTreballador?dia=` + dia + '&idTreballador=' + idTreballador, requestOptions);
  }

  cancelarGuardia(idGuardia: string, idTreballador: string = "8"): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.post('http://172.24.4.61:4000/guardiatreballador/cancelGuardia?idGuardia=' + idGuardia + '&idTreballador=' + idTreballador, requestOptions);
  }

  private createHeader() {
    const header = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization',
    }
    return { headers: new HttpHeaders(header) }
  }
}
