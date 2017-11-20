import { Component, OnInit } from '@angular/core';
import {UserPresenceService} from "../user-presence.service";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent  {

  public doughnutChartLabels:string[] = ['ONLINE', 'OFFLINE', 'AWAY'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'REAL TIME PRESENCE DIAGRAM'
    }
  };

  constructor( public userPresence: UserPresenceService){
    this.userPresence.states
      .debounceTime(500)
      .subscribe(
      res => { this.doughnutChartData = res}
    )
  }


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
