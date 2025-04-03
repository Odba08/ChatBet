import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../lenguage/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'] // Corregido a styleUrls
})
export class FooterComponent implements OnInit {
  currentImages: any;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.getCurrentLang().subscribe(lang => {
      this.updateFooterImages(lang);
    });
  }

  updateFooterImages(lang: string) {
    
    this.currentImages = {
      footer: `assets/Background/footer-${lang}.svg`,
      footer2: `assets/Background/2footer-${lang}.png`
    };
  }
}