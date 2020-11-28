import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/main/users/shared/model/user.model';
import { UserService } from 'src/app/main/users/shared/service/user.service';
import {UserFirestoreService} from '../../../main/users/shared/service/user.firestore.service';

interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private userAfs: UserFirestoreService
  ) { }

  lameAuthenticator(userData: LoginData): Observable<User> {
    const { username } = userData;

    return this.userAfs.fetchUserByName(username).pipe(
      map((userFound) => {
        if (userFound.password === userData.password) {
          return userFound;
        }

        throw new Error('Senha Inválida');
      })
    );
  }

}
