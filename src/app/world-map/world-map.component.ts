// Import required dependencies
import { Component } from '@angular/core';
import { CountryService } from '../country.service';

// Interface for country data structure
interface CountryData {
  name: string;
  capital: string;
  region: string;
  incomeLevel: string;
  longitude: string;
  latitude: string;
}
// Component Decorator configures metadata for Angular components
@Component({
  selector: 'app-world',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent {
  // Initialize empty country data object
  countryData: CountryData = {} as CountryData;

  constructor(private countryService: CountryService) {}

  // Handle mouse hover event on SVG elements
  onCountryHover({ target }: MouseEvent): void {
    const countryId = (target as SVGPathElement)?.id;
    if (countryId) this.fetchCountryData(countryId);
  }

  // Reset country data when mouse leaves
  onCountryLeave(): void {
    this.countryData = {} as CountryData;
  }

  // Fetch country data from API
  private fetchCountryData(countryCode: string): void {
    this.countryService.getCountryData(countryCode).subscribe({
      next: (response) => {
        const data = response?.[1]?.[0];
        if (data) {
          this.countryData = {
            name: data.name,
            capital: data.capitalCity,
            region: data.region.value,
            incomeLevel: data.incomeLevel.value,
            longitude: data.longitude,
            latitude: data.latitude
          };
        }
      },
      error: (error) => console.error('Error fetching country data:', error)
    });
  }
}