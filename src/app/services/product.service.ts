import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  docData, 
  addDoc, query, orderBy, updateDoc, deleteDoc 
} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { Product } from '../models/product.model';
// import { PRODUCTS } from '../assets/data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
private firestore = inject(Firestore);
private productsCollection = collection(this.firestore, 'products');

  getProducts(): Observable<Product[]> {
    const q = query(this.productsCollection, orderBy('discount', 'desc')); 
  return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
  }

  getProductById(id: string): Observable<Product> {    
    const productDocRef = doc(this.firestore, 'products', id);
    return docData(productDocRef, { idField: 'id' }) as Observable<Product>;
  }

  async addProduct(product: Product) {
    return addDoc(this.productsCollection, product);
  }

  async updateProduct(id: string, product: Partial<Product>) {
  const productDocRef = doc(this.firestore, `products/${id}`);
  return updateDoc(productDocRef, product); 
}

async removeProduct(id: string) {
  const productDocRef = doc(this.firestore, `products/${id}`);
  return deleteDoc(productDocRef); 
}

// async migrateDataToFirebase() {
//   console.log('Міграція почалася...');
//   for (const product of PRODUCTS) {
//     const { id, ...data } = product; 
//     await addDoc(this.productsCollection, data);
//   }
//   console.log('Готово!');
// }
}

