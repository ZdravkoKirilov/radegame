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
    Source, Team, ImageAsset
} from '@app/game-mechanics';

import { API_URLS } from '../../config';
import { toMultipartFormData } from '@app/shared';

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

    saveStage(data: Stage): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.STAGES(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.STAGES(data.game), data);
        }
    }

    deleteStage(data: Stage): Observable<any> {
        return this.http.delete(API_URLS.STAGES(data.game, data.id));
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

    saveRound(data: Round): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.ROUNDS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.ROUNDS(data.game), data);
        }
    }

    deleteRound(data: Round): Observable<any> {
        return this.http.delete(API_URLS.ROUNDS(data.game, data.id));
    }

    saveToken(data: Token): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.TOKENS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.TOKENS(data.game), data);
        }
    }

    deleteToken(data: Token): Observable<any> {
        return this.http.delete(API_URLS.TOKENS(data.game, data.id));
    }

    savePhase(data: Phase): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.PHASES(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.PHASES(data.game), data);
        }
    }

    deleteTeam(data: Team): Observable<any> {
        return this.http.delete(API_URLS.TEAMS(data.game, data.id));
    }

    saveTeam(data: Team): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.TEAMS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.TEAMS(data.game), data);
        }
    }

    deletePhase(data: Phase): Observable<any> {
        return this.http.delete(API_URLS.PHASES(data.game, data.id));
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

    saveImage(data: ImageAsset): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.IMAGES(data.game, data.id), data, options);
        } else {
            return this.http.post(API_URLS.IMAGES(data.game), data, options);
        }
    }

    deleteImage(data: ImageAsset): Observable<any> {
        return this.http.delete(API_URLS.IMAGES(data.game, data.id));
    }

    saveField(data: Field): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.FIELDS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.FIELDS(data.game), data);
        }
    }

    deleteField(data: Field): Observable<any> {
        return this.http.delete(API_URLS.FIELDS(data.game, data.id));
    }

    saveGame(data: Game): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.GAMES(data.id), data);
        } else {
            return this.http.post(API_URLS.GAMES(data.id), data);
        }
    }
}