import {
	Component, OnInit, ViewChild, ElementRef,
	OnDestroy,
	Output, Input,
	EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { RootComponent } from '../../../graphics';
import { mountPixi } from '@app/engines/pixi';
import { WindowRefService } from '@app/shared';
import { MountRef } from '@app/render-kit';
import { Slot, ImageAsset } from '@app/game-mechanics';

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

	@ViewChild('canvasWrapper', { static: true }) canvasWrapper: ElementRef<HTMLDivElement>;
	@Output() selectSlot = new EventEmitter<Slot>();

	mount: MountRef;

	constructor(
		private store: Store<AppState>,
		private windowRef: WindowRefService
	) { }

	async ngOnInit() {
		const { _selectSlot } = this;
		const domHost = this.canvasWrapper.nativeElement;
		this.mount = await mountPixi(RootComponent, domHost, {
			width: this.windowRef.nativeWindow.innerWidth,
			height: this.windowRef.nativeWindow.innerHeight,
			props: {
				store: this.store, selectSlot: _selectSlot
			},
			assets: new Set(this.images.map(img => img.image))
		});
	}

	_selectSlot = (slot: Slot) => {
		this.selectSlot.emit(slot);
	}

	ngOnDestroy() {
		this.mount.destroy();
	}
}
