import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockService } from '../services/mock.service';
import { HighchartsChartModule } from 'highcharts-angular';
import Highcharts from 'highcharts';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '../pipes/currency.pipe';

interface Investment {
  asset: string;
  quantity: number;
  price: number;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [ HighchartsChartModule, CommonModule, CurrencyPipe ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  portfolio: Investment[] = [];
  private portfolioSubscription!: Subscription;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(private mockService: MockService) {}

  ngOnInit() {
    this.portfolioSubscription = this.mockService.getPortfolioData().subscribe(data => {
      this.portfolio = data;
      this.updateChartData();
    });
  }

  updateChartData() {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: this.portfolio.map(item => item.asset)
      },
      yAxis: {
        title: {
          text: 'Price'
        }
      },
      series: [{
        type: 'column',
        name: 'Assets',
        data: this.portfolio.map(item => item.quantity * item.price)
      }],
      credits: {
        enabled: false
      }
    } 
  }

  ngOnDestroy() {
    if (this.portfolioSubscription) {
      this.portfolioSubscription.unsubscribe();
    }
  }
}
