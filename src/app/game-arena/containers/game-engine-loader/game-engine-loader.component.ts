import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { MountRef } from '@app/render-kit';
import { AppState } from '@app/core';
import { mountPixi } from '@app/engines/pixi';
import { GameArenaRoot } from '@app/game-mechanics';

@Component({
  selector: 'rg-game-engine-loader',
  templateUrl: './game-engine-loader.component.html',
  styleUrls: ['./game-engine-loader.component.scss']
})
export class GameEngineLoaderComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvasWrapper: ElementRef<HTMLDivElement>;

  mount: MountRef;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.initializeGame();
  }

  ngOnDestroy() {
    this.mount.destroy();
  }

  async initializeGame() {
    const domHost = this.canvasWrapper.nativeElement;

    this.mount = await mountPixi(GameArenaRoot, domHost, {
      width: 1000,
      height: 1000,
    });
  }

}
