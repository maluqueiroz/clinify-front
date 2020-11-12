import { HttpErrorInterceptor } from './interceptors/http-error-response.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule
  ],
  exports: [
    HttpClientModule,
    AuthModule
  ]
})
export class CoreModule { }
