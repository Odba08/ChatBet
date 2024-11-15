import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { LottieComponent, provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SlickCarouselModule,
    LottieComponent,
    ReactiveFormsModule,

  ],
  exports: [
    MainPageComponent
  ],
  providers: [
    provideLottieOptions({
      player: playerFactory,
    }),
  ],
})
export class ChatBetModule { }

