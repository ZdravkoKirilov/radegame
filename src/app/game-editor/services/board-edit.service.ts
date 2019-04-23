import { Injectable, NgZone, OnDestroy } from '@angular/core';

import { WindowRefService } from '@app/shared';
import { WebGLRenderer, Container } from 'pixi.js';
import { createRenderer, createElement, Component } from '@app/rendering';
import { Subject } from 'rxjs';

import { RootComponent, Props as BoardData } from '../components/board/graphics';
import { Slot, PathEntity, ImageAsset, GameEntity } from '@app/game-mechanics';
import { toDictionary } from '@app/shared';
import { createPixiEngine } from '@app/engines/pixi';

@Injectable({
	providedIn: 'root'
})
export class BoardEditService implements OnDestroy {

	private renderer: WebGLRenderer;
	private rootComponent: Component;

	public pathSelected$ = new Subject<PathEntity>();
	public slotSelected$ = new Subject<Slot>();
	public dragEnded$ = new Subject<Slot>();

	private renderLoop: number;

	constructor(private windowRef: WindowRefService, private zone: NgZone) {
	}

	update(data: Partial<BoardData>) {
		this.rootComponent && this.rootComponent.setProps(data);
	}

	extractAssets(slots: GameEntity[], images: ImageAsset[]): Set<string> {
		const imageList = toDictionary<ImageAsset>(images);
		return new Set(slots.map(elem => {
			const img = imageList[elem.image];
			if (img) {
				return img.thumbnail || img.svg;
			}
		}).filter(elem => !!elem));
	}

	initialize(DOMElem: HTMLDivElement, data?: Partial<BoardData>) {

		this.zone.runOutsideAngular(() => {
			const width = this.windowRef.nativeWindow.innerWidth;
			const height = this.windowRef.nativeWindow.innerHeight;
			const stage = new Container();

			this.renderer = new WebGLRenderer(width, height, { transparent: true, antialias: true, resolution: 1 });
			this.renderer.autoResize = true;

			DOMElem.appendChild(this.renderer.view);

			const assets = this.extractAssets(data.slots as GameEntity[], data.images);

			this.render(stage, data, assets);
			this.startRenderLoop(stage);
		});
	}

	async render(stage: Container, data: Partial<BoardData> = {}, assets?: Set<string>) {
		const PixiEngine = createPixiEngine();
		const render = createRenderer(PixiEngine, assets || new Set());
		const props = {
			...data,
			selectPath: this.handlePathSelect,
			selectSlot: this.handleSlotSelect,
			onDragEnd: this.handleDragEnd
		} as BoardData;

		const component = await render(createElement<BoardData>(RootComponent, props as any), stage);
		console.log(component);
		this.rootComponent = component;
		component.update();
	};

	startRenderLoop(stage: Container) {
		this.zone.runOutsideAngular(() => {
			this.renderLoop = requestAnimationFrame(() => this.startRenderLoop(stage));
			this.renderer.render(stage);
		});
	}

	handleSlotSelect = (item: Slot) => {
		this.zone.run(() => {
			this.slotSelected$.next(item);
		});
	}

	handlePathSelect = (item: PathEntity) => {
		this.zone.run(() => {
			this.pathSelected$.next(item);
		});
	}

	handleDragEnd = (item: Slot) => {
		this.zone.run(() => {
			this.dragEnded$.next(item);
		});
	}

	ngOnDestroy() {
		cancelAnimationFrame(this.renderLoop);
	}
}
