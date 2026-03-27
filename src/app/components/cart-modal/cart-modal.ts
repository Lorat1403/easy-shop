import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth.service';
import { EuroCurrencyPipe } from '../../pipes/euro-currency-pipe';

@Component({
  selector: 'app-cart-modal',
  imports: [CommonModule, EuroCurrencyPipe, RouterLink],
  templateUrl: './cart-modal.html',
  styleUrl: './cart-modal.scss',
})
export class CartModal {
  private router = inject(Router);
  public cartService = inject(CartService);
  public authService = inject(AuthService);

  @Output() close = new EventEmitter<void>();

  async onPlaceOrder() {   
    const user = await this.authService.currentUser; 

    if (user) {
      console.log('Order in progress...');     
    } else {     
      this.close.emit(); 
      this.router.navigate(['/login']);
    }
  }

  closeModal() {
    this.close.emit();
  }

  removeItem(index: number) {
  this.cartService.removeItem(index);
}

  submitOrder() {
    this.closeModal();
    this.router.navigate(['/order']);
  }

}
