import { Component, HostListener } from '@angular/core';
import { Treballador } from '../../model/entitats/implementacions/Treballador';

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
  
  constructor(){

  }
  submitted = false;

  onSubmit() { 
    

    
  }
 


}

