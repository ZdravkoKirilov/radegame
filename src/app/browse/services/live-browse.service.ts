import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BROWSE_URLS } from '@app/core';

@Injectable({
	providedIn: 'root'
})
export class LiveBrowseService {

	public stream$ = new Subject();

	private socket: WebSocket;

	constructor() { 
		this.socket = new WebSocket(BROWSE_URLS.LIVE_LOBBIES);

		this.socket.onmessage = (e: MessageEvent) => {
			const data = JSON.parse(e.data);
			this.stream$.next(data);
		};

		this.socket.onclose = (e: CloseEvent) => {

		};
	}

	send(data: object) {
		this.socket.send(JSON.stringify(data));
	}
}
