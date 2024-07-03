import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-chatbet-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {

 
  constructor(private translate: TranslateService) {}
  currentLanguage: string = 'es';

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
  }

}
