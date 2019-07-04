import {
	Component, OnInit, ViewChild, ElementRef,
	ChangeDetectionStrategy,
	OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { RootComponent } from '../graphics';
import { mountPixi } from '@app/engines/pixi';
import { WindowRefService } from '@app/shared';
import { MountRef } from '@app/render-kit';

@Component({
	selector: 'rg-board-main',
	template: `
        <div class="canvas-wrapper" #canvasWrapper tabindex="0"></div>
    `,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardMainComponent implements OnInit, OnDestroy {

	@ViewChild('canvasWrapper') canvasWrapper: ElementRef<HTMLDivElement>;

	mount: MountRef;

	constructor(
		private store: Store<AppState>,
		private windowRef: WindowRefService
	) { }

	async ngOnInit() {
		const domHost = this.canvasWrapper.nativeElement;
		this.mount = await mountPixi(RootComponent, domHost, {
			width: this.windowRef.nativeWindow.innerWidth,
			height: this.windowRef.nativeWindow.innerHeight,
			props: {
				store: this.store
			},
		});
	}

	ngOnDestroy() {
		this.mount.destroy();
	}
}
