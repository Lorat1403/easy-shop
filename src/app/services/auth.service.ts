import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, getAuth, GoogleAuthProvider, signInWithPopup, linkWithCredential, 
EmailAuthProvider, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc, getDoc } from '@angular/fire/firestore';
import { catchError, Observable, of, map, switchMap } from 'rxjs';
import { AppUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private getDocRef(uid: string) {
  return doc(this.firestore, `users/${uid}`);
}
  
public readonly user$: Observable<AppUser | null> = authState(this.auth).pipe(
  switchMap((user: User | null) => {
    if (!user) {
      return of(null);
    }   
  const userDocRef = this.getDocRef(user.uid);    
    return (docData(userDocRef) as Observable<AppUser>).pipe(
    map(data => {
      if (!data) return null;
      return {
        ...data,
        displayName: user.displayName ?? data.displayName ?? null,
        photoURL: user.photoURL ?? data.photoURL ?? null
        };
    }),
  catchError(() => of(null)) 
    );
  })
);

async loginWithGoogle() {
  const provider = new GoogleAuthProvider();
    try {      
      const credential = await signInWithPopup(this.auth, provider);
      const user = credential.user;
      const hasPassword = user.providerData.some(p => p.providerId === 'password');
    
    if (!hasPassword) {
      const password = prompt('Цей акаунт ще не має прив’язаного пароля. Введіть його, щоб об’єднати методи входу:');
      if (password) {
        const emailCred = EmailAuthProvider.credential(user.email!, password);       
        await linkWithCredential(user, emailCred);
        console.log('Методи входу успішно об’єднано!');
      }
    }

      const userDocRef = this.getDocRef(user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email ?? '', 
          role: 'client',
          displayName: user.displayName ?? '',
          photoURL: user.photoURL ?? ''
        });
      }

      return user;
    } catch (error: any) {
      if (error.code === 'auth/account-exists-with-different-credential') {
      const email = error.customData.email;
      const pendingCred = GoogleAuthProvider.credentialFromError(error);

      const password = prompt('Цей email вже має пароль. Введіть його для об’єднання з Google:');

      if (password && pendingCred) {        
        const userAuth = await signInWithEmailAndPassword(this.auth, email, password);        
        await linkWithCredential(userAuth.user, pendingCred);        
        return userAuth.user; 
      }
    }
      console.error('Google Auth Error:', error);
      throw error;
    }
  }  
  
async register(email: string, pass: string) {
  try {
    const credential = await createUserWithEmailAndPassword(this.auth, email, pass);
    const user = credential.user;   
    await setDoc(doc(this.firestore, `users/${user.uid}`), {
      uid: user.uid,
      email: email,
      role: 'client' 
    });    
    return user;
  } catch (error) {
    throw error;
  }
}

async login(email: string, pass: string) {
    return await signInWithEmailAndPassword(this.auth, email, pass);
  }

get currentUser() {
  return getAuth().currentUser;
}  

async logout() {
    return await signOut(this.auth);
  }
}