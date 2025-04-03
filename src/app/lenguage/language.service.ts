import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  private currentLang = new BehaviorSubject<string>('es');

  
  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

    private initializeLanguage() {
  this.translate.addLangs(['en', 'es']);
  const browserLang = this.translate.getBrowserLang();
  const savedLang = localStorage.getItem('chatbet-lang');

  const langToUse = savedLang && ['en', 'es'].includes(savedLang)
    ? savedLang
    : (browserLang && ['en', 'es'].includes(browserLang) ? browserLang : 'es');

  this.setLanguage(langToUse as string);
}
  setLanguage(lang: string) {
    this.currentLang.next(lang);
   /*  this.translate.setDefaultLang(lang); */
    this.translate.use(lang);
    localStorage.setItem('chatbet-lang', lang);
  }

  getCurrentLang() {
    return this.currentLang.asObservable();
  }
}