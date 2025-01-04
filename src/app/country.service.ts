// Import required dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Injectable Decorator makes this class as available to be injected in the root
@Injectable({
  providedIn: 'root'
})

export class CountryService {
  // Base URL for World Bank API
  private baseUrl = 'https://api.worldbank.org/v2/country';

  // Inject HttpClient service to make HTTP requests
  constructor(private http: HttpClient) { }

  // Method that fetches country data from World Bank API
  getCountryData(countryCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${countryCode}?format=json`);
  }
}