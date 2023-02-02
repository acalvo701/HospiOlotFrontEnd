import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guardia } from '../../entitats/implementacions/Guardia';
import { GuardiaModel } from '../../entitats/implementacions/GuardiaModel';
import { GuardiaModelTreballador } from '../../entitats/implementacions/GuardiaModelTreballador';
import { GuardiaTreballador } from '../../entitats/implementacions/GuardiaTreballador';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  constructor(private http: HttpClient) {
  }

  getNomsEsquemaByIdTreballador(idTreballador: string): Observable<any>{
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/guardiaModelTreballador/getNomsEsquemaByIdTreballador?idTreballador=` + idTreballador, requestOptions);
  }

  getEsquemaByIdTreballadorAndName(idTreballador: string, nomEsquema: string): Observable<any>{
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/guardiaModel/getEsquemaByIdTreballadorAndName?idTreballador=` + idTreballador + `&nomEsquema=` + nomEsquema, requestOptions);
  }

  getAllTreballadors(): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/treballador/getAllTreballadors`, requestOptions);
  }

  getAllCategories(): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/categoria/getAllCategories`, requestOptions);
  }

  getUnitatsByIdTreballador(idTreballador: string): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/unitat/getUnitatsByIdTreballador?idTreballador=`+ idTreballador, requestOptions);
  }

  getAllTorns(): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/torn/getAllTorns`, requestOptions);
  }

  getGuardiesByDayAdmin(data: Date, idTreballador: string): Observable<any> {
    const requestOptions = this.createHeader();
    return this.http.get(`http://${environment.ip}:4000/guardiaAdmin/getGuardiesByDayAdmin?data=` + data+  `&idTreballador=` + idTreballador, requestOptions);
  }

  insertNomEsquemaByIdTreballador(nomEsquema: GuardiaModelTreballador): Observable<any> {
    const requestOptions = this.createHeader();
    const nomEsquemaJSON = JSON.stringify(nomEsquema);

    return this.http.post(`http://${environment.ip}:4000/guardiaModelTreballador/insertNomEsquemaByIdTreballador`, nomEsquemaJSON, requestOptions); 
  }

  insertarGuardiaTreballadorAdmin(guardia: GuardiaTreballador): Observable<any> {

    const requestOptions = this.createHeader();
    const guardiaJSON = JSON.stringify(guardia);

    return this.http.post(`http://${environment.ip}:4000/guardiatreballador/insertarGuardiaTreballadorAdmin`, guardiaJSON, requestOptions);
  }

  insertGuardia(guardia: Guardia): Observable<any> {

    const requestOptions = this.createHeader();
    const guardiaJSON = JSON.stringify(guardia);

    return this.http.post(`http://${environment.ip}:4000/guardiaAdmin/insertGuardia`, guardiaJSON, requestOptions);
  }

  insertEsquemaRow(guardiaModel: GuardiaModel): Observable<any> {

    const requestOptions = this.createHeader();
    const guardiaModelJSON = JSON.stringify(guardiaModel);

    return this.http.post(`http://${environment.ip}:4000/guardiaModel/insertEsquemaRow`, guardiaModelJSON, requestOptions);
  }

  updateEstatGuardiaAdmin(guardia: Guardia): Observable<any> {

    const requestOptions = this.createHeader();
    const guardiaJSON = JSON.stringify(guardia);

    return this.http.post(`http://${environment.ip}:4000/guardiaAdmin/updateEstatGuardiaAdmin`, guardiaJSON, requestOptions);
  }

  updateEsquemaRow(guardiaModel: GuardiaModel): Observable<any> {

    const requestOptions = this.createHeader();
    const guardiaModelJSON = JSON.stringify(guardiaModel);

    return this.http.post(`http://${environment.ip}:4000/guardiaModel/updateEsquemaRow`, guardiaModelJSON, requestOptions);
  }

  generarGuardiesEsquema(diaInici:Date, diaFi: Date, idGMT: string){
    let esquemaJSON = {diaInici: diaInici, diaFi: diaFi, idGuardiaModelTreballador: idGMT}
    const requestOptions = this.createHeader();

    return this.http.post(`http://${environment.ip}:4000/guardiaModel/generarGuardiesEsquema`, esquemaJSON, requestOptions);
  }

  estatEliminatNomEsquema(id: string): Observable<any> {
    let idEsquemaJSON = {id: id}
    const requestOptions = this.createHeader();

    return this.http.post(`http://${environment.ip}:4000/guardiaModelTreballador/estatEliminatNomEsquema`, idEsquemaJSON, requestOptions);
  }

  estatEliminatEsquemaRow(guardiaModel: GuardiaModel): Observable<any> {

    const requestOptions = this.createHeader();
    const guardiaModelJSON = JSON.stringify(guardiaModel);

    return this.http.post(`http://${environment.ip}:4000/guardiaModel/estatEliminatEsquemaRow`, guardiaModelJSON, requestOptions);
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
