import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

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

  lameAuthenticator(userData: LoginData): Observable<boolean> {
    return this.userService.getUserByUsername(userData.username).pipe(
      map((userFound) => {
        return userFound.password === userData.password;
      })
    );
  }


}
