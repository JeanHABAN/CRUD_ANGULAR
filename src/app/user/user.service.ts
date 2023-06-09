import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from './IUser.interface';
import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient)

  /**
   * 
   * GET https://reqres.in/api/users  
Response Type: { data: IUser[] }  
   */
  getUsers() {
    return this.http.get<{ data: IUser[] }>(env.SERVER_URL + 'users')
  }

  /**
   * GET https://reqres.in/api/users/:user_id  
    Response Type: { data: IUser } 
   */

  getUserById(user_id: number) {
    return this.http.get<{ data: IUser }>(env.SERVER_URL + 'users/' + user_id)
  }

  /**
   * POST https://reqres.in/api/users   
    Request Type: IUser  
    Response Type: IUser  
   */

  addUser(user: IUser) {
    return this.http.post<IUser>(env.SERVER_URL + 'users', user)
  }

  /**
   * PUT, PATCH https://reqres.in/api/users/:user_id  
   Request Type: IUser  
   Response Type: IUser  
   */

  updateUserById(user: IUser) {
    return this.http.put<IUser>(env.SERVER_URL + 'users/' + user.id, user)
  }

  /**
   * DELETE https://reqres.in/api/users/:user_id  
Response Status Code: 204, 
the HTTP 204 No Content success status 
response code indicates that a request has succeeded
   */

  deleteUserById(user_id: number) {
    return this.http.delete<{ data: IUser }>(env.SERVER_URL + 'users/' + user_id, {observe: 'response'})
  }
}
