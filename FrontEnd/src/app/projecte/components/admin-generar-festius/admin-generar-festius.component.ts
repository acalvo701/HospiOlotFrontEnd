import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { GuardiaModelTreballador } from '../../model/entitats/implementacions/GuardiaModelTreballador';
import { AdminApiService } from '../../model/services/admin/admin-api';
import { userInfoService } from '../../model/services/userInfo/userInfo';

@Component({
  selector: 'app-admin-generar-festius',
  templateUrl: './admin-generar-festius.component.html',
  styleUrls: ['./admin-generar-festius.component.scss']
})
export class AdminGenerarFestiusComponent {
  generarGuardiesForm: FormGroup;
  valid:any;
  error:any;
  csvRecords: any = [];
  csvExemple: string = "05-02-2023;12-02-2023;19-02-2023";
  esquemes: Array<GuardiaModelTreballador> = [];
  constructor(private ngxCsvParser: NgxCsvParser, private fb: FormBuilder, private httpClient: AdminApiService, private uInfo: userInfoService) {
    this.getNomsEsquemaByIdTreballador();
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.ngxCsvParser.parse(files[0], { header: false, delimiter: ';', encoding: 'utf8' })
      .pipe().subscribe({
        next: (result): void => {
          this.csvRecords = this.transformarResultat(result);
          if (this.csvRecords == null) {

          }

        },
        error: (error: NgxCSVParserError): void => {
         
        }
      });
  }

  transformarResultat(result: any) {

    let dates = new Array<string>();
    try {

      result[0].forEach((element: any) => {
        var dateMomentObject = moment(element, "DD-MM-YYYY");
        var dateObject = dateMomentObject.toDate();
        dates.push(moment(dateObject).format('YYYY-MM-DD'));

      });
    } catch (RangeError) {
      return null;
    }

    return dates;
  }

  download_example_csv() {

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(this.csvExemple);
    hiddenElement.download = 'Exemple_Festius.csv';
    hiddenElement.click();
  }

  ngOnInit(): void {
    this.generarGuardiesForm = this.fb.group({
      csvFitxer: ['', Validators.required],
      nomEsquema: ['', Validators.required]
    })
  }

  getNomsEsquemaByIdTreballador() {
    this.httpClient.getNomsEsquemaByIdTreballador(this.uInfo.getUser().id).
      subscribe(
        {
          next: (response) => {
            this.esquemes = response.esquema;
          },
          //per veure l'error que retorna de l'api
          error: () => {

          },
          complete: () => {

          },
        });
  }

  generarGuardiesCSV() {
    const selectFormulari: any = document.getElementById(`selectFormulari`);
    let idEsquema = selectFormulari.options[selectFormulari.selectedIndex].id;
    let arrayDatesFestives = this.csvRecords;
    this.httpClient.generarGuardiesCSV(idEsquema,arrayDatesFestives).
      subscribe(
        {
          next: (response: any) => {
            this.valid = response.message;

          },
          //per veure l'error que retorna de l'api
          error: (err: any) => {
            this.error = err.error;

          },
          complete: () => {

          },
        });
    this.generarGuardiesForm.reset();
  }
  

}


