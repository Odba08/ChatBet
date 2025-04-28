import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './lenguage/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ChatBet';

  constructor(/* private translate: TranslateService */private languageService: LanguageService ) {
/*     this.translate.addLangs(['en', 'es']);
    const lang = this.translate.getBrowserLang();

    if (lang === 'en' || lang === 'es') {
      this.translate.setDefaultLang(lang);  
    } else {
      this.translate.setDefaultLang('es');
    } */
  }
}
