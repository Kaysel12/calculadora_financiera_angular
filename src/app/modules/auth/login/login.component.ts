import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router){

  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/calculadora']),
      error: (error) => {
        let errorMessage;
        if (error.status >= 400 && error.status < 500) {
          errorMessage = 'Error de autenticación: ' + (error.error?.detail || 'Credenciales incorrectas.');
        }
        
        return alert(errorMessage)
      }
    });
  }

}
