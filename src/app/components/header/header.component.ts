import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../lenguage/language.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  isScrolled = false;


  @HostListener('window:scroll', [])
    onWindowScroll() {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      this.isScrolled = scrollPosition > 50;
    }
  
    
    
    @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
    @ViewChild('videoElementMobile') videoElementMobile!: ElementRef<HTMLVideoElement>;

  constructor(
      private router: Router,
      private translate: TranslateService,
/*       private toastr: ToastrService, */
      private languageService: LanguageService // Inyectar LanguageService
    ) {}
  
    ngOnInit() {
      // Suscribirse al idioma actual y actualizar imágenes
      this.languageService.getCurrentLang().subscribe(lang => {
        this.currentLanguage = lang;
        this.currentImages = this.imagePaths[lang];
        this.updateVideoSource();
      });
    }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.languageService.setLanguage(language); // Propagar el cambio al LanguageService
    this.currentLanguage = language;
    this.currentImages = this.imagePaths[language];
    this.updateVideoSource();
    this.isMenuOpen = false;
  }

  updateVideoSource() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    const videoMobile: HTMLVideoElement = this.videoElementMobile.nativeElement;
    const sourceMobile = videoMobile.querySelector('source');
    const source = video.querySelector('source');
    if (source) {
      source.src = this.currentImages['video'];
      video.load(); 
    }
    if (sourceMobile) {
      sourceMobile.src = this.currentImages['video'];
      videoMobile.load(); 
    }
  }


  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();

    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollToAnchor(sectionId);
        }, 100); 
      });
    } else {
      this.scrollToAnchor(sectionId);
    }
  }
  
  private scrollToAnchor(sectionId: string) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = 150;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  

  imagePaths: { [key: string]: { [key: string]: string } } = {
    es: {
      img1: '../../../../assets/img/NEnEsp.png',
      img2: './assets/img/incremento.png',
      img3: '../../../../assets/HomePage/miraen.png',
      img4: '../../../../assets/Background/carrusel-es.png',
      img5: './assets/img/Frame1-es.svg',
      third: './assets/img/Frame5.png',
      second: './assets/img/second-phone.png',
      video: 'https://landing-page-chatbet.s3.us-east-1.amazonaws.com/assets/video/vid-es.mp4',
      footer: '../../../../assets/Background/footer.svg',
      footer2: '../../../../assets/Background/2footer.png',
      phoneimage: '../../../../assets/img/phone-es.png',
      Frame4: '../../../../assets/img/Frame4-es.png',
      reviewphone: '../../../../assets/Background/review-tlf2.svg',
      homepage: '../../../../assets/HomePage/imagen-inicial-es.gif',
      whatischatbet: '../../../../assets/HomePage/whatischatbet-es.png',
      beneficios: '../../../../assets/HomePage/beneficios-es.png',
      howitswork: '../../../../assets/HomePage/howitswork-es.png',
      provensucces: '../../../../assets/HomePage/provensucces-es.png',
      inversionitas:'../../../../assets/HomePage/line.png',
    },
    en: {
      img1: '../../../../assets/img/NEnEsp.png',
      img2: './assets/img/increase.png',
      img3: '../../../../assets/Icon/video.png',
      img4: '../../../../assets/Background/en-carrusel.png',
      img5: './assets/img/Frame1.svg',
      third: './assets/img/Frame5.2.png',
      second: './assets/img/guardar/second-phone.png',
      video: 'https://landing-page-chatbet.s3.us-east-1.amazonaws.com/assets/video/vid-es.mp4', // Corregir a vid-en.mp4 si existe
      footer: '../../../../assets/Background/footer-en.png',
      footer2: '../../../../assets/Background/2footer-en.png',
      phoneimage: '../../../../assets/img/phone-en.png',
      Frame4: '../../../../assets/img/Frame4.png',
      reviewphone: '../../../../assets/Background/review-en-tlf2.svg',
      homepage: '../../../../assets/HomePage/imagen-inicial-en.gif',
      whatischatbet: '../../../../assets/HomePage/whatischatbet-en.png',
      beneficios: '../../../../assets/HomePage/beneficios-en.png',
      howitswork: '../../../../assets/HomePage/howitswork-en.png',
      provensucces: '../../../../assets/HomePage/provensucces-en.png',
      inversionitas:'../../../../assets/inversionistas.png',

    },
  };

  currentLanguage: string = 'es';
  currentImages = this.imagePaths[this.currentLanguage];
}
