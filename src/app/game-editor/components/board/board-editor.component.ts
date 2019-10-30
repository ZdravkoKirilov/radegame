import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { composeSlotForm, composePathForm } from '../../forms';
import { ConnectedEntities } from '@app/dynamic-forms';
import { Slot, PathEntity, Stage, ImageAsset } from '@app/game-mechanics';

@Component({
	selector: 'rg-board-editor',
	template: `
		<rg-editor-layout>

			<rg-edit-header 
				title="Edit board" 
				[saveEnabled]="saveEnabled()" 
				[showButtons]="visibleEditor" 
				[showEditor]="visibleEditor" 
				(cancel)="closeEditors()" 
				(save)="saveEntity()">
			</rg-edit-header>

			<rg-board-toolbar
				[class.hidden]="visibleEditor"
				[selectedSlot]="!!selectedSlot"
				[selectedPath]="!!selectedPath"
				(showSlotEditor)="toggleSlotEditor(true)"
				(showPathEditor)="togglePathEditor(true)"
				(deletePath)="handleDeletePath()"
				(deleteSlot)="handleDeleteSlot()"
			></rg-board-toolbar>

			<ng-scrollbar>
				<rg-entity-editor 
					*ngIf="showSlotEditor" 
					[formDefinition]="slotForm"
					[selectedItem]="selectedSlot"
					[connectedEntities]="entities"
					(cancel)="toggleSlotEditor(false)"
					(save)="handleSaveSlot($event)"
					#slots
				></rg-entity-editor>

				<rg-entity-editor 
					*ngIf="showPathEditor" 
					[formDefinition]="pathForm"
					[selectedItem]="selectedPath"
					[connectedEntities]="entities"
					(cancel)="togglePathEditor(false)"
					(save)="handleSavePath($event)"
					#paths
				></rg-entity-editor>

				<rg-board-main 
					[ngClass]="{'hidden': visibleEditor}"
					[images]="images" 
					(selectSlot)="selectSlot($event)" 
					(selectPath)="selectPath($event)"
				></rg-board-main>
			</ng-scrollbar>

    </rg-editor-layout>
`,
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

	get visibleEditor() {
		return this.showSlotEditor || this.showPathEditor;
	}

	toggleSlotEditor(isVisible: boolean) {
		this.showSlotEditor = isVisible;
	}

	togglePathEditor(isVisible: boolean) {
		this.showPathEditor = isVisible;
	}

	saveEnabled() {
		const { slotEditor, pathEditor } = this;
		return true;
		// return slotEditor && slotEditor.form.valid || (pathEditor && pathEditor.form.valid);
	}

	closeEditors() {
		this.toggleSlotEditor(false);
		this.togglePathEditor(false);
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
