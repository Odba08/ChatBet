import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SlickCarouselModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class ChatBetModule { }

