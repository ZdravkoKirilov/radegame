import { Injectable } from '@angular/core';

import { WindowRefService } from '@app/core';
import { Renderer, CanvasRenderer, Container } from 'pixi.js';
import { createRenderer, PixiEngine, createElement, Component } from '@app/rendering';
import { Subscription } from 'rxjs';

import { RootComponent, Props as BoardData } from '../components/board/graphics';
import { LocationEntity } from '@app/game-mechanics';

@Injectable({
  providedIn: 'root'
})
export class BoardEditService {

  private renderer: Renderer | CanvasRenderer;
  private rootComponent: Component;

  subs: Subscription[];

  constructor(private windowRef: WindowRefService) {
  }

  update(data: BoardData) {
    this.rootComponent && this.rootComponent.setProps(data);
  }

  extractAssets(locations: LocationEntity[]): Set<string> {
    return new Set(locations.map(elem => elem.image));
  }

  initialize(DOMElem: HTMLDivElement, data?: BoardData) {
    const width = this.windowRef.nativeWindow.innerWidth;
    const height = this.windowRef.nativeWindow.innerHeight;
    const stage = new Container();

    this.renderer = new Renderer(width, height, { transparent: true, antialias: true, resolution: 1 });
    this.renderer.autoResize = true;

    DOMElem.appendChild(this.renderer.view);

    const assets = this.extractAssets(data.locations);

    this.render(stage, data, assets);
    this.startRenderLoop(stage);
  }

  render(stage: Container, data = {}, assets: Set<string>) {

    const render = createRenderer(PixiEngine, assets);
    render(createElement(RootComponent, data), stage).then((component: Component) => {
      console.log(component);
      this.rootComponent = component;
      component.update();
    });
  }

  startRenderLoop(stage: Container) {
    setInterval(() => {
      requestAnimationFrame(() => {
        this.renderer.render(stage);
      });
    });
  }
}
