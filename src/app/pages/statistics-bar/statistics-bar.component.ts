import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Label} from 'ng2-charts';
import {ApiService} from "../../services/api.service";
import {userId} from "../../config/config";
import {FormControl, FormGroup, Validators} from "@angular/forms";

interface recByYear {
  r_period: string,
  r_data_type: string,
  r_amount: number
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './statistics-bar.component.html',
  styleUrls: ['./statistics-bar.component.css'],
})
export class StatisticsBarComponent implements OnInit {
  maxDate = new Date();
  statsRec: recByYear[];
  dataIncome: number[];
  dataOutcome: number[];
  request: FormGroup;


  // subscriber: any;
  public barChartOptions: ChartOptions = {
    responsive: true,

    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [{}];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.iniForm();
    this.initStats();
  }

  get dateControl() {
    return this.request.get('date');
  }

  private iniForm(): void {
    const date = this.maxDate;
    // console.log(date);
    this.request = new FormGroup({
      date: new FormControl(date, [Validators.required])
    });
  }

  public getDate(date) {
    let dateObj = new Date(date);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  private initCanvas(): ChartDataSets[] {
    this.dataIncome = [];
    this.dataOutcome = [];
    this.barChartLabels = [];
    this.statsRec.forEach(el => {
      this.barChartLabels.push(el.r_period);
    });
    this.statsRec.forEach(el => {
      if (el.r_data_type === "income") {
        this.dataIncome.push(el.r_amount);
      }
      if (el.r_data_type === "outcome") {
        this.dataOutcome.push(el.r_amount);
      }

      if (this.dataIncome.length < this.dataOutcome.length) {
        this.dataIncome.push(null);
      } else if (this.dataIncome.length > this.dataOutcome.length) {
        this.dataOutcome.push(null);
      }
    });
    return [
      {data: this.dataIncome, label: 'Income'},
      {data: this.dataOutcome, label: 'Outcome'}
    ]
  }

  private initStats(): void {
    this.api.getStatsByYear({
      userId: userId,
      pivotDate: this.getDate(this.request.value.date || this.maxDate)
    }).subscribe((response: { success, data }) => {
      if (response.success) {
        this.statsRec = response.data;
        this.barChartData = this.initCanvas();
      }
    });
  }

  onSubmit() {
    if (this.request.valid) {
      this.initStats();
    }
  }

  onReset() {
    this.iniForm();
    this.initStats();
  }
}
