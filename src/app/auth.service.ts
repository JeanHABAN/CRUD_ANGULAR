import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment as env } from 'src/environments/environment';

export type ICredentials = {"email":string, "password":string}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

token = signal('')
  private http = inject(HttpClient)
  
  login(crendential:{"email":string, "password":string}){
   return this.http.post<{token:string}>(env.SERVER_URL+ 'login', crendential)
  }
}
