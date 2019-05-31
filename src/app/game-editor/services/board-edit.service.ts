import { Injectable, NgZone, OnDestroy } from '@angular/core';

import { WindowRefService } from '@app/shared';
import { WebGLRenderer, Container, Application } from 'pixi.js';
import { createRenderer, createElement, StatefulComponent } from '@app/render-kit';
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
	private rootComponent: StatefulComponent;

	public pathSelected$ = new Subject<PathEntity>();
	public slotSelected$ = new Subject<Slot>();
	public dragEnded$ = new Subject<Slot>();

	private renderLoop: number;

	private app: Application;

	constructor(private windowRef: WindowRefService, private zone: NgZone) {
	}

	update(data: Partial<BoardData>) {
		this.rootComponent && this.rootComponent.updateProps(data);
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

			this.app = new Application({
				width, height, transparent: true, antialias: true, resolution: 1, autoResize: true,
				backgroundColor: 0xffffff
			});

			DOMElem.appendChild(this.app.renderer.view);

			const assets = this.extractAssets(data.slots as GameEntity[], data.images);

			this.render(stage, data, assets);
			this.startRenderLoop(stage);
		});
	}

	async render(stage: Container, data: Partial<BoardData> = {}, assets?: Set<string>) {
		const PixiEngine = createPixiEngine(this.app);
		const render = createRenderer(PixiEngine, assets || new Set());
		const props = {
			...data,
			selectPath: this.handlePathSelect,
			selectSlot: this.handleSlotSelect,
			onDragEnd: this.handleDragEnd
		} as BoardData;

		const component = await render(createElement<BoardData>(RootComponent, props as any), stage);
		console.log(component);
		this.rootComponent = component as any;
		//component.update();
	};

	startRenderLoop(stage: Container) {
		this.zone.runOutsideAngular(() => {
			this.renderLoop = requestAnimationFrame(() => this.startRenderLoop(stage));
			this.app.renderer.render(stage);
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
