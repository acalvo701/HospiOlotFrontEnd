import { Component, HostListener } from '@angular/core';
import { Treballador } from '../../model/entitats/implementacions/Treballador';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthenticationService } from '../../model/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  treballador = {
    dni:"",
    password:"",
  };
  
  constructor(private router:Router, private http:HttpClient, private authService:AuthenticationService){

  }
  submitted = false;

  onSubmit() { 
    

    this.authService.login(this.treballador.dni,this.treballador.password).pipe(
      map(token => 
        //jwt_decode(token);
        this.router.navigate(['mes'])
        
        )

    ).subscribe();

    }
    
  }
 




