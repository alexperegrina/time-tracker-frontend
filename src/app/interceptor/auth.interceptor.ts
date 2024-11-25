import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401 && error.error.message === 'Expired JWT Token') {
          // Refresh the token
          return authService.refreshToken().pipe(
            switchMap((newToken: string) => {
              authService.saveToken(newToken); // Store the new token
              const retryRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              return next(retryRequest);
            }),
            catchError((refreshError) => {
              authService.logout(); // Logout if refresh also fails
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
