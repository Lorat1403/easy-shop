import { Component, OnInit } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCard, AsyncPipe, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
  
export class ProductList implements OnInit {
  
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {

   this.products$ = this.productService.getProducts().pipe(
  map(list => {   
    const transformed = list.map((p, index) => {      
      if (p.isNew) { return p;}
      
      if (index === 0) p.discount = 70;        
      else if (index > 0 && index < 3) p.discount = 60;        
      else p.discount = 50;      
      return p;
    });   

    return transformed.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  })
)
}
  ngOnInit(): void {}
}


