import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { IUser } from './IUser.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  template: `
    <form [formGroup]="addForm" (ngSubmit) = "addNewUser()">
     <input placeholder="email" formControlName ="email"/>
     <input placeholder="first name" formControlName ="first_name"/>
     <input placeholder="last name" formControlName ="last_name"/>
     <input placeholder="picture" formControlName ="avatar"/>
     <button type="submit" [disabled] ="addForm.invalid">add</button>
    </form>
  `,
  styles: [
  ]
})
export class AddComponent {

  private userService = inject(UserService)
  private notification = inject(ToastrService)
  private router = inject(Router)
addForm = inject(FormBuilder).group({
  email:['', Validators.required],
  first_name:['', Validators.required],
  last_name:['', Validators.required],
  avatar:['', Validators.required]
})

addNewUser(){
  this.userService.addUser(this.addForm.value as IUser)
  .subscribe(response => console.log(response))
  this.notification.success('user added succesfully')
  this.router.navigate(['','user'])
}
}
