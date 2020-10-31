import { MainComponent } from './main.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { UsersComponent } from './users/users.component';
import { SideNavItemsComponent } from '../layout/side-nav-items/side-nav-items.component';
import { PatientsComponent } from './patients/patients/patients.component';

@NgModule({
  declarations: [
    MainComponent,
    UsersComponent,
    SideNavItemsComponent,
    PatientsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class MainModule { }
