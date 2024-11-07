import { Component, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import emailjs from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-chatbet-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
    @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
    @ViewChild('videoElementMobile') videoElementMobile!: ElementRef<HTMLVideoElement>;

    
    options: AnimationOptions = {
      path: '../../../../assets/animation/Titulo_AnimacionV2_Esp.json',
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
  
    form: FormGroup = this.fb.group({
      name: ['', Validators.required], 
      tname: 'ChatBet',
      email: ['', [Validators.required, Validators.email]], 
      contact: ['', Validators.required], 
      empresa: ['', Validators.required], 
      cargo: ['', Validators.required], 
      country: ['', Validators.required],
      message: ['', Validators.required] 
    });
  
    imagePaths: { [key: string]: { [key: string]: string } } = {
      es: {
        img1: './assets/img/1.png',
        img2: './assets/img/2.png',
        img3: './assets/img/3.png',
        img4: './assets/img/4.png',
        img5: './assets/img/5.png',
        third: './assets/img/third-phone.png',
        second: './assets/img/second-phone.png',
        video: './assets/video/vid-es.mp4'
      },
      en: {
        img1: './assets/img/guardar/1.png',
        img2: './assets/img/guardar/2.png',
        img3: './assets/img/guardar/3.png',
        img4: './assets/img/guardar/4.png',
        img5: './assets/img/guardar/5.png',
        third: './assets/img/guardar/third-phone.png',
        second: './assets/img/guardar/second-phone.png',
        video: './assets/video/vid-es.mp4'
      }
    };
  
    currentLanguage: string = 'es';
    currentImages = this.imagePaths[this.currentLanguage];
  
    currentIndex: number = 0;
    currentIndextwo: number = 0;
  
    constructor(
      private translate: TranslateService, 
      private fb: FormBuilder, 
      private toastr: ToastrService
    ) {}
  
/*     ngOnInit() {
      setTimeout(() => {
        this.changeAnimation(); 
      }, 2800);
    } */
  
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
      if (this.currentIndextwo < 3) {
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
      this.updateVideoSource();
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

    
  
    async send() {
      if (this.form.invalid) {
        if (this.currentLanguage === 'es') {
          this.toastr.error('Por favor, complete todos los campos antes de enviar');
        } else {
          this.toastr.error('Please fill in all fields before submitting');
        }
        return;
      }
  
      try {
        emailjs.init('OGARtyjIOA2WPHZfL');
        
        let response = await emailjs.send("service_c895d9m", "template_worpfzp", {
          from_name: this.form.value.name,
          from_email: this.form.value.email,
          from_contact: this.form.value.contact,
          from_empresa: this.form.value.empresa,
          from_cargo: this.form.value.cargo,
          from_country: this.form.value.country,
          message: this.form.value.message,
        });
  
        if (this.currentLanguage === 'es') {
          this.toastr.success('Mensaje enviado con éxito');
        } else {
          this.toastr.success('Message sent successfully');
        }
  
        this.form.reset();
      } catch (error) {
        if (this.currentLanguage === 'es') {
          this.toastr.error('Error al enviar el mensaje');
        } else {
          this.toastr.error('Error sending message');
        }
      }
    }
  
    playVideo() {
      const gifImage = document.getElementById('gifImage');
      const video: HTMLVideoElement = this.videoElement.nativeElement;
  
      if (gifImage) {
        gifImage.style.display = 'none'; // Oculta el GIF
      }
      video.style.display = 'block';
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } 
      video.play();
  
      document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
          video.style.display = 'none';
          video.pause();
          video.currentTime = 0;
          if (gifImage) {
            gifImage.style.display = 'block'; // Muestra el GIF nuevamente
          }
        }
      });
    }

  /*   changeAnimation() {
      this.options = {
        path: '../../../../assets/animation/Idle.json' 
      };
    
    }
   */
    playVideoMobile() {
      const gifImageMobile = document.getElementById('gifImageMobile');
      const video: HTMLVideoElement = this.videoElementMobile.nativeElement;
  
      if (gifImageMobile) {
        gifImageMobile.style.display = 'none'; // Oculta el GIF
      }
      video.style.display = 'block';
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } 
      video.play();
  
      document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
          video.style.display = 'none';
          video.pause();
          video.currentTime = 0;
          if (gifImageMobile) {
            gifImageMobile.style.display = 'block'; // Muestra el GIF nuevamente
          }
        }
      });
    }
  
  }