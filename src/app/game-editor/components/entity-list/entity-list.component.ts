import { Component, OnInit, Input, TemplateRef } from '@angular/core';

import { GameEntity } from '../../../game-mechanics'; 

@Component({
  selector: 'rg-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit {

  @Input() template: TemplateRef<any>;
  @Input() items: GameEntity[];
  constructor() { }

  ngOnInit() {
  }

}
