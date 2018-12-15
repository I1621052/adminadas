import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html'
})
export class GraficoDonaComponent implements OnInit {
 
  @Input('ChartLabels') public ChartLabels:string[] = [];
  @Input('ChartData') public ChartData:number[] = [];
  @Input('ChartType') public ChartType:string = '';
  constructor() { }

  ngOnInit() {
  }

}
