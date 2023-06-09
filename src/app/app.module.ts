import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {provideHttpClient} from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { checkTokenGuard } from './check-token.guard';

function bootstrap(authService: AuthService){
  return ()=>{
    const token = localStorage.getItem('Token')
    if(token){
     authService.token.set(token)
    }
  }
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo:'login',   pathMatch: 'full' } ,
      {path:'login', component:LoginComponent},

      {path:'user', loadChildren:()=>import('./user/user.module')
         .then(module =>module.UserModule),
         canActivate:[checkTokenGuard]
       
        }
    ]),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [provideHttpClient(),
  {provide: APP_INITIALIZER, multi:true, useFactory: bootstrap, deps:[AuthService]}],
  bootstrap: [AppComponent]
})
export class AppModule { }
