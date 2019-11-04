import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { composeSlotForm, composePathForm } from '../../forms';
import { ConnectedEntities } from '@app/dynamic-forms';
import { Slot, PathEntity, Stage, ImageAsset } from '@app/game-mechanics';

@Component({
	selector: 'rg-board-editor',
	templateUrl: './board-editor.component.html',
	styles: []
})
export class BoardEditorComponent {

	@Input() entities: ConnectedEntities = {};
	@Input() slots: Slot[];
	@Input() paths: PathEntity[];
	@Input() stage: Stage;
	@Input() gameId: number;
	@Input() images: ImageAsset[];

	@Output() saveSlot = new EventEmitter<Slot>();
	@Output() savePath = new EventEmitter<PathEntity>();

	@Output() deleteSlot = new EventEmitter<Slot>();
	@Output() deletePath = new EventEmitter<PathEntity>();

	@ViewChild('slots', { static: false }) slotEditor: any;
	@ViewChild('paths', { static: false }) pathEditor: any;

	showSlotEditor = false;
	showPathEditor = false;
	pathMode = false;

	slotForm = composeSlotForm;
	pathForm = composePathForm;

	selectedSlot: Slot;
	selectedPath: PathEntity;

	viewMode: 'board' | 'list' = 'board';

	get visibleEditor() {
		return this.showSlotEditor || this.showPathEditor;
	}

	toggleSlotEditor(isVisible: boolean) {
		this.showSlotEditor = isVisible;
	}

	togglePathEditor(isVisible: boolean) {
		this.showPathEditor = isVisible;
	}

	changeViewMode(mode: 'board' | 'list') {
		this.viewMode = mode;
	}

	saveEnabled() {
		const { slotEditor, pathEditor } = this;
		return true;
		// return slotEditor && slotEditor.form.valid || (pathEditor && pathEditor.form.valid);
	}

	editSlot(payload: Slot) {
        this.selectSlot(payload);
        this.toggleSlotEditor(true);
    }

	closeEditors() {
		this.toggleSlotEditor(false);
		this.togglePathEditor(false);
		this.selectedPath = null;
		this.selectedSlot = null;
	}

	selectSlot = (slot: Slot) => {
		this.selectedSlot = slot;
	}

	selectPath(path: PathEntity) {
		this.selectedPath = path;
	}

	saveEntity() {
		if (this.slotEditor) {
			return this.handleSaveSlot(this.slotEditor.form.value);
		}
		if (this.pathEditor) {
			return this.handleSavePath(this.pathEditor.form.value);
		}
	}

	handleSavePath(payload: PathEntity) {
		const path = <PathEntity>{ ...payload, game: this.gameId, owner: this.stage.id };
		if (this.selectedPath) {
			path.id = this.selectedPath.id;
		}
		this.showPathEditor = false;
		this.selectedPath = null;
		this.savePath.emit(path);
	}

	handleSaveSlot(payload: Slot) {
		const slot = <Slot>{ ...payload, game: this.gameId, owner: this.stage.id };
		if (this.selectedSlot) {
			slot.id = this.selectedSlot.id;
		}
		this.showSlotEditor = false;
		this.selectedSlot = null;
		this.saveSlot.emit(slot);
	}

	handleDeleteSlot() {
		if (this.selectedSlot) {
			this.deleteSlot.emit({ ...this.selectedSlot });
			this.selectedSlot = null;
		}
	}

	handleDeletePath() {
		if (this.selectedPath) {
			this.deletePath.emit({ ...this.selectedPath });
			this.selectedPath = null;
		}
	}

}
