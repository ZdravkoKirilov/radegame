import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { ConnectedEntities, FormDefinition } from '@app/dynamic-forms';
import { AppState } from '@app/core';
import { GameId, ModuleId, VersionId } from '@app/game-mechanics';

import { getEntities, getEntityForm } from '../../state';

@Component({
  selector: 'rg-node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.scss']
})
export class NodeEditorComponent implements OnInit {

  formDefinition$: Observable<FormDefinition>;
  connectedEntities$: Observable<ConnectedEntities>;

  loading: boolean;
  gameId: GameId;
  versionId: VersionId;
  moduleId: ModuleId;

  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.formDefinition$ = this.store.pipe(select(getEntityForm));
    this.connectedEntities$ = this.store.pipe(select(getEntities));
  }

  saveNode() {

  }

  deleteNode() {

  }

}
