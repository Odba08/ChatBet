import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-chatbet-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {

 
  constructor(private translate: TranslateService) {}

  imagePaths: { [key: string]: { [key: string]: string } } = {
    es: {
      img1: './assets/img/1.png',
      img2: './assets/img/2.png',
      img3: './assets/img/3.png',
      img4: './assets/img/4.png',
      img5: './assets/img/5.png',
      third: './assets/img/third-phone.png',
      second: './assets/img/second-phone.png',

    },
    en: {
      img1: './assets/img/guardar/1.png',
      img2: './assets/img/guardar/2.png',
      img3: './assets/img/guardar/3.png',
      img4: './assets/img/guardar/4.png',
      img5: './assets/img/guardar/5.png',
      third: './assets/img/guardar/third-phone.png',
      second: './assets/img/guardar/second-phone.png',
    }
  };
  currentLanguage: string = 'es';
  currentImages = this.imagePaths[this.currentLanguage];

  currentIndex: number = 0;
  currentIndextwo: number = 0;

 nextParagraph() {
  if (this.currentIndex < 3) {
    this.currentIndex++;
    console.log('Next paragraph:', this.currentIndex);
  }
 
}

prevParagraph() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    console.log('Previous paragraph:', this.currentIndex);
  }
  
}

nextParagraptwo() {
  if (this.currentIndextwo < 2) {
    this.currentIndextwo++;
    console.log('Next paragraph:', this.currentIndextwo);
  }
}

prevParagraphtwo() {
  if (this.currentIndextwo > 0) {
    this.currentIndextwo--;
    console.log('Previous paragraph:', this.currentIndextwo);
  }
}

  switchLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = language;
    this.currentImages = this.imagePaths[this.currentLanguage];
  }

}
