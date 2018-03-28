import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

import { GameEntity } from '../../../game-mechanics';

@Component({
  selector: 'rg-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit {

  @Input() template: TemplateRef<any>;
  @Input() items: GameEntity[];

  @Output() editItem: EventEmitter<GameEntity> = new EventEmitter();
  @Output() removeItem: EventEmitter<GameEntity> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
