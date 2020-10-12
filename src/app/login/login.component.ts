import { AuthService } from './../core/auth/auth.service';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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
    this.auth.lameAuthenticator(this.loginForm.value).subscribe(
      (isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigate(['/main/users']);
        } else {
          this.openSnackBar('Deu Ruim!');
        }
      },
      (error) => {
        this.errorMessage = error.message;
        this.openSnackBar('Deu Ruim!');
      }
    );
  }

  openSnackBar(message: string, action?: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
