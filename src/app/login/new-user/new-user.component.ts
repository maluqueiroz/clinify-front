import { Component, OnDestroy, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/main/users/shared/service/user.service';
import { MessageLevel } from 'src/app/shared/services/snackbar/message-level.enum';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

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
export class NewUserComponent implements OnInit, OnDestroy {
  componentDestroyedSubject = new Subject();

  signUpForm: FormGroup;
  controls: SignUpControls;

  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: SnackbarService,
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

  ngOnDestroy(): void {
    this.componentDestroyedSubject.complete();
  }

  onSubmit(): void {
    this.userService.registerUser(this.signUpForm.value).pipe(
      takeUntil(this.componentDestroyedSubject)
    )
    .subscribe((data) => {
      this.snackbar.open('Usuário cadastrado com Sucesso!', MessageLevel.SUCCESS);
      this.router.navigate(['/login']);
    },
    (error) => {
      this.errorMessage = error.message;
      this.snackbar.open('Deu Ruim!', MessageLevel.DANGER);
    });
  }

  isFormValid(): boolean {
    return this.controls.username.valid
    && this.controls.email.valid
    && this.controls.password.valid
    && this.controls.password2.valid
    && this.arePasswordsMatching();
  }

  arePasswordsMatching(): boolean {
    return this.controls.password.value === this.controls.password2.value;
  }

  arePasswordsTouched(): boolean {
    return this.controls.password.touched && this.controls.password2.touched;
  }
}
