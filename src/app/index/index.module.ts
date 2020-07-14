import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index/index.component';
import { IndexCardComponent } from './index-card/index-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [IndexComponent, IndexCardComponent],
  imports: [CommonModule, IndexRoutingModule, MatCardModule],
})
export class IndexModule {}
