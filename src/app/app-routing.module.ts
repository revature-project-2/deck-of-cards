import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {BlackjackComponent} from './components/blackjack/blackjack.component';
import {MenuComponent} from './components/menu/menu.component';
import {MygamesComponent} from './components/mygames/mygames.component';
import {AuthGuard} from './helper/auth.guard';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'blackjack', component: BlackjackComponent, canActivate: [AuthGuard]},
  {path: 'mygames', component: MygamesComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
