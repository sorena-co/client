import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TokenStorageService} from '../security/token-storage.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService, protected router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token.getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401) {
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )
    );
  }

  private handleAuthError() {
    this.token.signOut();
    this.router.navigateByUrl('/login');
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
