import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

interface SignUpControls {
  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  password2: AbstractControl;
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  signUpForm: FormGroup;
  controls: SignUpControls;

  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      password2: ['']
    });

    this.controls = {
      username: this.signUpForm.get('username'),
      email: this.signUpForm.get('email'),
      password: this.signUpForm.get('password'),
      password2: this.signUpForm.get('password2')
    };
  }

  onSubmit(): void {
    this.userService.registerUser(this.signUpForm.value).subscribe((data) => {
      console.log(data);
      this.openSnackBar('Usuário cadastrado com Sucesso!');
      this.router.navigate(['/login']);
    },
    (error) => {
      this.errorMessage = error.message;
      this.openSnackBar('Deu Ruim!');
    });
  }

  openSnackBar(message: string, action?: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
