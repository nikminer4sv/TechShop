import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  submited: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null ,[Validators.required, Validators.minLength(6)]),
    });
  }

  submit(): void {

  }

  getPasswordActualLength(): number { 
    return this.form.get("password")?.errors!["minlength"].actualLength;
  }

  getPasswordRequiredLength(): number { 
    return this.form.get("password")?.errors!["minlength"].requiredLength;
  }

}
