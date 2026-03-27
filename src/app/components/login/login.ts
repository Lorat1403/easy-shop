import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
  
export class Login {
private auth = inject(AuthService);
private router = inject(Router);

  email = '';
  pass = '';
  error = '';

async onLogin() {
    try {
      await this.auth.login(this.email, this.pass);
      this.router.navigate(['/']); 
    } catch (err) {
      this.error = 'Uncorrect login or password';
    }
  }

async signInWithGoogle() {
  try {
    await this.auth.loginWithGoogle();    
    this.router.navigate(['/']); 
  } catch (err) {
    console.error('Помилка входу через Google:', err);
  }
}  
}
