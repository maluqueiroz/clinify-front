import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserDTO } from 'src/app/main/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly RESOURCE_URL = environment.apiUrl + 'users';

  constructor(
    private http: HttpClient
  ) { }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User[]>(UserService.RESOURCE_URL, { params: { username }}).pipe(
      map((queryReturn: User[]) => {
        if (queryReturn.length === 0) {
          throw Error('Usuário Inexistente');
        }

        const firstUserFound: User = queryReturn[0];

        return firstUserFound;
      })
    );
  }

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

  registerUser(userRegistrationData: Partial<User>): any {
    const { username, password, email } = userRegistrationData;
    const userDTO: UserDTO = {
      username,
      password,
      email,
      active: true,
      created_on: (new Date()).toISOString()
    };

    return this.http.post<UserDTO>(
      UserService.RESOURCE_URL,
      userDTO,
      { headers: {'Content-Type': 'application/json; charset=utf-8'} }
    );
  }
}
