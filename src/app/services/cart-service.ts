import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
  
export class CartService {
  private cartItems: Product[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {    
    const saved = localStorage.getItem('cart');
    if (saved) {
    this.cartItems = JSON.parse(saved);
    this.updateStreams();
    }
  }

  private updateStreams() {
    this.cartCount.next(this.cartItems.length);
    this.cartItemsSubject.next([...this.cartItems]); 
  }

  private saveAndRefresh() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.updateStreams();
  }

  addToCart(product: Product) {   
    const existingItem = this.cartItems.find(item => 
    item.id === product.id && 
    item.selectedColor === product.selectedColor && 
    item.selectedSize === product.selectedSize
  );

  if (existingItem) {    
    existingItem.quantity = (existingItem.quantity ?? 0) + (product.quantity ?? 1);
  } else {    
    const newProduct = { ...product, quantity: product.quantity ?? 1 };
    this.cartItems.push(newProduct);
  }
    this.saveAndRefresh();
  }

  getTotalPrice(): number {
   return this.cartItems.reduce((sum, item) =>{   
    const currentPrice = item.discount 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
      
    return sum + (currentPrice * (item.quantity ?? 1));
  }, 0);
  }

  getCartItems() {
    return this.cartItems;
  }

updateItemQty(index: number, amount: number) {
  const currentQty = this.cartItems[index].quantity ?? 1;
  if (currentQty + amount >= 1) {
    this.cartItems[index].quantity = currentQty + amount;
    this.saveAndRefresh(); 
  }
}

  removeItem(index: number) {
  this.cartItems.splice(index, 1);
  this.saveAndRefresh(); 
}

  clearCart() {
  this.cartItems = []; 
  this.saveAndRefresh();
}
}
