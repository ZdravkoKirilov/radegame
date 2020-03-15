import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { MountRef } from '@app/render-kit';
import { AppState } from '@app/core';
import { mountPixi } from '@app/engines/pixi';
import { WindowRefService } from '@app/shared';
import { GameBroadcastService } from 'app/game-mechanics/services/game-broadcast/game-broadcast.service';
import { ActionProcessorService } from 'app/game-mechanics/services/action-processor/action-processor.service';
import { GameArenaRoot } from '../../graphics/containers/root';

@Component({
  selector: 'rg-game-engine-loader',
  templateUrl: './game-engine-loader.component.html',
  styleUrls: ['./game-engine-loader.component.scss'],
  providers: [GameBroadcastService, ActionProcessorService],
})
export class GameEngineLoaderComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvasWrapper: ElementRef<HTMLDivElement>;
  @Input() imageAssets: Set<string>;
  @Input() gameName: string;

  mount: MountRef;

  constructor(
    private store: Store<AppState>,
    private windowRef: WindowRefService,
    private broadcast: GameBroadcastService,
  ) { }

  ngOnInit() {
    if (this.gameName) {
      this.broadcast.initConnection(this.gameName);
    }
    this.initializeGame();
  }

  ngOnDestroy() {
    this.broadcast.closeConnection();
    this.mount.destroy();
  }

  async initializeGame() {
    const domHost = this.canvasWrapper.nativeElement;

    this.mount = await mountPixi(GameArenaRoot, domHost, {
      width: this.windowRef.nativeWindow.innerWidth,
      height: this.windowRef.nativeWindow.innerHeight,
      props: { store: this.store, dispatcher: this.broadcast },
      assets: this.imageAssets
    });
  }

}
