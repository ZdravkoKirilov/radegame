import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';

import { ChatMessage } from '../../../models';
import { User } from '@app/core';


@Component({
	selector: 'rg-lobby-chat',
	templateUrl: './lobby-chat.component.html',
	styleUrls: ['./lobby-chat.component.scss']
})
export class LobbyChatComponent {

	@Input() messages: ChatMessage[];
	@Input() user: User;

	@Output() send = new EventEmitter<ChatMessage>();

	content: string;

	submit(event: KeyboardEvent) {
		if (event.keyCode === ENTER && !event.shiftKey && this.content.trim()) {
			this.send.emit({
				timestamp: new Date().getTime(),
				owner: this.user.alias,
				message: this.content
			});
			this.content = '';
		}
	}

}
