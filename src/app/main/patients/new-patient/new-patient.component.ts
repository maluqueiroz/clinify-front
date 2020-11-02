import { SnackbarService } from './../../../shared/services/snackbar/snackbar.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PatientService } from 'src/app/shared/services/patient/patient.service';
import { MessageLevel } from 'src/app/shared/services/snackbar/message-level.enum';

interface SignUpControls {
  name: AbstractControl;
  birthDate: AbstractControl;
  convenio: AbstractControl;
}

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit, OnDestroy {
  componentDestroyedSubject = new Subject();

  signUpForm: FormGroup;
  controls: SignUpControls;

  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: [''],
      birthDate: [''],
      convenio: ['']
    });

    this.controls = {
      name: this.signUpForm.get('name'),
      birthDate: this.signUpForm.get('birthDate'),
      convenio: this.signUpForm.get('convenio')
    };
  }

  ngOnDestroy(): void {
    this.componentDestroyedSubject.complete();
  }

  onSubmit(): void {
    this.patientService.registerPatient(this.signUpForm.value).pipe(
      takeUntil(this.componentDestroyedSubject)
    )
      .subscribe((data) => {
          this.snackbar.open('Paciente cadastrado com Sucesso!', MessageLevel.SUCCESS);
          this.router.navigate(['/patients']);
        },
        (error) => {
          this.errorMessage = error.message;
          this.snackbar.open('Deu Ruim!', MessageLevel.DANGER);
        });
  }

  isFormValid(): boolean {
    return this.controls.name.valid
      && this.controls.birthDate.valid
      && this.controls.convenio.valid;
  }
}
