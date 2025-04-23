import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnChanges, OnDestroy, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

interface bestGradesSlider {
  description: string;
  imageUrl: string;
  title: string;
  gallery?: galleryModel[];
}

interface galleryModel {
  img: string;
}

@Component({
  imports: [NgFor],
  selector: 'app-carousel-slider',
  standalone: true,
  templateUrl: './carousel-slider.component.html',
  styleUrl: './carousel-slider.component.scss'
})
export class CarouselSliderComponent implements AfterViewInit, OnDestroy, OnChanges {
  public showModal = false;
  public selectedImageUrle: string | null = null;
  private platformId = inject(PLATFORM_ID);
  public currentThumbnailSlide!: number;

  @Input()
  public gallery: Array<bestGradesSlider> = [];
  public selectedGallery: Array<galleryModel> = [];

  @ViewChild('sliderRef')
  public sliderRef!: ElementRef<HTMLElement>;

  @ViewChild('sliderThumbnailRef')
  public sliderThumbnailRef!: ElementRef<HTMLElement>;

  @ViewChild('thumbnailRef')
  public thumbnailRef!: ElementRef<HTMLElement>;

  @ViewChild('thumbnailSliderRef')
  public ThumbnailSliderRef!: ElementRef<HTMLElement>;

  public currentSlide!: number;
  public dotHelper: Array<number> = [];
  public thumbnailDotHelper: Array<number> = [];
  public slider!: KeenSliderInstance;
  public thumbnailSlider!: KeenSliderInstance;

  ngOnChanges(changes: SimpleChanges): void {
    // Detectar cambios en el @Input gallery
    if (changes['gallery'] && this.slider && isPlatformBrowser(this.platformId)) {
      this.slider.destroy(); // Destruir el slider actual
      this.initSlider(); // Reinicializar el slider
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initSlider(); // Inicializar el slider por primera vez
    }
  }
  private initSlider(): void {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      renderMode: 'precision',
      initial: 0,
      slides: {
        perView: 1,
        spacing: 5
      },
      breakpoints: {
        '(min-width: 900px)': { slides: { perView: 1, spacing: 5 } },
        '(min-width: 901px)': { slides: { perView: 3, spacing: 5 } },
      },
      slideChanged: (s) => {
        this.currentSlide = s.track.details.rel;
      },
    });
    this.dotHelper = [...Array(this.slider.track.details.slides.length).keys()];
    setTimeout(() => {
      this.slider.update(); // Forzar actualización de KeenSlider
    }, 0);
  }
  selectGallery(gallery: galleryModel[]) {
    this.selectedGallery = gallery;
    this.showModal = true;

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.thumbnailSlider = new KeenSlider(this.thumbnailRef.nativeElement, {
          loop: true,
          renderMode: 'precision',
          initial: 0,
          slides: {
            perView: 1, // Por defecto, 1 slide en móvil
            spacing: 10
          },
          breakpoints: {
            '(min-width: 300px)': { slides: { perView: 1, spacing: 10 } },
            '(min-width: 700px)': { slides: { perView: 2, spacing: 10 } },
            '(min-width: 869px)': { slides: { perView: 3, spacing: 10 } },
            '(min-width: 1280px)': { slides: { perView: 4, spacing: 10 } },
          },
          slideChanged: (s) => {
            this.currentThumbnailSlide = s.track.details.rel;
          },
        });

        this.thumbnailDotHelper = [...Array(this.thumbnailSlider.track.details.slides.length).keys()];
      }, 0);
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedImageUrle = null;

    if (this.thumbnailSlider) {
      this.thumbnailSlider.destroy();
      this.thumbnailSlider = null!;
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.slider) this.slider.destroy();
      if (this.thumbnailSlider) this.thumbnailSlider.destroy();
    }
  }
}