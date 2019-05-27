import {
	Component, OnInit, OnChanges, Input, ViewChild, ElementRef,
	ChangeDetectionStrategy, Output, EventEmitter, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { BoardEditService } from '../../../services';
import { Slot, PathEntity, Stage, ImageAsset, Style, Source } from '@app/game-mechanics';

@Component({
	selector: 'rg-board-main',
	template: `
        <div class="canvas-wrapper" #canvasWrapper tabindex="0"></div>
    `,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardMainComponent implements OnInit, OnChanges, OnDestroy {

	@ViewChild('canvasWrapper') canvasWrapper: ElementRef<HTMLDivElement>;

	@Output() selectSlot = new EventEmitter<Slot>();
	@Output() selectPath = new EventEmitter<PathEntity>();
	@Output() dragEnd = new EventEmitter<Slot>();

	@Input() slots: Slot[];
	@Input() selectedSlot: Slot;

	@Input() paths: PathEntity[];
	@Input() selectedPath: PathEntity;

	@Input() stage: Stage;
	@Input() images: ImageAsset[];
	@Input() styles: Style[];
	@Input() sources: Source[];

	subs: Subscription[];

	constructor(private boardEditService: BoardEditService) { }

	ngOnInit() {
		const { slots, selectedSlot, paths, selectedPath, stage,
			selectSlot, dragEnd, boardEditService, selectPath, images, styles, sources } = this;

		boardEditService.initialize(this.canvasWrapper.nativeElement, {
			slots, selectedSlot, paths, selectedPath, stage, images, styles, sources
		});

		this.subs = [
			boardEditService.slotSelected$.subscribe(slot => selectSlot.emit(slot)),
			boardEditService.dragEnded$.subscribe(slot => dragEnd.emit(slot)),
			boardEditService.pathSelected$.subscribe(path => selectPath.emit(path)),
		]
	}

	ngOnChanges() {
		const { slots, selectedSlot, paths, selectedPath, stage } = this;
		this.boardEditService.update({
			slots, selectedSlot, paths, selectedPath, stage
		});
	}

	ngOnDestroy() {
		this.subs.forEach(sub => sub.unsubscribe);
	}

}
