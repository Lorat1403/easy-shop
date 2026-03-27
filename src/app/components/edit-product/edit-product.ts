import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { Product } from '../../models/product.model';
import { PRODUCT_COLORS, PRODUCT_SIZES } from '../../constants/product-options';

@Component({
  selector: 'app-edit-product',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, ImageModule],  
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss',
})
  
export class EditProduct implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  
  readonly availableColors = PRODUCT_COLORS;
  readonly availableSizes = PRODUCT_SIZES;

  // availableColors: string[] = ['Black', 'White', 'Blue', 'Grey', 'Red', 'Green'];
  // availableSizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  productId: string = '';
  showModal = false;
  modalConfig = { title: '', message: '', action: () => {} };
  
  productForm = this.fb.group({
    name: ['', [Validators.required]],
    price: [ 0 as number | null, [Validators.required, Validators.min(0.1)]],
    imgUrl: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(6)]],
    discount: [0, [Validators.min(0), Validators.max(75)]],
    isNew: [true],
    color: [[] as string[], Validators.required],
    size: [[] as string[], Validators.required]
  });

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    if (this.productId) {      
      this.productService.getProductById(this.productId).subscribe(product => {
        if (product) this.productForm.patchValue(product);
      });
    }
  }
 
openUpdateModal() {
    this.modalConfig = {
      title: 'Confirm Edit',
      message: 'Are you sure you want to save the changes?',
      action: () => this.saveChanges()
    };
    this.showModal = true;
  }  
  async saveChanges() {
    if (this.productForm.valid) {
      const updatedData = this.productForm.getRawValue() as Product;
      await this.productService.updateProduct(this.productId, updatedData);
      this.closeModal();
      this.router.navigate(['/']);
    }
  }

openDeleteModal() {
    this.modalConfig = {
      title: 'ATTENTION: Removing!',
      message: 'Are you sure you want to DELETE this item? This action cannot be undone.',
      action: () => this.deleteProduct()
    };
    this.showModal = true;
  }

  async deleteProduct() {
    await this.productService.removeProduct(this.productId);
    this.closeModal();
    this.router.navigate(['/']);
  }

  closeModal() {
    this.showModal = false;
  }

  goBack() {
  this.router.navigate(['/']);
}
}
