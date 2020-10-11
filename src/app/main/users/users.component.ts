import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;

  columnsToDisplay: string[] = ['username', 'email', 'active', 'created_on'];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers().pipe(tap(console.log));
  }

}
