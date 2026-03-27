import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-order',
  imports: [ReactiveFormsModule, AsyncPipe, RouterLink, CurrencyPipe, CommonModule],
  templateUrl: './order.html',
  styleUrl: './order.scss',
})
  
export class Order implements OnInit {
  private fb = inject(FormBuilder);  
  private cartService = inject(CartService);
  
  currentStep = 1;  
  
  products$: Observable<Product[]> | undefined;  
  
  orderForm = this.fb.group({
    step1: this.fb.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required]
    }),

    step2: this.fb.group({
    paymentMethod: ['card', Validators.required]
    }),

    step3: this.fb.group({
    dateType: ['today', Validators.required],
    calendarDate: ['']
    })
  });
 
  ngOnInit(): void {
    this.products$ = this.cartService.cartItems$;
  } 

  get isCartEmpty(): boolean {
    return this.cartService.getCartItems().length === 0;
  }

get totalPrice() {
  return this.cartService.getTotalPrice();
  }

  next() { if (this.currentStep < 5) this.currentStep++; }

  back() { if (this.currentStep > 1) this.currentStep--; }

  submit() {
      if (this.orderForm.valid) {
      console.log('Final Order:', this.orderForm.value);      
      this.cartService.clearCart();
    }
  } 
}
