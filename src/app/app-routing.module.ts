import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './Authhome/auth.guard';
import { CreatenoteComponent } from './Components/createnote/createnote.component';

const routes: Routes = [
  {path: 'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
    {path:'reset/:token',component:ResetpasswordComponent},
    {path:'forget',component:ForgetpasswordComponent},
    {path:'home',component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {path:'reg',component:RegisterComponent}
      ]},
      {path:'addnote',component:CreatenoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
