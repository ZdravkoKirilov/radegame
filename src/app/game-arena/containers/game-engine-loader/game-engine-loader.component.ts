import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { MountRef } from '@app/render-kit';
import { AppState } from '@app/core';
import { mountPixi } from '@app/engines/pixi';
import { WindowRefService } from '@app/shared';
import { Module } from '@app/game-mechanics';

import { GameArenaRoot, GameArenaRootProps } from '../../graphics';

@Component({
  selector: 'rg-game-engine-loader',
  templateUrl: './game-engine-loader.component.html',
  styleUrls: ['./game-engine-loader.component.scss'],
  providers: [],
})
export class GameEngineLoaderComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvasWrapper: ElementRef<HTMLDivElement>;

  @Input() imageAssets: Set<string>;
  @Input() module: Module;

  mount: MountRef;

  constructor(
    private store: Store<AppState>,
    private windowRef: WindowRefService,
  ) { }

  ngOnInit() {
    this.initializeGame();
  }

  ngOnDestroy() {
    this.mount.destroy();
  }

  async initializeGame() {
    const domHost = this.canvasWrapper.nativeElement;

    this.mount = await mountPixi<GameArenaRootProps>(GameArenaRoot, domHost, {
      width: this.windowRef.nativeWindow.innerWidth,
      height: this.windowRef.nativeWindow.innerHeight,
      props: { store: this.store, module: this.module },
      assets: this.imageAssets
    });
  }

}
