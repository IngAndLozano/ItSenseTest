import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  passwordVisible = false;
  credentials = {
    username: '',
    passwordHash: ''
  };
  constructor(private apiService: ApiServiceService, private router: Router) { }

  LogIn() {
    this.apiService.login(this.credentials).subscribe(response => {
      const token = response.token;
      localStorage.setItem('token', token);
      this.router.navigate(['Inventory']);
    }, error => {
      console.log("error", error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario/Contrseña incorrecto, por favor verifique los datos.',
      });
    });
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }
}
