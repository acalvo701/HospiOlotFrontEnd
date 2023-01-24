import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../model/entitats/implementacions/Categoria';
import { Guardia } from '../../model/entitats/implementacions/Guardia';
import { Torn } from '../../model/entitats/implementacions/Torn';
import { Unitat } from '../../model/entitats/implementacions/Unitat';
import { AdminApiService } from '../../model/services/admin/admin-api';

@Component({
  selector: 'app-admin-crear-guardia',
  templateUrl: './admin-crear-guardia.component.html',
  styleUrls: ['./admin-crear-guardia.component.scss']
})
export class AdminCrearGuardiaComponent implements OnInit {
  crearGuardiaForm: FormGroup;

  categories: Array<Categoria> = [];
  unitats: Array<Unitat> = [];
  torns: Array<Torn> = [];

  constructor(private httpClient: AdminApiService, private fb: FormBuilder) {

    this.httpClient.getAllCategories().subscribe(
      response => {
        console.log(response);
        this.categories = response.categories;
      }
    )

    this.httpClient.getAllUnitats().subscribe(
      response => {
        console.log(response);
        this.unitats = response.unitats;
      }
    )

    this.httpClient.getAllTorns().subscribe(
      response => {
        console.log(response);
        this.torns = response.torns;
      }
    )
  }

  ngOnInit(): void {
    this.crearGuardiaForm = this.fb.group({
      categoria: ['', Validators.required],
      unitat: ['', Validators.required],
      torn: ['', Validators.required],
      dataGuardia: ['', Validators.required],
      numPlaces: ['', Validators.required],
    })
  }

  crearGuardia() {

    let creacioGuardia = new Guardia('', this.crearGuardiaForm.get("dataGuardia")?.value, this.crearGuardiaForm.get("categoria")?.value, 'ACTIU', this.crearGuardiaForm.get("torn")?.value, this.crearGuardiaForm.get("unitat")?.value, this.crearGuardiaForm.get("numPlaces")?.value);

    this.httpClient.insertGuardia(creacioGuardia).subscribe(
      response => {
        console.log(response);
      }
    );
    this.crearGuardiaForm.reset();
  }
}