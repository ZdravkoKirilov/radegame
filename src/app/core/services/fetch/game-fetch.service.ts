import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EDITOR_URLS } from '../../config';
import {
	Widget, Module, Token, Choice, ImageAsset,
	Game, Expression, Animation, Setup, GameTemplate, Sandbox, GameId, EntityId, WidgetId, VersionId, Version
} from '@app/game-mechanics';


@Injectable({
	providedIn: 'root'
})
export class GameFetchService {

	constructor(private http: HttpClient) {
	}

	getGameData(gameId: GameId, query = '') {
		const url = EDITOR_URLS.GAME_DATA(gameId, query);
		return this.http.get<GameTemplate>(url);
	}

	getWidgets(gameId: GameId) {
		return this.http.get<Widget[]>(EDITOR_URLS.WIDGETS(gameId));
	}

	getWidget(gameId: GameId, widgetId: WidgetId) {
		return this.http.get<Widget>(EDITOR_URLS.WIDGETS(gameId, widgetId));
	}

	getVersion(gameId: GameId, versionId: VersionId) {
		return this.http.get<Version>(EDITOR_URLS.VERSIONS(gameId, versionId));
	}

	getVersions(gameId: GameId) {
		return this.http.get<Version[]>(EDITOR_URLS.VERSIONS(gameId));
	}

	getModules(gameId: GameId) {
		return this.http.get<Module[]>(EDITOR_URLS.MODULES(gameId));
	}

	getTokens(gameId: GameId) {
		return this.http.get<Token[]>(EDITOR_URLS.TOKENS(gameId));
	}

	getChoices(gameId: GameId) {
		return this.http.get<Choice[]>(EDITOR_URLS.CHOICES(gameId));
	}

	getImages(gameId: GameId) {
		return this.http.get<ImageAsset[]>(EDITOR_URLS.IMAGES(gameId));
	}

	getGames() {
		return this.http.get<Game[]>(EDITOR_URLS.GAMES());
	}

	getGame(id: GameId) {
		return this.http.get<Game>(EDITOR_URLS.GAMES(id));
	}

	getExpressions(gameId: GameId) {
		return this.http.get<Expression[]>(EDITOR_URLS.EXPRESSIONS(gameId));
	}

	getAnimations(gameId: GameId) {
		return this.http.get<Animation[]>(EDITOR_URLS.ANIMATIONS(gameId));
	}

	getSetups(gameId: GameId) {
		return this.http.get<Setup[]>(EDITOR_URLS.SETUPS(gameId));
	}

	getSandboxes(gameId: GameId) {
		return this.http.get<Sandbox[]>(EDITOR_URLS.SANDBOXES(gameId));
	}
}
