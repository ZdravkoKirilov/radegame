import { Injectable } from '@angular/core';

import { WindowRefService } from '@app/core';
import { Renderer, CanvasRenderer, Container } from 'pixi.js';
import { createRenderer, PixiEngine, createElement, Component } from '@app/rendering';
import { Subject } from 'rxjs';

import { RootComponent, Props as BoardData } from '../components/board/graphics';
import { LocationEntity, PathEntity } from '@app/game-mechanics';

@Injectable({
	providedIn: 'root'
})
export class BoardEditService {

	private renderer: Renderer | CanvasRenderer;
	private rootComponent: Component;

	public pathSelected$ = new Subject<PathEntity>();
	public locationSelected$ = new Subject<LocationEntity>();
	public dragEnded$ = new Subject<LocationEntity>();

	constructor(private windowRef: WindowRefService) {
	}

	update(data: Partial<BoardData>) {
		this.rootComponent && this.rootComponent.setProps(data);
	}

	extractAssets(locations: LocationEntity[]): Set<string> {
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

		this.render(stage, data, assets);
		this.startRenderLoop(stage);
	}

	render(stage: Container, data: Partial<BoardData> = {}, assets: Set<string>) {

		const render = createRenderer(PixiEngine, assets);
		const props = { ...data, selectPath: this.handlePathSelect} as BoardData;

		render(createElement<BoardData>(RootComponent, props), stage).then((component: Component) => {
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

	handleLocationSelect = (item: LocationEntity) => {
		this.locationSelected$.next(item);
	}

	handlePathSelect = (item: PathEntity) => {
		console.log(item);
		this.pathSelected$.next(item);
	}

	handleDragEnd = (item: LocationEntity) => {
		this.dragEnded$.next(item);
	}
}
