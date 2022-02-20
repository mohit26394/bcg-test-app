import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEditPolicyComponent } from './components/add-edit-policy/add-edit-policy.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  }, 
  {
    path: 'policy-list',
    component: PolicyListComponent,
  },
  {
    path: 'add-edit-policy',
    component: AddEditPolicyComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
