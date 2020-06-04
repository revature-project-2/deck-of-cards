import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {BlackjackComponent} from './components/blackjack/blackjack.component';
import {MenuComponent} from './components/menu/menu.component';
import {MygamesComponent} from './components/mygames/mygames.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: MenuComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'blackjackComponent', component: BlackjackComponent},
  {path: 'mygames', component: MygamesComponent},
  {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
