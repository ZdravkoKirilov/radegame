import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EDITOR_URLS } from '../../config';
import {
	Widget, Module, Token, ImageAsset,
	Game, Expression, Animation, Setup, Sandbox, GameId, WidgetId, VersionId, Version, ModuleId, GameData
} from '@app/game-mechanics';


@Injectable({
	providedIn: 'root'
})
export class GameFetchService {

	constructor(private http: HttpClient) {
	}

	getGameData(gameId: GameId, modules: ModuleId[]) {
		const url = EDITOR_URLS.GAME_DATA(gameId, modules);
		return this.http.get<GameData>(url);
	}

	getWidgets(moduleId: ModuleId) {
		return this.http.get<Widget[]>(EDITOR_URLS.WIDGETS(moduleId));
	}

	getWidget(moduleId: ModuleId, widgetId: WidgetId) {
		return this.http.get<Widget>(EDITOR_URLS.WIDGETS(moduleId, widgetId));
	}

	getVersion(gameId: GameId, versionId: VersionId) {
		return this.http.get<Version>(EDITOR_URLS.VERSIONS(gameId, versionId));
	}

	getVersions(gameId: GameId) {
		return this.http.get<Version[]>(EDITOR_URLS.VERSIONS(gameId));
	}

	getModules(versionId: VersionId) {
		return this.http.get<Module[]>(EDITOR_URLS.MODULES(versionId));
	}

	getTokens(moduleId: ModuleId) {
		return this.http.get<Token[]>(EDITOR_URLS.TOKENS(moduleId));
	}

	getImages(moduleId: ModuleId) {
		return this.http.get<ImageAsset[]>(EDITOR_URLS.IMAGES(moduleId));
	}

	getGames() {
		return this.http.get<Game[]>(EDITOR_URLS.GAMES());
	}

	getGame(id: GameId) {
		return this.http.get<Game>(EDITOR_URLS.GAMES(id));
	}

	getExpressions(moduleId: ModuleId) {
		return this.http.get<Expression[]>(EDITOR_URLS.EXPRESSIONS(moduleId));
	}

	getAnimations(moduleId: ModuleId) {
		return this.http.get<Animation[]>(EDITOR_URLS.ANIMATIONS(moduleId));
	}

	getSetups(versionId: VersionId) {
		return this.http.get<Setup[]>(EDITOR_URLS.SETUPS(versionId));
	}

	getSandboxes(moduleId: ModuleId) {
		return this.http.get<Sandbox[]>(EDITOR_URLS.SANDBOXES(moduleId));
	}
}
