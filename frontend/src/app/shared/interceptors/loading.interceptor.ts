import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { tap } from 'rxjs/operators';

var pendingRequests = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService : LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading()
    pendingRequests = pendingRequests +1
    return next.handle(request).pipe(
      tap({
        next : (event) => {
          if (event.type === HttpEventType.Response){
            this.handleHideLoading()
          }
        },
        error : (_) => {
          this.handleHideLoading()
        }
      })
    );
  }

  handleHideLoading(){
    pendingRequests = pendingRequests - 1
    if (pendingRequests == 0) {
      this.loadingService.hideLoading()
    }
  }
}
