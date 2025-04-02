import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
isMenuOpen: boolean = false;
constructor(
      private translate: TranslateService, 

    ) {}

  imagePaths: { [key: string]: { [key: string]: string } } = {
    es: {
      img1: '../../../../assets/img/Enespañol.png',
      img2: './assets/img/Frame7.png',
      img3: '../../../../assets/Icon/video.png',
      img4: '../../../../assets/Background/review2.svg',
      img5: './assets/img/Frame1-es.svg',
      third: './assets/img/Frame5.png',
      second: './assets/img/second-phone.png',
      video: 'https://landing-page-chatbet.s3.us-east-1.amazonaws.com/assets/video/vid-es.mp4',
      footer: '../../../../assets/Background/footer.svg',
      footer2: '../../../../assets/Background/2footer.png',
      phoneimage: '../../../../assets/img/phone-es.png',
      Frame4: '../../../../assets/img/Frame4-es.png',
      reviewphone: '../../../../assets/Background/review-tlf2.svg'

    },
    en: {
      img1: '../../../../assets/img/Eningles.png',
      img2: './assets/img/Frame7.en.png',
      img3: '../../../../assets/Icon/video-en.png',
      img4: '../../../../assets/Background/review-en2.svg',
      img5: './assets/img/Frame1.svg',
      third: './assets/img/Frame5.2.png',
      second: './assets/img/guardar/second-phone.png',
      video: 'https://landing-page-chatbet.s3.us-east-1.amazonaws.com/assets/video/vid-es.mp4',
      footer: '../../../../assets/Background/footer-en.png',
      footer2: '../../../../assets/Background/2footer-en.png',
      phoneimage: '../../../../assets/img/phone-en.png',
      Frame4: '../../../../assets/img/Frame4.png',
      reviewphone: '../../../../assets/Background/review-en-tlf2.svg'

    }
  };

  currentLanguage: string = 'es';
  currentImages = this.imagePaths[this.currentLanguage];

  options: AnimationOptions = {
        path: '../../../../assets/animation/lottieesp.json',
        renderer: 'svg',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
  
      secondoptions: AnimationOptions = {
        path: '../../../../assets/animation/Title_AnimationV2.json',
        renderer: 'svg',
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      }
  
      switchLanguage(language: string) {
        this.translate.use(language);
        this.currentLanguage = language;
        this.currentImages = this.imagePaths[this.currentLanguage];
        this.isMenuOpen = false;
      }
}
