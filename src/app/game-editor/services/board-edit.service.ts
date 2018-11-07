import { Injectable } from '@angular/core';

import { WindowRefService } from '@app/core';
import { Renderer, CanvasRenderer, Container } from 'pixi.js';
import { createRenderer, PixiEngine, createElement, Component } from '@app/rendering';
import { Stage, Field, Path } from '@app/game-mechanics';
import { Subscription } from 'rxjs';
import { Root } from '@app/game-arena';

@Injectable({
  providedIn: 'root'
})
export class BoardEditService {

  private renderer: Renderer | CanvasRenderer;
  private rootComponent: Component;

  fields: Array<Field>;
  locations: Array<Location>;
  paths: Array<Path>;
  stage: Stage;
  selectedField: Field;
  selectedPath: Path;

  subs: Subscription[];

  constructor(private windowRef: WindowRefService) {
  }

  initialize(DOMElem: HTMLDivElement) {
    const width = this.windowRef.nativeWindow.innerWidth;
    const height = this.windowRef.nativeWindow.innerHeight;
    const stage = new Container();

    this.renderer = new Renderer(width, height, { transparent: true, antialias: true, resolution: 1 });
    this.renderer.autoResize = true;

    DOMElem.appendChild(this.renderer.view);

    this.render(stage);
    this.startRenderLoop(stage);
  }

  render(stage: Container) {
    const assets = new Set(['https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg']);

    const render = createRenderer(PixiEngine, assets);
    render(createElement(Root, {}), stage).then((component: Component) => {
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
