import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userInfoService } from '../userInfo/userInfo';

@Injectable({
  providedIn: 'root'
})
export class GuardiaApiService {

  constructor(private http: HttpClient, private userInfo: userInfoService) {
  }

  getHistoryTreballador(): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/guardiatreballador/getHistoryTreballador`, requestOptions);
  }

  getGuardiesByDay(data: string): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/guardia/getGuardiesByDay?data=${data}`, requestOptions);
  }

  getMonthGuardiesByDate(data:string): Observable<any>{
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/guardia/getMonthGuardiesByDate?data=${data}`, requestOptions);
  }

  getAllGuardiesFromTreballador(idTreballador:string = "8"){
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/guardia/getAllGuardiesFromTreballador?idTreballador=${idTreballador}`, requestOptions);
  }

  getMonthGuardiesByDateFromTreballador(data:string, idTreballador:string = "8"){
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/guardia/getMonthGuardiesByDateFromTreballador?data=${data}&idTreballador=${idTreballador}`, requestOptions);
  }

  reservarGuardia(idGuardia: string, idTreballador: string = "8"): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.post(`http://${environment.ip}:4000/guardiatreballador/bookGuardia?idGuardia=${idGuardia}&idTreballador=${idTreballador}`, requestOptions);
  }

  getGuardiesByDayFromTreballador(dia: string, idTreballador: string = "8"): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/guardiatreballador/getGuardiesByDayFromTreballador?dia=${dia}&idTreballador=${idTreballador}`, requestOptions);
  }

  cancelarGuardia(idGuardia: string, idTreballador: string = "8"): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.post(`http://${environment.ip}:4000/guardiatreballador/cancelGuardia?idGuardia=${idGuardia}&idTreballador=${idTreballador}`, requestOptions);
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
