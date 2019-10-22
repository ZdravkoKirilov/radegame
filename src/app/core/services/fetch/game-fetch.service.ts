import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URLS } from 'app/core/config';
import {
	PathEntity, GameAction, Stage, Condition, Round,
	Token, Phase, Team, Choice, Slot, ImageAsset,
	Game, Faction, EntityState, Expression, Animation, Handler, Setup, GameTemplate
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

	getPaths(gameId: number) {
		return this.http.get<PathEntity[]>(API_URLS.PATHS(gameId));
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

	getTeams(gameId: number) {
		return this.http.get<Team[]>(API_URLS.TEAMS(gameId));
	}

	getChoices(gameId: number) {
		return this.http.get<Choice[]>(API_URLS.CHOICES(gameId));
	}

	getMaps(gameId: number) {
		return this.http.get<PathEntity[]>(API_URLS.MAPS(gameId));
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

	getStates(gameId: number) {
		return this.http.get<EntityState[]>(API_URLS.STATES(gameId));
	}

	getExpressions(gameId: number) {
		return this.http.get<Expression[]>(API_URLS.EXPRESSIONS(gameId));
	}

	getAnimations(gameId: number) {
		return this.http.get<Animation[]>(API_URLS.ANIMATIONS(gameId));
	}

	getHandlers(gameId: number) {
		return this.http.get<Handler[]>(API_URLS.HANDLERS(gameId));
	}

	getSetups(gameId: number) {
		return this.http.get<Setup[]>(API_URLS.SETUPS(gameId));
	}
}
