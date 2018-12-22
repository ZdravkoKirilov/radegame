import {
  Component, ChangeDetectionStrategy, Input, TemplateRef,
  EventEmitter, Output,
} from '@angular/core';

import { GameEntity } from '@app/game-mechanics';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';

@Component({
  selector: 'rg-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityViewComponent {
  @Input() template: TemplateRef<any>;

  @Input() showEditor: boolean = false;
  @Input() selectedItem: GameEntity;
  @Input() items: GameEntity[];
  @Input() formDefinition: FormDefinition;
  @Input() connectedEntities: ConnectedEntities;

  @Output() toggleEditor: EventEmitter<boolean> = new EventEmitter();
  @Output() editItem: EventEmitter<GameEntity> = new EventEmitter();
  @Output() saveItem: EventEmitter<GameEntity> = new EventEmitter();
  @Output() removeItem: EventEmitter<GameEntity> = new EventEmitter();

  showItemEditor() {
    this.toggleEditor.emit(true);
  }

  hideItemEditor() {
    this.toggleEditor.emit(false);
  }
}
