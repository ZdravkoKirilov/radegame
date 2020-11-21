import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, ContentChild } from '@angular/core';

import { AppOverlayService } from '../../services/overlay/app-overlay.service';
import { AppOverlayRef } from '../../services/overlay/app-overlay-ref';
import { WithTimeout, OnChange } from '../../mixins';

@Component({
	selector: 'rg-overlay',
	templateUrl: './overlay.component.html',
	styleUrls: ['./overlay.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayComponent implements OnInit, OnDestroy {

	constructor(private overlay: AppOverlayService) { }

	@OnChange<OverlayComponent, {}>(function (ctx, value) {
		if (ctx.componentRef) {
			ctx.componentRef.data = value;
		}
	})
	@Input() data = {};

	@ContentChild('content') component: any;
	overlayRef: AppOverlayRef;
	componentRef: { data: any };

	@WithTimeout()
	ngOnInit() {
		if (!this.component) {
			throw new Error('Overlay component must be provided a "content" child');
		} else {
			const blueprint = this.component.constructor;
			const [overlayRef, component] = this.overlay.open(blueprint, { data: this.data });
			this.overlayRef = overlayRef;
			this.componentRef = component;
		}

	}

	@WithTimeout()
	ngOnDestroy() {
		this.overlayRef.close();
	}

}
