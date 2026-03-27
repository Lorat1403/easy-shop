import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';
import { UserRole } from '../models/user.model';

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.user$.pipe(
      take(1),
      map(user => {
        if (user && allowedRoles.includes(user.role)) {
          return true;
        }
        return router.createUrlTree(['/']);
      })
    );
  };
};