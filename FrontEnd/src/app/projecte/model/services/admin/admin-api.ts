import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guardia } from '../../entitats/implementacions/Guardia';
import { GuardiaModel } from '../../entitats/implementacions/GuardiaModel';
import { GuardiaTreballador } from '../../entitats/implementacions/GuardiaTreballador';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  IP: string;

  constructor(private http: HttpClient) {
    this.IP = "172.24.4.61";
  }

  getGuardiesEsquema(): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${this.IP}:4000/guardiaModel/getEsquema`, requestOptions);
  }

  getAllTreballadors(): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${this.IP}:4000/treballador/getAllTreballadors`, requestOptions);
  }

  getAllCategories(): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${this.IP}:4000/categoria/getAllCategories`, requestOptions);
  }

  getAllUnitats(): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${this.IP}:4000/unitat/getAllUnitats`, requestOptions);
  }

  getAllTorns(): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${this.IP}:4000/torn/getAllTorns`, requestOptions);
  }

  getGuardiesByDay(data: Date): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${this.IP}:4000/guardia/getGuardiesByDay?data=` + data, requestOptions);
  }

  insertarGuardiaTreballadorAdmin(guardia: GuardiaTreballador): Observable<any> {

    const requestOptions = this.createHeader();
    const guardiaJSON = JSON.stringify(guardia);

    return this.http.post(`http://${this.IP}:4000/guardiatreballador/insertarGuardiaTreballadorAdmin`, guardiaJSON, requestOptions);
  }

  insertGuardia(guardia: Guardia): Observable<any> {

    const requestOptions = this.createHeader();
    const guardiaJSON = JSON.stringify(guardia);

    return this.http.post(`http://${this.IP}:4000/guardia/insertGuardia`, guardiaJSON, requestOptions);
  }

  updateEstatGuardiaAdmin(guardia: Guardia): Observable<any> {

    const requestOptions = this.createHeader();
    const guardiaJSON = JSON.stringify(guardia);

    return this.http.post(`http://${this.IP}:4000/guardia/updateEstatGuardiaAdmin`, guardiaJSON, requestOptions);
  }

  updateEsquemaRow(guardiaModel: GuardiaModel): Observable<any> {

    const requestOptions = this.createHeader();
    const guardiaModelJSON = JSON.stringify(guardiaModel);

    return this.http.post(`http://${this.IP}:4000/guardiaModel/updateEsquemaRow`, guardiaModelJSON, requestOptions);
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
