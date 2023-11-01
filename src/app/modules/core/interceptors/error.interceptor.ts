import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private messageService: MessageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('Error event');
          } else {
            switch (error.status) {
              case 401:
                this.router.navigate(['/auth']);
                break;
            }
          }
        } else {
          console.log('An error');
        }

        this.messageService.add({
          severity: 'error',
          summary: error.statusText,
          detail: error.error.message,
        });
        return throwError(() => new Error(error.statusText));
      })
    );
  }
}
