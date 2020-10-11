import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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
    console.log(this.signUpForm.value);
  }

}
