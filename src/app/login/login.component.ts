import { authFailed, loginAttempt, loginFailed, loginSuccessful } from '../core/auth/actions/auth.actions';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { TOOLTIP_PANEL_CLASS } from '@angular/material/tooltip';
import { SnackbarService } from '../core/services/snackbar.service';
import { AuthService } from '../core/auth/services/auth.service';
import { MessageLevel } from '../core/services/message-level.enum';

export interface UserLogin {
  username: string;
  password: string;
}

interface LoginControls {
  username: AbstractControl;
  password: AbstractControl;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  controls: LoginControls;

  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });

    this.controls = {
      username: this.loginForm.get('username'),
      password: this.loginForm.get('password'),
    };
  }

  onSubmit(): void {
    const user: UserLogin = this.loginForm.value;

    this.store.dispatch(loginAttempt(user));

    this.auth.lameAuthenticator(user).subscribe(
      (isAuthenticated: boolean) => {
        if (isAuthenticated) {

          this.store.dispatch(loginSuccessful());

          this.router.navigate(['/main/users']);
          // TODO mover mensagens para effects
          this.snackbarService.open('Sucesso!', MessageLevel.SUCCESS);
        } else {
          this.store.dispatch(authFailed());
          this.snackbarService.open('Deu Ruim!', MessageLevel.DANGER);
        }
      },
      (error) => {
        this.store.dispatch(loginFailed());
        this.errorMessage = error.message;
        this.snackbarService.open('Deu Ruim!', MessageLevel.DANGER);
      }
    );
  }
}
