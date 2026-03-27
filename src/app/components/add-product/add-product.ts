import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { PRODUCT_COLORS, PRODUCT_SIZES } from '../../constants/product-options';
import { ImageModule } from 'primeng/image';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ImageModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  readonly availableColors = PRODUCT_COLORS;
  readonly availableSizes = PRODUCT_SIZES;

  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [null, [Validators.required, Validators.min(0.1)]],
    imgUrl: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(6)]],
    shop: ['EASY SHOP', Validators.required],
    discount: [0, [Validators.min(0), Validators.max(75)]],
    isNew: [true],    
    color: [[] as string[], Validators.required],
    size: [[] as string[], Validators.required]
  });
  
async submit() {
    if (this.productForm.valid) {
      const val = this.productForm.value;   
      const newProduct: Omit<Product, 'id'> = { 
        name: val.name!,
        price: Number(val.price),
        imgUrl: val.imgUrl!,
        description: val.description!,
        shop: val.shop!,
        discount: Number(val.discount) || 0,
        isNew: !!val.isNew,
        color: val.color || [],
        size: val.size || [],
        discountUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), 
        shipping: 'Free shipping',       
        review: [
          {
            author: 'System Admin',
            text: 'Initial stock review',
            rating: 5
          }
        ]
      } as Product;

      try {       
        await this.productService.addProduct(newProduct as Product);
        console.log('Product successfully added to Firestore!');
        this.router.navigate(['/']); 
      } catch (error) {
        console.error('Error adding product:', error);        
      }
    }
  }
}
