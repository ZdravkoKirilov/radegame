import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ARENA_URLS } from '../../config';
import { CreateGamePayload } from '@app/game-mechanics';

@Injectable({
  providedIn: 'root'
})
export class GameArenaService {

  constructor(private http: HttpClient) { }

  createGame(initialState: CreateGamePayload) {
    return this.http.post<string>(ARENA_URLS.CREATE_GAME(), initialState);
  }
}
