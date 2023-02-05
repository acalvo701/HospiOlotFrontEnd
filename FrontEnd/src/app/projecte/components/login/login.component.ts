import { Component, HostListener } from '@angular/core';
import { Treballador } from '../../model/entitats/implementacions/Treballador';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthenticationService } from '../../model/services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  treballador = {
    dni: "",
    password: "",
  };
  
  hide = true;

  error: string;

  constructor(private router: Router, private http: HttpClient, private authService: AuthenticationService) {

  }
  
  submitted = false;

  ngOnInit() {
    if (this.authService.isAuthenticated())
      this.router.navigate(['calendari']);
  }

  onSubmit() {

    this.authService.login(this.treballador.dni, this.treballador.password).pipe(
      map(token =>
        //jwt_decode(token);
        this.router.navigate(['calendari'])

      )

    ).subscribe(          {
      next: () => {
        
      },
      //per veure l'error que retorna de l'api
      error: (err: any) => {
        this.error = err.error        
      },
      complete: () => {
      },
    });

  }

}





