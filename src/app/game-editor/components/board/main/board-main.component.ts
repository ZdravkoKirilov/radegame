import {
	Component, OnInit, ViewChild, ElementRef, OnDestroy, Output, Input, EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { WindowRefService, OnChange } from '@app/shared';
import { MountRef, updateComponent, RenderFunction } from '@app/render-kit';
import { WidgetNode, ImageAsset, Widget, registerComponents } from '@app/game-mechanics';

import { ConnectedRootComponent } from '../../../graphics';

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

	@OnChange<Widget>(function (newWidget) {
		const mount: MountRef = this.mount;
		if (mount && mount.component) {
			const component = mount.component as RenderFunction;
			const newProps = {
				...component.props,
				widget: newWidget,
			};
			const rendered = component(newProps);
			updateComponent(component, rendered);
		}
	})
	@Input() widget: Widget;

	@ViewChild('canvasWrapper', { static: true }) canvasWrapper: ElementRef<HTMLDivElement>;
	@Output() selectNode = new EventEmitter<WidgetNode>();

	mount: MountRef;

	constructor(
		private store: Store<AppState>,
		private windowRef: WindowRefService
	) { }

	async ngOnInit() {
		const { _selectNode, widget } = this;
		const domHost = this.canvasWrapper.nativeElement;
		const pixiEngine = await import('@app/engines/pixi');
		this.mount = await pixiEngine.mountPixi(ConnectedRootComponent, domHost, {
			width: this.windowRef.nativeWindow.innerWidth,
			height: this.windowRef.nativeWindow.innerHeight,
			props: {
				store: this.store, selectNode: _selectNode, widget
			},
			assets: new Set(this.images.map(img => img.image)),
			registerComponents,
		});
		window['pixiroot'] = this.mount.component;
	}

	_selectNode = (node: WidgetNode) => {
		this.selectNode.emit(node);
	}

	ngOnDestroy() {
		this.mount.destroy();
	}
}
