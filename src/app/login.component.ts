import { Component, inject } from '@angular/core';
import { AuthService, ICredentials } from './auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <form [formGroup]="loginForm" (ngSubmit) = "login()">
  <input placeholder="email" formControlName ="email"/>
  <input placeholder="password" formControlName ="password"/>
  <button type="submit" [disabled] ="loginForm.invalid">login</button>
 </form>
  `,
  styles: [
  ]
})
export class LoginComponent {
  private authService = inject(AuthService)
private notification = inject(ToastrService)

private router = inject(Router)
  loginForm = inject(FormBuilder).group({
    email:['eve.holt@reqres.in', Validators.required],
    password:['cityslika', Validators.required]
  })

  login(){
    this.authService.login(this.loginForm.value as ICredentials)
    .subscribe(response => {
      this.authService.token.set(response.token)
      localStorage.setItem('Token',response.token)
      this.notification.success(`logged successfully`)
      this.router.navigate(['','user']);
    })
     
  }
}
