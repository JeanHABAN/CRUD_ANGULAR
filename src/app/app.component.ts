import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <button (click) ="logout()" *ngIf ="authService.token()">logout</button>
   <router-outlet/>
    
  `,
  styles: []
})
export class AppComponent {
   authService = inject(AuthService)
   private router = inject(Router)
  logout(){
    this.authService.token.set('');
    this.router.navigate(['', 'login'])
    localStorage.clear();
  }
}
