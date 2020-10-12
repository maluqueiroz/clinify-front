import { MainComponent } from './main.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    MainComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class MainModule { }
