import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

interface LoginControls {
  username: AbstractControl;
  password: AbstractControl;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  controls: LoginControls;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });

    this.controls = {
      username: this.loginForm.get('username'),
      password: this.loginForm.get('password')
    };
  }


  onSubmit(): void {
    console.log(this.loginForm.value);
  }
}
