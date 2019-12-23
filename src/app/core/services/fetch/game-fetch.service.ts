import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URLS } from '../../config';
import {
	GameAction, Stage, Condition, Round,
	Token, Phase, Choice, Slot, ImageAsset,
	Game, Faction, Expression, Animation, Setup, GameTemplate
} from '@app/game-mechanics';


@Injectable({
	providedIn: 'root'
})
export class GameFetchService {

	constructor(private http: HttpClient) {
	}

	getGameData(gameId: number) {
		return this.http.get<GameTemplate>(API_URLS.GAME_DATA(gameId));
	}

	getActions(gameId: number) {
		return this.http.get<GameAction[]>(API_URLS.ACTIONS(gameId));
	}

	getStages(gameId: number) {
		return this.http.get<Stage[]>(API_URLS.STAGES(gameId));
	}

	getConditions(gameId: number) {
		return this.http.get<Condition[]>(API_URLS.CONDITIONS(gameId));
	}

	getRounds(gameId: number) {
		return this.http.get<Round[]>(API_URLS.ROUNDS(gameId));
	}

	getTokens(gameId: number) {
		return this.http.get<Token[]>(API_URLS.TOKENS(gameId));
	}

	getPhases(gameId: number) {
		return this.http.get<Phase[]>(API_URLS.PHASES(gameId));
	}

	getChoices(gameId: number) {
		return this.http.get<Choice[]>(API_URLS.CHOICES(gameId));
	}

	getSlots(gameId: number) {
		return this.http.get<Slot[]>(API_URLS.SLOTS(gameId));
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

	getFactions(gameId: number) {
		return this.http.get<Faction[]>(API_URLS.FACTIONS(gameId));
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
