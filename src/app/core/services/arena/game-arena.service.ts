import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ARENA_URLS, LOBBY_URLS } from '../../config';
import { ActiveGame } from '../../models';
import { GameInstance } from '@app/game-arena';
import { CreateGamePayload, GameId } from '@app/game-mechanics';

@Injectable({
  providedIn: 'root'
})
export class GameArenaService {

  constructor(private http: HttpClient) { }

  createGame(initialState: CreateGamePayload) {
    return this.http.post<ActiveGame>(LOBBY_URLS.CREATE_GAME(initialState.lobby_name), initialState);
  }

  fetchActiveGames(userId: number) {
    return this.http.get<ActiveGame[]>(ARENA_URLS.GET_ACTIVE_GAMES(userId));
  }

  fetchActiveGame(game_id: GameId) {
    return this.http.get<GameInstance>(ARENA_URLS.ACTIVE_GAME(game_id));
  }
}
