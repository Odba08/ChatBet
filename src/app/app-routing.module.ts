import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './Chat-Bet/pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'chat-bet',
    loadChildren: () => import('./Chat-Bet/chat-bet.module').then(m => m.ChatBetModule)
  }

];

const RouterOptions: ExtraOptions = {
 scrollPositionRestoration: 'top', 
 anchorScrolling: 'enabled',

}

@NgModule({
  imports: [RouterModule.forRoot(routes, RouterOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
