import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageLevel } from 'src/app/shared/services/snackbar/message-level.enum';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: SnackbarService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);

    this.snackBar.open('erro', MessageLevel.DANGER);

    throw new Error('Method not implemented.');
  }
}
