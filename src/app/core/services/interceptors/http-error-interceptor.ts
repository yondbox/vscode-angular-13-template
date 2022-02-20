import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toast: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = request.clone();
    return next.handle(req).pipe(
      catchError((res) => {
        switch (res.status) {
          case 400:
          case 401:
          case 403:
          case 404:
          case 500:
            this.toast.open(`${res.status}: ${res.statsText}`);
            // {"errors":[{"message":"Sorry, that page does not exist","code":34}]}
            // const errors = JSON.parse(res.errors);
            // if (errors) {
            //   errors.map((e: any) => {
            //     this.toast.open(`${e.code}: ${e.message}`);
            //   });
            // }
            break;
          default:
            break;
        }
        return throwError(() => res);
      })
    );
  }
}
