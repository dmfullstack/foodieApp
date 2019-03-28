import { Restaurant } from './../restaurant';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'res-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input()
  restaurants: Restaurant[];

  @Output()
  detail = new EventEmitter();
  
  constructor() { }

  ngOnInit() {

  }

  viewDetail(restaurant: Restaurant){
    console.log('clicked');
    this.detail.emit(restaurant);
  }

}
