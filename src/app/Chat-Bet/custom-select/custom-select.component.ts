import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent {
  @Input() countries: any[] = [];
  @Output() countrySelected = new EventEmitter<any>();

  searchControl = new FormControl(''); 
  isOpen = false;
  selectedCountry: any = null;
  searchText = '';
  filteredCountries: any[] = [];
  dialCode : string | null = null;

  constructor(private elementRef : ElementRef) {
    this.searchControl.valueChanges.subscribe((value) => {
      this.filterCountries(value || '');
    });
  }

  @HostListener('document:click', ['$event'])
  onClick( event: MouseEvent){
    if (!this.elementRef.nativeElement.contains(event.target)){
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.filteredCountries = this.countries; 
    }
  }

 
  filterCountries( searchText: string) {
    this.filteredCountries = this.countries.filter((country) =>
      country.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  
  selectCountry(country: any) {
    this.selectedCountry = country;
    this.isOpen = false;
    this.countrySelected.emit(country);
    this.dialCode;
  }
}