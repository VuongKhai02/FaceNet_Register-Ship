import { Component, EventEmitter, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FormControl, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() out: EventEmitter<boolean> = new EventEmitter();
  Islogin: boolean = true;

  ngOnInit(): void {}

  validateForm: FormGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
  });

  submitForm(): void {
    if (
      this.validateForm.value.userName === 'admin' &&
      this.validateForm.value.password === 'admin'
    ) {
      this.Islogin = false;
      console.log(this.validateForm.value.userName);
      console.log(this.validateForm.value.password);
      console.log(this.Islogin);
      this.out.emit(this.Islogin);
    } else {
      alert('Nhập sai');
    }
  }

  constructor() {}
}
