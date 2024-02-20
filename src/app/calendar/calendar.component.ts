import {Component, Injectable} from '@angular/core';
import { AfterViewInit, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import * as echarts from 'echarts/core';
import { DatePipe } from '@angular/common';
import {DateAdapter, provideNativeDateAdapter} from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TitleComponent, TitleComponentOption, GridComponent, GridComponentOption, DataZoomComponent, DataZoomComponentOption } from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { isPlatformBrowser } from '@angular/common';

echarts.use([TitleComponent, GridComponent, DataZoomComponent, BarChart, CanvasRenderer]);

@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -0);
      const end = this._dateAdapter.addCalendarDays(date, 5);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
      
    },
    provideNativeDateAdapter(),
    DatePipe,
  ],
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule],
})
export class CalendarComponent implements AfterViewInit  {
 

  private myChart: echarts.ECharts | null = null;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: any,
  @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY) private dateRangeStrategy: FiveDayRangeSelectionStrategy<Date>,
  private datePipe: DatePipe,) {}

  ngAfterViewInit() {
    console.log('AfterViewInit - EChartsComponent');
    
    if (isPlatformBrowser(this.platformId)) {
      this.initializeChart();
      this.updateChart();
    }
  }

  private initializeChart() {
    const chartElement = this.renderer.selectRootElement('#myChart');
  this.myChart = echarts.init(chartElement);
  
  console.log('Chart Element:', chartElement);
  }

  
  private updateChart() {
    console.log("echarts");
    if (this.myChart) {
      // Your ECharts code here
        // Get the selected date range from the strategy
    const dateRange = this.dateRangeStrategy.selectionFinished(null);
    
    // Update dataAxis based on the date range
    //const dataAxis = this.generateDataAxis(dateRange);
      const dataAxis = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
      const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220, 234, 290, 330, 310, 123, 442, 321, 90, 149,23];
      const yMax = 500;
      const dataShadow = [];

      for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }

      const option = {
        title: {
          text: 'Sample Graph',
          subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: (params: any) => {
              // Customize itemStyle based on the condition
              const value = params.data;
              return {
                color: value> 400 ? 'red' : 'blue',
                // Additional styling properties...
              };
            },
            emphasis: {
              itemStyle: {
                color: 'red',
                // Additional styling properties...
              }
            },
            data: data
          }
        ]
      };

      // Enable data zoom when the user clicks on the bar.
      const zoomSize = 6;
      this.myChart.on('click', (params: any) => {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        this.myChart?.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
      });

      option && this.myChart.setOption(option);
    }
  }

  private generateDataAxis(dateRange: DateRange<Date>): string[] {
  
    const dataAxis: string[] = [];
    const startDate = dateRange.start;
  
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(startDate?.getTime() ?? 0);
      currentDate.setDate(currentDate.getDate() + i);
      
      const formattedDate = currentDate?.toLocaleDateString(undefined, { day: 'numeric' });
       dataAxis.push(formattedDate ?? ''); 
    }
  
    return dataAxis;
  }

}