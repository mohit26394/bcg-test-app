import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { CustomerDataService } from './providers/customer-data.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddEditPolicyComponent } from './components/add-edit-policy/add-edit-policy.component';

import { AppRoutingModule } from './app.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PolicyListComponent,
    SidebarComponent,
    AddEditPolicyComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CustomerDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
