import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Activity } from '../../../../game-mechanics/models/index';

@Component({
  selector: 'rg-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameActionsListComponent {

  @Input() items: Activity[];

  @Output() editItem: EventEmitter<Activity> = new EventEmitter();
  @Output() removeItem: EventEmitter<Activity> = new EventEmitter();

  constructor() { }

}
