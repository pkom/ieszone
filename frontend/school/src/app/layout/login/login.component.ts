import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginUser } from '../../setting/+state/config.action';

@Component({
  selector: 'z-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [''],
      password: [''],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(LoginUser(this.loginForm.value));
    }
  }
}
