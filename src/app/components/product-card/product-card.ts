import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { EuroCurrencyPipe } from '../../pipes/euro-currency-pipe';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-product-card',
  imports: [CommonModule, EuroCurrencyPipe, TruncatePipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
  
export class ProductCard {
  public authService = inject(AuthService);
  @Input({ required: true }) product!: Product;
  
  @Input() isFeatured: boolean = false;

  getThemeColor(): string{
    const d = this.product.discount ?? 0;
    if (d >= 70) return 'red';
    if (d >= 60) return 'pink';
    if (d > 0) return 'orange';
    return 'blue';
  }

}

