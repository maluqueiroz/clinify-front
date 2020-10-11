import { UsersComponent } from './main/users/users.component';
import { NewUserComponent } from './login/new-user/new-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { MainComponent } from 'src/app/main/main.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'new-user', component: NewUserComponent},
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'users', component: UsersComponent }
    ]
   },
   {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
