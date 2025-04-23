import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
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
export class CarouselSliderComponent implements AfterViewInit, OnDestroy {
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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        loop: true,
        renderMode: 'precision',
        initial: 0,
        breakpoints: {
          '(min-width: 900px)': { slides: { perView: 4, spacing: 10 } },
          '(min-width: 901px)': { slides: { perView: 4, spacing: 10 } },
        },
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel;
        },
      });
      this.dotHelper = [...Array(this.slider.track.details.slides.length).keys()];
    }
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
      });
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
