import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpLoggerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = request.clone();

    if (environment.production) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      filter((res) => res.type === HttpEventType.Response),
      tap((res) => console.log(res))
    );
  }
}
