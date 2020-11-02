import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/main/users/shared/model/user.model';
import { UserService } from 'src/app/main/users/shared/service/user.service';

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
