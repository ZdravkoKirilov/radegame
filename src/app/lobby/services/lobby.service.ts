import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BROWSE_URLS } from '@app/core';
import { Lobby, Player } from '../models';

@Injectable({
	providedIn: 'root'
})
export class LobbyService {

	constructor(private http: HttpClient) { }

	fetchLobby(name: string) {
		// return Observable.create(observer => {
		// 	observer.next(new Date().getTime() % 2 === 0);
		// });
		return this.http.get<Lobby>(BROWSE_URLS.LOBBIES(name));
	}

	fetchLobbies() {
		return this.http.get<Lobby[]>(BROWSE_URLS.LOBBIES());
	}

	createLobby(lobby: Lobby) {
		return this.http.post<Lobby>(BROWSE_URLS.LOBBIES(), lobby);
	}

	deleteLobby(name: string) {
		return this.http.delete(BROWSE_URLS.LOBBIES(name));
	}

	savePlayer(lobbyName: string, player: Player) {
		return this.http.post<Player>(BROWSE_URLS.PLAYERS(lobbyName), player);
	}

	deletePlayer(lobbyName: string, playerName: string) {
		return this.http.delete(BROWSE_URLS.PLAYERS(lobbyName, playerName));
	}
}
