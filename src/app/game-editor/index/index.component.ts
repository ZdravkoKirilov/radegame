import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'rg-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private titleService: Title) {
    
    //TODO: clear store editor data and start fresh
   }

  ngOnInit() {
  }

}
