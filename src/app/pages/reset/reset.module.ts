import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './reset.component';



@NgModule({
  declarations: [ResetComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ResetModule { }
