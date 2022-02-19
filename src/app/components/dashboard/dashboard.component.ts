import { Component, OnInit } from '@angular/core';
import { CustomerDataService } from 'src/app/providers/customer-data.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  monthlySalesData: any;
  regionalMonthlySalesData: any;
  activeRegion: string = '';

  title = 'test-insurance';

  constructor(private customerDataService: CustomerDataService) {}

  ngOnInit() {
    this.getMonthlySalesChartData();
    this.getRegionalData('North');
  }

  //fetching data from service to display in bar chart
  getMonthlySalesChartData() {
    this.monthlySalesData = this.customerDataService.getMonthlyPolicySales();
    let months: any[] = [];
    let sales: any[] = [];

    //iterating through data to create meta data for graph
    this.monthlySalesData.forEach(
      (element: { month: any; recordCount: any }) => {
        months.push(element.month);
        sales.push(element.recordCount);
      }
    );

    const dataMonthlySalesChart: any = {
      labels: months,
      series: [sales],
    };

    let optionsMonthlySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 250,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    let responsiveOptions: any[] = [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value: any[]) {
              return value[0];
            },
          },
        },
      ],
    ];

    let monthlySalesChart = new Chartist.Bar(
      '#monthlySalesChart',
      dataMonthlySalesChart,
      optionsMonthlySalesChart,
      responsiveOptions
    );

    this.startAnimationForBarChart(monthlySalesChart);
  }

  //fetching data from service to display in line chart on basis of selected region
  getRegionalData(region: string) {
    this.activeRegion = region;
    this.regionalMonthlySalesData =
      this.customerDataService.getRegionalMonthlySales();
    let activeRegionData = this.regionalMonthlySalesData.filter(
      (x: { region: any }) => x.region === region
    );

    //iterating through data to create meta data for graph
    let months: any[] = [];
    let sales: any[] = [];
    activeRegionData.forEach((element: { month: any; recordCount: any }) => {
      months.push(element.month);
      sales.push(element.recordCount);
    });

    let dataRegionalSalesChart = {
      labels: months,
      series: [sales],
    };
    const optionsRegionalSalesChart: any = {
      axisX: {
        showGrid: true,
      },
      low: 0,
      high: 150,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    let responsiveOptions: any[] = [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value: any[]) {
              return value[0];
            },
          },
        },
      ],
    ];

    let regionalSalesChart = new Chartist.Line(
      '#regionalSalesChart',
      dataRegionalSalesChart,
      optionsRegionalSalesChart,
      responsiveOptions
    );

    this.startAnimationForLineChart(regionalSalesChart);
  }

  startAnimationForLineChart(chart: Chartist.IChartistLineChart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data: any) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }
  
  startAnimationForBarChart(chart: Chartist.IChartistBarChart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data: any) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }
}
