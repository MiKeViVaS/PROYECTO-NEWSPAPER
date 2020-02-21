import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

import { ErrorComponent } from './views/error/error.component';
import { NewComponent } from './views/new/new.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'view/:id', component: NewComponent},
  {path: 'error', component: ErrorComponent},
  {path: '*', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
