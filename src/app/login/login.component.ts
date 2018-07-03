import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.action !== 'logout') {
        this.authService.loginWithCookie();
      }
    });
    this.form = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  login() {
    const values = this.form.getRawValue();
    console.log(values.username, values.password);
    this.authService.authenticate(values.username, values.password);
  }
}
