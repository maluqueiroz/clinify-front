import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserDTO } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly RESOURCE_URL = environment.apiUrl + 'users';

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<UserDTO[]>(
      UserService.RESOURCE_URL
    ).pipe(
      map((usersDTO: UserDTO[]): User[] => {
        return usersDTO.map((userDTO: UserDTO): User => {
          return {
            ...userDTO,
            created_on: new Date(userDTO.created_on)
          };
        });
      })
    );
  }
}
