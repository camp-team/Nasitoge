import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top/top.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [TopComponent],
  imports: [
    CommonModule,
    TopRoutingModule,
    MatButtonModule,
    MatToolbarModule,

  ],

})
export class TopModule { }
