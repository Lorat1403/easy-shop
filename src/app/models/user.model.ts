export type UserRole = 'client' | 'admin' | 'owner';

export interface AppUser {
  uid: string;
  email: string;
  role: UserRole;
  displayName: string | null;
  photoURL: string | null;
}