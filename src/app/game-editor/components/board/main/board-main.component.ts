import {
	Component, OnInit, ViewChild, ElementRef,
	OnDestroy,
	Output, Input,
	EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { ConnectedRootComponent } from '../../../graphics';
import { mountPixi } from '@app/engines/pixi';
import { WindowRefService, OnChange } from '@app/shared';
import { MountRef, StatefulComponent, updateComponent, RenderFunction, prepareExtras } from '@app/render-kit';
import { Slot, ImageAsset, Stage } from '@app/game-mechanics';

@Component({
	selector: 'rg-board-main',
	template: `
        <div class="canvas-wrapper" #canvasWrapper tabindex="0"></div>
    `,
	styles: [],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardMainComponent implements OnInit, OnDestroy {

	@Input() images: ImageAsset[] = [];

	@OnChange<Stage>(function (newStage) {
		const mount: MountRef = this.mount;
		if (mount && mount.component) {
			const component = mount.component as RenderFunction;
			const newProps = {
				...component.props,
				stage: newStage,
			};
			const rendered = component(newProps);
			updateComponent(component, rendered);
		}
	})
	@Input() stage: Stage;

	@ViewChild('canvasWrapper', { static: true }) canvasWrapper: ElementRef<HTMLDivElement>;
	@Output() selectSlot = new EventEmitter<Slot>();

	mount: MountRef;

	constructor(
		private store: Store<AppState>,
		private windowRef: WindowRefService
	) { }

	async ngOnInit() {
		const { _selectSlot, stage } = this;
		const domHost = this.canvasWrapper.nativeElement;
		this.mount = await mountPixi(ConnectedRootComponent, domHost, {
			width: this.windowRef.nativeWindow.innerWidth,
			height: this.windowRef.nativeWindow.innerHeight,
			props: {
				store: this.store, selectSlot: _selectSlot, stage
			},
			assets: new Set(this.images.map(img => img.image))
		});
		window['pixiroot'] = this.mount.component;
	}

	_selectSlot = (slot: Slot) => {
		this.selectSlot.emit(slot);
	}

	ngOnDestroy() {
		this.mount.destroy();
	}
}
