import { Injectable } from '@angular/core';

import { WindowRefService } from '@app/core';
import { autoDetectRenderer, Renderer, CanvasRenderer, Container } from 'pixi.js';
import { createRenderer, PixiEngine, createElement, StatefulComponent, Component } from '@app/rendering';

export type MapSceneData = Partial<{
  callbacks: Array<any>;
  fields: Array<any>;
  paths: Array<any>;
  background: any;
  selectedField: any;
  selectedPath: any;
}>;

@Injectable({
  providedIn: 'root'
})
export class MapRenderService {

  private renderer: Renderer | CanvasRenderer;
  private rootComponent: Component;

  constructor(private windowRef: WindowRefService) {
  }

  update(data: MapSceneData) {
    
  }

  initialize(DOMElem: HTMLDivElement) {
    const width = this.windowRef.nativeWindow.innerWidth;
    const height = this.windowRef.nativeWindow.innerHeight;
    const stage = new Container();

    this.renderer = autoDetectRenderer(width, height, { transparent: true, antialias: true, resolution: 1 });
    this.renderer.autoResize = true;

    DOMElem.appendChild(this.renderer.view);

    this.render(stage);
    this.startRenderLoop(stage);
  }

  render(stage: Container, data?: MapSceneData) {
    const assets = new Set(['https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg']);

    const render = createRenderer(PixiEngine, assets);
    render(createElement('fragment', {}), stage).then((component: Component) => {
      console.log(component);
      this.rootComponent = component;
    });
  }

  startRenderLoop(stage: Container) {
    requestAnimationFrame(() => this.renderer.render(stage));
  }
}
