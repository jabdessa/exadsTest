import { NgModule } from '@angular/core';

import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../shared';
import { CreateComponent } from './create/create.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent, CreateComponent],
  imports: [
    SharedModule,
    UsersRoutingModule,
    NgxDatatableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    UsersRoutingModule
  ]
})
export class UsersModule { }
