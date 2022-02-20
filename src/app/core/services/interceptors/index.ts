import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error-interceptor';
import { HttpLoggerInterceptor } from './http-logger-interceptor';

export function provideHttpInterceptors() {
  return [
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoggerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ];
}
