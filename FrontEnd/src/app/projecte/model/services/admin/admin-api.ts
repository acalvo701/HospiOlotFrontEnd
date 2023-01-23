import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  constructor(private http: HttpClient) { }

  getAllTreballadors():Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get('http://172.24.4.61:4000/treballador/getAllTreballadors', requestOptions);
  }

  getGuardiesByDay(data:Date):Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get('http://172.24.4.61:4000/guardia/getGuardiesByDay?data='+data, requestOptions);
  }

  insertarGuardiaTreballadorAdmin(idTreballador:string, idGuardia:string, estat:string):Observable<any> {
    const requestOptions = this.createHeader();
    let json = {};
    return this.http.post(`http://172.24.4.61:4000/guardiatreballador/insertarGuardiaTreballadorAdmin`, json, requestOptions);
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
