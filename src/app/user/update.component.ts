import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from './IUser.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-update',
  template: `
  <form [formGroup]="updateForm" (ngSubmit) = "updateUser()">
  <input placeholder="email" formControlName ="email"/>
  <input placeholder="first name" formControlName ="first_name"/>
  <input placeholder="last name" formControlName ="last_name"/>
  <input placeholder="picture" formControlName ="avatar"/>
  <button type="submit" [disabled] ="updateForm.invalid">update</button>
 </form>
  `,
  styles: [
  ]
})
export class UpdateComponent {
  private userService = inject(UserService)
  private notification = inject(ToastrService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

updateForm = inject(FormBuilder).group({
  id: 0,
  email:['', Validators.required],
  first_name:['', Validators.required],
  last_name:['', Validators.required],
  avatar:['', Validators.required]
})

get id(){
return  this.updateForm.get('id') as FormControl
}
get email(){
  return  this.updateForm.get('email') as FormControl
  }
  get first_name(){
    return  this.updateForm.get('first_name') as FormControl
    }

    get last_name(){
      return  this.updateForm.get('last_name') as FormControl
      }
      get avatar(){
        return  this.updateForm.get('avatar') as FormControl
        }

constructor(){
  this.userService.getUserById(Number( this.route.snapshot.paramMap.get('user_id')))
  .subscribe(response => {
    const{id, email, first_name, last_name, avatar} = response.data
    this.id.patchValue(id)
    this.email.patchValue(email)
    this.first_name.patchValue(first_name)
    this.last_name.patchValue(last_name)
    this.avatar.patchValue(avatar)
  })
}
updateUser(){
  this.userService.updateUserById(this.updateForm.value as IUser)
  .subscribe(response => console.log(response))
  this.notification.success('user updated succesfully')
  this.router.navigate(['','user'])
}
}
