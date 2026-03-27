import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
private auth = inject(AuthService);
private router = inject(Router);

  email = '';
  pass = '';
  error = '';

async onRegister() {
    try {
      await this.auth.register(this.email, this.pass);
      this.router.navigate(['/']); 
    } catch (err: any) {
      this.error = 'Register error: ' + err.message;
    }
  }  
}
