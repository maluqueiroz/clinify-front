import { User } from './../../../main/users/model/user.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';

interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService
  ) { }

  lameAuthenticator(userData: LoginData): Observable<User> {
    const { username } = userData;

    return this.userService.getUserByUsername(username).pipe(
      map((userFound) => {
        if (userFound.password === userData.password) {
          return userFound;
        }

        throw new Error('Senha Inválida');
      })
    );
  }


}
