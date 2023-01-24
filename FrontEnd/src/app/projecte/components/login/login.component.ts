import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  getCursorPosition(event:any) {
    const x = (event.clientX * 100) / window.innerWidth + "%";
    const y = (event.clientY * 100) / window.innerHeight + "%";
  
    const eyes1 = document.getElementById("eyes1");
    const eyes2 = document.getElementById("eyes2");
  
    eyes1!.style.left = x;
    eyes1!.style.top = y;
    eyes1!.style.transform = `translate(-${x}, -${y})`;
  
    eyes2!.style.left = x;
    eyes2!.style.top = y;
    eyes2!.style.transform = `translate(-${x}, -${y})`;
  }
  
}


const email = document.getElementById("email");
const emailSpan = document.getElementById("span-email");
const password = document.getElementById("password");
const passwordSpan = document.getElementById("span-password");

// email!.addEventListener("input", (value: HTMLInputElement) => {
//   if (email as HTMLInputElement)!.value) {
//     emailSpan!.classList.add("focus-span");
//   } else {
//     emailSpan!.classList.remove("focus-span");
//   }
// });

// password!.addEventListener("input", () => {
//   if (password!.value) {
//     passwordSpan!.classList.add("focus-span");
//   } else {
//     passwordSpan!.classList.remove("focus-span");
//   }
// });

