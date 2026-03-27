import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBR7WPieyVoYU53fa-CVNNgR5LrpMN_g9I", 
  authDomain: "easy-shop-6bb56.firebaseapp.com",
  projectId: "easy-shop-6bb56",
  storageBucket: "easy-shop-6bb56.firebasestorage.app",
  messagingSenderId: "469362369701",
  appId: "1:469362369701:web:9e08a4e54c9f9b8160994c"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),    
    provideRouter(routes),
    
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
