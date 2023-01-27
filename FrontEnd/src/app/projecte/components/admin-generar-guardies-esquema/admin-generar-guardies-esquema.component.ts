import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Subscription, take, throwError } from 'rxjs';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { GuardiaModel } from '../../model/entitats/implementacions/GuardiaModel';
import { AdminApiService } from '../../model/services/admin/admin-api';

@Component({
  selector: 'app-admin-generar-guardies-esquema',
  templateUrl: './admin-generar-guardies-esquema.component.html',
  styleUrls: ['./admin-generar-guardies-esquema.component.scss']
})
export class AdminGenerarGuardiesEsquemaComponent {
  generarGuardiesForm: FormGroup;

  guardies: Array<Guardia>;
  guardiesEsquema: Array<GuardiaModel>;

  subscription!: Subscription[];
  error: string;
  valid: string;

  constructor(private httpClient: AdminApiService, private fb: FormBuilder) {
    this.subscription = new Array<Subscription>();
    this.getGuardiesEsquema();
  }

  ngOnInit(): void {
    this.generarGuardiesForm = this.fb.group({
      setmanes: ['', Validators.required],
      data: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => {
      s.unsubscribe();
    });
  }
  generarGuardiesEsquema() {
    let dates = this.diumenges(this.generarGuardiesForm.get("data")?.value, this.generarGuardiesForm.get("setmanes")?.value);    
    this.guardiesEsquema.forEach((g) => {
      dates.forEach((d) => {
        let generarGuardia = new Guardia('', "2024-01-02", g.categoria, g.estat, g.torn, g.unitat, g.numeroPlaces);
        this.subscription.push(this.httpClient.insertGuardia(generarGuardia).
          pipe(take(1), catchError((err: any) => {
            return throwError(() => new Error("Error d'API"))
          }))
          .subscribe(
            {
              next: (response) => {
                this.valid = response.message;
              },
              //per veure l'error que retorna de l'api
              error: (err: any) => {
                this.error = err.error;
              },
              complete: () => {

              },
            }));
      })
      this.generarGuardiesForm.reset();
    })
  }




  diumenges(data: string, num: string) {
    let entrar: boolean = true;
    let dataEntrada: Date = new Date(data);
    let dates = new Array<string>();

    if (dataEntrada.getDay() == 0 && entrar == true) {
      dataEntrada.setDate(dataEntrada.getDate() - 1);
      entrar = false;
    }
    for (let index = 0; index <= +num; index++) {
      let diumenges = new Date(
        dataEntrada.setDate(
          dataEntrada.getDate() - dataEntrada.getDay() + 7
        )
      );
      dates.push(this.dateToString(diumenges));
      diumenges = diumenges;
    }
    return dates;
  }

  getGuardiesEsquema() {
    this.subscription.push(this.httpClient.getGuardiesEsquema().
      subscribe(
        {
          next: (response) => {
            console.log(response);
            this.guardiesEsquema = response;
          },
          //per veure l'error que retorna de l'api
          error: () => {

          },
          complete: () => {

          },
        }));
  }
  dateToString (dateString:Date) :string {
    return dateString.toLocaleString();   
    
    }
}
