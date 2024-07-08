import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SlickCarouselModule,
    ReactiveFormsModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class ChatBetModule { }

