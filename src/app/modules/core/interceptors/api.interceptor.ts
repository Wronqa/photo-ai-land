import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment.development';
import { IApiResponse } from '../../shared/interfaces/api.interfaces';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router: Router, private messageService: MessageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true,
    });
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
      }),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(event);
          event = event.clone({ body: event.body.message });
          console.log(event);
        }
        return event;
      })
    );
  }
}
