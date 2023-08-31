import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {ListUsersComponent} from "./list-users/list-users.component";
import {AuthenticationGuard} from "./core/guards/authentication.guard";
import {ListTracesComponent} from "./list-traces/list-traces.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {ChangePassComponent} from "./change-pass/change-pass.component";
import {ListTrajetsComponent} from "./list-trajets/list-trajets.component";
import { DashbordComponent } from './dashbord/dashbord.component';
import { ListBrouillonsComponent } from './list-brouillons/list-brouillons.component';
const routes:Routes=[

  {path:"Register",component:RegistrationComponent} ,
  {path:"",component:LoginComponent},
  {path:"reset_password",component:ChangePassComponent},
  {path:"resetPassword",component:ResetPasswordComponent},
  {path:"Home",component:HomeComponent,canActivate: [AuthenticationGuard],
    children:[
      {path:"listUsers",component:ListUsersComponent ,canActivate: [AuthenticationGuard]},
      {path:"listTraces",component:ListTracesComponent,canActivate:[AuthenticationGuard]},
      {path:"listTrajets",component:ListTrajetsComponent,canActivate:[AuthenticationGuard]},
      {path:"Dachboard",component:DashbordComponent,canActivate:[AuthenticationGuard]},
      {path:"listBrouillons",component:ListBrouillonsComponent,canActivate:[AuthenticationGuard]},
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
