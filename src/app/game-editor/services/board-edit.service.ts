import { Injectable } from '@angular/core';

import { WindowRefService } from '@app/core';
import { Renderer, CanvasRenderer, Container } from 'pixi.js';
import { createRenderer, createPixiEngine, createElement, Component } from '@app/rendering';
import { Subject } from 'rxjs';

import { RootComponent, Props as BoardData } from '../components/board/graphics';
import { Slot, PathEntity } from '@app/game-mechanics';

@Injectable({
	providedIn: 'root'
})
export class BoardEditService {

	private renderer: Renderer | CanvasRenderer;
	private rootComponent: Component;

	public pathSelected$ = new Subject<PathEntity>();
	public locationSelected$ = new Subject<Slot>();
	public dragEnded$ = new Subject<Slot>();

	constructor(private windowRef: WindowRefService) {
	}

	update(data: Partial<BoardData>) {
		this.rootComponent && this.rootComponent.setProps(data);
	}

	extractAssets(locations: Slot[]): Set<string> {
		return new Set(locations.map(elem => elem.image));
	}

	initialize(DOMElem: HTMLDivElement, data?: Partial<BoardData>) {
		const width = this.windowRef.nativeWindow.innerWidth;
		const height = this.windowRef.nativeWindow.innerHeight;
		const stage = new Container();

		this.renderer = new Renderer(width, height, { transparent: true, antialias: true, resolution: 1 });
		this.renderer.autoResize = true;

		DOMElem.appendChild(this.renderer.view);

		const assets = this.extractAssets(data.locations);
		assets.add(data.stage.image);

		this.render(stage, data, assets);
		this.startRenderLoop(stage);
	}

	async render(stage: Container, data: Partial<BoardData> = {}, assets: Set<string>) {
		const PixiEngine = createPixiEngine();
		const render = createRenderer(PixiEngine, assets);
		const props = { ...data, selectPath: this.handlePathSelect } as BoardData;

		const component = await render(createElement<BoardData>(RootComponent, props), stage);
		console.log(component);
		this.rootComponent = component;
		component.update();
	};


	startRenderLoop(stage: Container) {
		setInterval(() => {
			requestAnimationFrame(() => {
				this.renderer.render(stage);
			});
		});
	}

	handleLocationSelect = (item: Slot) => {
		this.locationSelected$.next(item);
	}

	handlePathSelect = (item: PathEntity) => {
		console.log(item);
		this.pathSelected$.next(item);
	}

	handleDragEnd = (item: Slot) => {
		this.dragEnded$.next(item);
	}
}
