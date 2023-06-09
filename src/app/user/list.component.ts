import { Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { IUser } from './IUser.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  template: `
   <button (click) ="goToAdd()">add new user</button>
    <p *ngFor="let user of users" class="user-card">
   
    <img [src]="user.avatar"/>
      <span class="name">{{user.first_name}} {{user.last_name}}</span>
      <span class="email">{{user.email}}</span>
    
      <button (click) ="deleteUser(user.id)">delete</button> 
      <button (click) ="goToedit(user.id)" >update</button>
    </p>
  `,
  styles: [`
 
  `
  ]
})
export class ListComponent {
  private notification = inject(ToastrService)
  private userService = inject(UserService);
  private router = inject(Router)
  users: IUser[] = [];

  constructor() {
    this.userService.getUsers().subscribe(response => {
      this.users = response.data;
    })
  }

  deleteUser(user_id: number) {
    this.userService.deleteUserById(user_id).subscribe(response => {
      if (response.status === 204) {
        this.users = this.users.filter(user => user.id !== user_id)
        this.notification.success('user was successfully deleted.')
      }
    })
  }

  goToAdd(){
this.router.navigate(['', 'user','add'])
  }

  goToedit(user_id:number){
    this.router.navigate(['', 'user', 'update', user_id])
  }
}
