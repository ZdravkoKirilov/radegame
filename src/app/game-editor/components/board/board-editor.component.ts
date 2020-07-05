import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { composeNodeForm } from '../../forms';
import { ConnectedEntities } from '@app/dynamic-forms';
import { WidgetNode, Widget, ImageAsset, GameId } from '@app/game-mechanics';

@Component({
	selector: 'rg-board-editor',
	templateUrl: './board-editor.component.html',
	styles: []
})
export class BoardEditorComponent {

	@Input() entities: ConnectedEntities = {};
	@Input() nodes: WidgetNode[];
	@Input() widget: Widget;
	@Input() gameId: GameId;
	@Input() images: ImageAsset[];

	@Output() saveNode = new EventEmitter<WidgetNode>();

	@Output() deleteNode = new EventEmitter<WidgetNode>();

	@ViewChild('nodes') nodeEditor: any;

	showNodeEditor = false;

	nodeForm = composeNodeForm;

	selectedNode: WidgetNode;

	viewMode: 'board' | 'list' = 'board';

	get visibleEditor() {
		return this.showNodeEditor;
	}

	toggleNodeEditor(isVisible: boolean) {
		this.showNodeEditor = isVisible;
	}

	changeViewMode(mode: 'board' | 'list') {
		this.viewMode = mode;
	}

	saveEnabled() {
		return true;
	}

	editNode(payload: WidgetNode) {
		this.selectNode(payload);
		this.toggleNodeEditor(true);
	}

	closeEditors() {
		this.toggleNodeEditor(false);
		this.selectedNode = null;
	}

	selectNode = (node: WidgetNode) => {
		this.selectedNode = node;
	}

	saveEntity() {
		if (this.nodeEditor) {
			return this.handleSaveNode(this.nodeEditor.form.value);
		}
	}

	handleSaveNode(payload: WidgetNode) {
		const node = <WidgetNode>{ ...payload, id: null, game: this.gameId, owner: this.widget.id };
		if (this.selectedNode) {
			node.id = this.selectedNode.id;
		}
		this.showNodeEditor = false;
		this.selectedNode = null;
		this.saveNode.emit(node);
	}

	handleDeleteNode() {
		if (this.selectedNode) {
			this.deleteNode.emit({ ...this.selectedNode });
			this.selectedNode = null;
		}
	}
}
