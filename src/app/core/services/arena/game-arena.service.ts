import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ARENA_URLS, LOBBY_URLS } from '../../config';
import { CreateGamePayload } from '@app/game-mechanics';
import { ActiveGame } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class GameArenaService {

  constructor(private http: HttpClient) { }

  createGame(initialState: CreateGamePayload) {
    return this.http.post<ActiveGame>(LOBBY_URLS.CREATE_GAME(initialState.lobbyName), initialState);
  }

  fetchActiveGames(userId: number) {
    return this.http.get<ActiveGame[]>(ARENA_URLS.GET_ACTIVE_GAMES(userId));
  }
}
