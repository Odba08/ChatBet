import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotlightComponent } from './pages/spotlight/spotlight.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';

const routes: Routes = [
  {path: 'spotlight',
  component: SpotlightComponent,},
  {
    path: 'aboutus',
    component:AboutusComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatBetRoutingModule {}
