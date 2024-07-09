import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chatbet-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  form: FormGroup = this.fb.group({
    name: '',
    tname: 'ChatBet',
    email: '',
    contact: '',
    empresa: '',
    cargo: '',
    country: '',
    message: '',

  })
 
  constructor(private translate: TranslateService, private fb: FormBuilder, private toastr: ToastrService) {}

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
  }

 

  async send(){

    try {
      
      /*  emailjs.init('OGARtyjIOA2WPHZfL')
    let response = await emailjs.send ("service_c895d9m","template_worpfzp",{ */
    emailjs.init('XRmSLdGaZmvIiOkOI')
    let response = await emailjs.send("service_h0xb9ua","template_bukdjk6",{
    from_name: this.form.value.name,
    from_email: this.form.value.email,
    from_contact: this.form.value.contact,
    from_empresa: this.form.value.empresa,
    from_cargo: this.form.value.cargo,
    from_country: this.form.value.country,
    message: this.form.value.message,
    });
    if(this.currentLanguage === 'es'){
      this.toastr.success('Mensaje enviado con exito');
    } else {
      this.toastr.success('Message sent successfully');
    }

    this.form.reset();
    } catch (error) {
      if (this.currentLanguage === 'es'){
        this.toastr.error('Error al enviar el mensaje');
      } else {
        this.toastr.error('Error sending message');
      }
    }
  }

}
