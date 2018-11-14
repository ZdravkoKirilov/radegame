import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import {
    Field,
    Faction,
    Game,
    Slot,
    PathEntity,
    GameAction,
    Condition,
    Round,
    Choice,
    Stage,
    Token,
    Phase,
    Source,
} from '@app/game-mechanics';
import { toMultipartFormData } from '@app/shared';
import { API_URLS } from '../config';

@Injectable()
export class GameEditService {

    constructor(private http: HttpClient) {
    }

    saveMapPath(data: PathEntity): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.PATHS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.PATHS(data.game), data);
        }
    }

    deleteMapPath(data: PathEntity): Observable<any> {
        return this.http.delete(API_URLS.PATHS(data.game, data.id));
    }

    getPaths(gameId: number): Observable<any> {
        return this.http.get(API_URLS.PATHS(gameId));
    }

    saveFaction(data: Faction): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.FACTIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.FACTIONS(data.game), data);
        }
    }

    deleteFaction(data: Faction): Observable<any> {
        return this.http.delete(API_URLS.FACTIONS(data.game, data.id));
    }

    saveAction(data: GameAction): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.ACTIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.ACTIONS(data.game), data);
        }
    }

    deleteAction(data: GameAction): Observable<any> {
        return this.http.delete(API_URLS.ACTIONS(data.game, data.id));
    }

    getActions(gameId: number): Observable<any> {
        return this.http.get(API_URLS.ACTIONS(gameId));
    }

    saveStage(data: Stage): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.STAGES(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.STAGES(data.game), formData, options);
        }
    }

    deleteStage(data: Stage): Observable<any> {
        return this.http.delete(API_URLS.STAGES(data.game, data.id));
    }

    getStages(gameId: number): Observable<any> {
        return this.http.get(API_URLS.STAGES(gameId));
    }

    getConditions(gameId: number): Observable<any> {
        return this.http.get(API_URLS.CONDITIONS(gameId));
    }

    saveCondition(data: Condition): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.CONDITIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.CONDITIONS(data.game), data);
        }
    }

    deleteCondition(data: Condition): Observable<any> {
        return this.http.delete(API_URLS.CONDITIONS(data.game, data.id));
    }

    getRounds(gameId: number): Observable<any> {
        return this.http.get(API_URLS.ROUNDS(gameId));
    }

    saveRound(data: Round): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.ROUNDS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.ROUNDS(data.game), formData, options);
        }
    }

    deleteRound(data: Round): Observable<any> {
        return this.http.delete(API_URLS.ROUNDS(data.game, data.id));
    }

    getTokens(gameId: number): Observable<any> {
        return this.http.get(API_URLS.TOKENS(gameId));
    }

    saveToken(data: Token): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.TOKENS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.TOKENS(data.game), formData, options);
        }
    }

    deleteToken(data: Token): Observable<any> {
        return this.http.delete(API_URLS.TOKENS(data.game, data.id));
    }

    getPhases(gameId: number): Observable<any> {
        return this.http.get(API_URLS.PHASES(gameId));
    }

    savePhase(data: Phase): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.PHASES(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.PHASES(data.game), formData, options);
        }
    }

    deleteTeam(data: Phase): Observable<any> {
        return this.http.delete(API_URLS.TEAMS(data.game, data.id));
    }

    getTeams(gameId: number): Observable<any> {
        return this.http.get(API_URLS.TEAMS(gameId));
    }

    saveTeam(data: Phase): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.TEAMS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.TEAMS(data.game), formData, options);
        }
    }

    deletePhase(data: Phase): Observable<any> {
        return this.http.delete(API_URLS.PHASES(data.game, data.id));
    }

    getChoices(gameId: number): Observable<any> {
        return this.http.get(API_URLS.CHOICES(gameId));
    }

    saveChoice(data: Choice): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.CHOICES(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.CHOICES(data.game), data);
        }
    }

    deleteChoice(data: Choice): Observable<any> {
        return this.http.delete(API_URLS.CHOICES(data.game, data.id));
    }

    getMaps(gameId: number): Observable<any> {
        return this.http.get(API_URLS.MAPS(gameId));
    }

    saveSlot(data: Slot): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.SLOTS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.SLOTS(data.game), data);
        }
    }

    deleteSlot(data: Slot): Observable<any> {
        return this.http.delete(API_URLS.SLOTS(data.game, data.id));
    }

    getSlots(gameId: number): Observable<any> {
        return this.http.get(API_URLS.SLOTS(gameId));
    }

    saveSource(data: Source): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.SOURCES(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.SOURCES(data.game), data);
        }
    }

    deleteSource(data: Source): Observable<any> {
        return this.http.delete(API_URLS.SOURCES(data.game, data.id));
    }

    getSources(gameId: number): Observable<any> {
        return this.http.get(API_URLS.SOURCES(gameId));
    }

    saveField(data: Field): Observable<any> {
        const formData: any = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };
        if (data.id) {
            return this.http.patch(API_URLS.FIELDS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.FIELDS(data.game), formData, options);
        }
    }

    deleteField(data: Field): Observable<any> {
        return this.http.delete(API_URLS.FIELDS(data.game, data.id));
    }

    saveGame(data: Game): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.GAMES(data.id), formData, options);
        } else {
            return this.http.post(API_URLS.GAMES(data.id), formData, options);
        }
    }

    getGames(): Observable<any> {
        return this.http.get<Game[]>(API_URLS.GAMES());
    }

    getGame(id: number): Observable<any> {
        return this.http.get(API_URLS.GAMES(id));
    }

    getFields(gameId: number): Observable<any> {
        return this.http.get(API_URLS.FIELDS(gameId));
    }

    getFactions(gameId: number): Observable<any> {
        return this.http.get(API_URLS.FACTIONS(gameId));
    }
}
