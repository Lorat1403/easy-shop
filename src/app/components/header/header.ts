import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
// import { AsyncPipe } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth.service';
import { CartModal } from '../cart-modal/cart-modal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, CartModal],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public cartService = inject(CartService);
  public authService = inject(AuthService);
  private router = inject(Router);

  isMenuOpen = false;
  isCartModalOpen = false;

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']); 
  }

  openCart() {
    this.isCartModalOpen = true;
    this.isMenuOpen = false;
  }
}
