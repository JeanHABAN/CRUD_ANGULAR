import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { AddComponent } from './add.component';
import { UpdateComponent } from './update.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'', component: ListComponent, pathMatch:'full'},
      {path:'add', component: AddComponent},
      {path:'update/:user_id', component: UpdateComponent},
     
    ])
  ]
})
export class UserModule { }
