import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input, ContentChild } from '@angular/core';

import { AppOverlayService } from '../../services/overlay/app-overlay.service';
import { AppOverlayRef } from '../../services/overlay/app-overlay-ref';
import { WithTimeout } from '../../mixins';

@Component({
	selector: 'rg-overlay',
	templateUrl: './overlay.component.html',
	styleUrls: ['./overlay.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayComponent implements OnInit, OnDestroy {

	constructor(private overlay: AppOverlayService) { }

	@Input() data = {};
	@ContentChild('content') component: any;
	overlayRef: AppOverlayRef;

	@WithTimeout()
	ngOnInit() {
		if (!this.component) {
			throw new Error('Overlay component must be provided a "content" child');
		} else {
			const blueprint = this.component.constructor;
			this.overlayRef = this.overlay.open(blueprint, this.data);
		}

	}

	@WithTimeout()
	ngOnDestroy() {
		this.overlayRef.close();
	}

}
