import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { composeSlotForm } from '../../forms';
import { ConnectedEntities } from '@app/dynamic-forms';
import { Slot, Stage, ImageAsset } from '@app/game-mechanics';

@Component({
	selector: 'rg-board-editor',
	templateUrl: './board-editor.component.html',
	styles: []
})
export class BoardEditorComponent {

	@Input() entities: ConnectedEntities = {};
	@Input() slots: Slot[];
	@Input() stage: Stage;
	@Input() gameId: number;
	@Input() images: ImageAsset[];

	@Output() saveSlot = new EventEmitter<Slot>();

	@Output() deleteSlot = new EventEmitter<Slot>();

	@ViewChild('slots', { static: false }) slotEditor: any;

	showSlotEditor = false;

	slotForm = composeSlotForm;

	selectedSlot: Slot;

	viewMode: 'board' | 'list' = 'board';

	get visibleEditor() {
		return this.showSlotEditor;
	}

	toggleSlotEditor(isVisible: boolean) {
		this.showSlotEditor = isVisible;
	}

	changeViewMode(mode: 'board' | 'list') {
		this.viewMode = mode;
	}

	saveEnabled() {
		return true;
	}

	editSlot(payload: Slot) {
		this.selectSlot(payload);
		this.toggleSlotEditor(true);
	}

	closeEditors() {
		this.toggleSlotEditor(false);
		this.selectedSlot = null;
	}

	selectSlot = (slot: Slot) => {
		this.selectedSlot = slot;
	}

	saveEntity() {
		if (this.slotEditor) {
			return this.handleSaveSlot(this.slotEditor.form.value);
		}
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
}
