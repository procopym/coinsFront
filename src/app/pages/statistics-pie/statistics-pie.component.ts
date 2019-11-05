import {Component, OnInit} from '@angular/core';
import {ChartType, ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {userId} from "../../config/config";

interface StatsRec {
  r_category_name: string,
  r_tot_amount: number,
  r_from_date: string,
  r_to_date: string
}

@Component({
  selector: 'app-statistics-pipe',
  templateUrl: './statistics-pie.component.html',
  styleUrls: ['./statistics-pie.component.css']
})
export class StatisticsPieComponent implements OnInit {
  maxDate = new Date();
  statsRec: StatsRec[];
  request: FormGroup;
  period: string;

// Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
    plugins: {
      dataLabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [{backgroundColor: [],},];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.iniForm();
    this.initStats()
  }

  get dateControl() {
    return this.request.get('date');
  }

  get radioBtnControl() {
    return this.request.get('radioBtn');
  }

  private iniForm() {
    const date = this.maxDate;
    const radioBtn = "0";
    this.request = new FormGroup({
      date: new FormControl(date, [Validators.required]),
      radioBtn: new FormControl(radioBtn, [Validators.required])
    });
  }

  private initStats(): void {
    this.api.getStatsPerMonth({
      userId: userId,
      transactionType: (Number(this.request.value.radioBtn) || 0),
      pivotDate: this.getDate(this.request.value.date || this.maxDate)
    }).subscribe((response: { success, data }) => {
      if (response.success) {
        this.statsRec = response.data;
        this.initCanvas();
      }
    });
  }

  private initCanvas(): void {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.pieChartColors[0].backgroundColor = [];
    this.period = this.statsRec.length > 0 ? this.statsRec[0].r_from_date + '  -  ' + this.statsRec[0].r_to_date : null;
    this.statsRec.forEach(el => {
      // console.log(el);
      this.pieChartLabels.push(el.r_category_name);
      this.pieChartData.push(el.r_tot_amount);
      this.pieChartColors[0].backgroundColor.push(`rgb(${this.getRandomInt(256, 120)},${this.getRandomInt(256, 120)},${this.getRandomInt(256, 120)}, 0.7)`);
    });
  }

  public getDate(date) {
    let dateObj = new Date(date);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
  }

  onReset() {
    this.iniForm();
    this.initStats();
  }

  onSubmit() {
    if (this.request.valid) {
      this.initStats();
    }
  }

  private getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * Math.floor(max - min) + Math.floor(min));
  }

  // events
  public chartClicked(event: MouseEvent): void {
    this.pieChartLegend = !this.pieChartLegend;
    console.log("Hello from @mihaiprocopi");
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLegendPosition() {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'right' : 'left';
  }

}
