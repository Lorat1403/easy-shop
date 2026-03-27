import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart-service';
import { Observable } from 'rxjs';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { EuroCurrencyPipe } from '../../pipes/euro-currency-pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, EuroCurrencyPipe, TruncatePipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
  
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product$!: Observable<Product | undefined>;
  quantity: number = 1;
  selectedColor: string = '';
  selectedSize: string = '';

  showError: boolean = false;

  // constructor(private route: ActivatedRoute,
  //   private productService: ProductService) {   
  //   const productId = this.route.snapshot.paramMap.get('id');
  //   this.product$ = this.productService.getProductById(productId);
  // }

  ngOnInit(): void {
    // Отримуємо ID саме тут, коли компонент готовий
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      // TypeScript тепер спокійний, бо ми перевірили наявність ID
      this.product$ = this.productService.getProductById(productId);
    }
  }
  
  selectColor(color: string) {
    this.selectedColor = color;
    this.showError = false;
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.showError = false;
  } 

  changeQty(amount: number) {
    if (this.quantity + amount >= 1) {
      this.quantity += amount;
    }
  }
  
  addToCart(product: Product) {
    if (!this.selectedColor || !this.selectedSize) {
      this.showError = true;
      return;
  }

  const orderItem: Product = { 
      ...product, 
    quantity: this.quantity,
    selectedColor: this.selectedColor,
    selectedSize: this.selectedSize
    };    
    this.cartService.addToCart(orderItem);
    this.showError = false;
  }

  scrollToReviews(el: HTMLElement) {
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } 
}
