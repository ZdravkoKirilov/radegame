import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URLS } from '../../config';
import {
	Stage, Round, Token, Choice, ImageAsset,
	Game, Expression, Animation, Setup, GameTemplate
} from '@app/game-mechanics';


@Injectable({
	providedIn: 'root'
})
export class GameFetchService {

	constructor(private http: HttpClient) {
	}

	getGameData(gameId: number, query = '') {
		const url = API_URLS.GAME_DATA(gameId, query);
		return this.http.get<GameTemplate>(url);
	}

	getStages(gameId: number) {
		return this.http.get<Stage[]>(API_URLS.STAGES(gameId));
	}

	getStage(gameId: number, stageId: number) {
		return this.http.get<Stage>(API_URLS.STAGES(gameId, stageId));
	}

	getRounds(gameId: number) {
		return this.http.get<Round[]>(API_URLS.ROUNDS(gameId));
	}

	getTokens(gameId: number) {
		return this.http.get<Token[]>(API_URLS.TOKENS(gameId));
	}

	getChoices(gameId: number) {
		return this.http.get<Choice[]>(API_URLS.CHOICES(gameId));
	}

	getImages(gameId: number) {
		return this.http.get<ImageAsset[]>(API_URLS.IMAGES(gameId));
	}

	getGames() {
		return this.http.get<Game[]>(API_URLS.GAMES());
	}

	getGame(id: number) {
		return this.http.get<Game>(API_URLS.GAMES(id));
	}

	getExpressions(gameId: number) {
		return this.http.get<Expression[]>(API_URLS.EXPRESSIONS(gameId));
	}

	getAnimations(gameId: number) {
		return this.http.get<Animation[]>(API_URLS.ANIMATIONS(gameId));
	}

	getSetups(gameId: number) {
		return this.http.get<Setup[]>(API_URLS.SETUPS(gameId));
	}
}
