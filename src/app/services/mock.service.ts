import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Investment {
  asset: string;
  quantity: number;
  price: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockService {
  private portfolioData: Investment[] = [];

  constructor() {}

  getPortfolioData(): Observable<Investment[]> {
    return of(this.portfolioData);
  }

  addInvestment(investment: Investment) {
    this.portfolioData.push(investment);
  }
}
