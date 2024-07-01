import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chatbet-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  constructor(private translate: TranslateService) {}
  currentLanguage: string = 'es';
 

  switchLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = language;
  }

}
