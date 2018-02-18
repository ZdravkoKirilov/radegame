import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
    Field,
    Faction,
    Resource,
    Game,
    MapLocation,
    MapPath,
    GameMap,
    Activity,
    Quest,
    Round,
    Trivia,
    Stage,
} from '../../game-mechanics/models/index';
import { API_URLS } from '../../shared/config/api-urls';
import { toMultipartFormData, objectToFormData } from '../../shared/utils/ToMultipartFormData';

@Injectable()
export class GameEditService {

    constructor(private http: HttpClient) {
    }

    saveMapPath(data: MapPath): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.PATHS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.PATHS(data.game), data);
        }
    }

    deleteMapPath(data: MapPath): Observable<any> {
        return this.http.delete(API_URLS.PATHS(data.game, data.id));
    }

    getPaths(gameId: number): Observable<any> {
        return this.http.get(API_URLS.PATHS(gameId));
    }

    saveFaction(data: Faction): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.FACTIONS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.FACTIONS(data.game), formData, options);
        }
    }

    deleteFaction(data: Faction): Observable<any> {
        return this.http.delete(API_URLS.FACTIONS(data.game, data.id));
    }

    saveActivity(data: Activity): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.ACTIVITIES(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.ACTIVITIES(data.game), formData, options);
        }
    }

    deleteActivity(data: Activity): Observable<any> {
        return this.http.delete(API_URLS.ACTIVITIES(data.game, data.id));
    }

    getActivities(gameId: number): Observable<any> {
        return this.http.get(API_URLS.ACTIVITIES(gameId));
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

    getResources(gameId: number): Observable<any> {
        return this.http.get(API_URLS.RESOURCES(gameId));
    }

    saveResource(data: Resource): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.RESOURCES(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.RESOURCES(data.game), formData, options);
        }
    }

    deleteResource(data: Resource): Observable<any> {
        return this.http.delete(API_URLS.RESOURCES(data.game, data.id));
    }

    getQuests(gameId: number): Observable<any> {
        return this.http.get(API_URLS.QUESTS(gameId));
    }

    saveQuest(data: Quest): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.QUESTS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.QUESTS(data.game), formData, options);
        }
    }

    deleteQuest(data: Quest): Observable<any> {
        return this.http.delete(API_URLS.QUESTS(data.game, data.id));
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

    getTrivias(gameId: number): Observable<any> {
        return this.http.get(API_URLS.TRIVIA(gameId));
    }

    saveTrivia(data: Trivia): Observable<any> {
        //const formData = toMultipartFormData(data, 1);
        const formData = objectToFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.TRIVIA(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.TRIVIA(data.game), formData, options);
        }
    }

    deleteTrivia(data: Trivia): Observable<any> {
        return this.http.delete(API_URLS.TRIVIA(data.game, data.id));
    }

    saveMap(data: GameMap): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.MAPS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.MAPS(data.game), formData, options);
        }
    }

    getMaps(gameId: number): Observable<any> {
        return this.http.get(API_URLS.MAPS(gameId));
    }

    saveMapLocation(data: MapLocation): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.LOCATIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.LOCATIONS(data.game), data);
        }
    }

    getMapLocations(gameId: number): Observable<any> {
        return this.http.get(API_URLS.LOCATIONS(gameId));
    }

    saveBoardField(data: Field): Observable<any> {
        const formData: any = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };
        if (data.id) {
            return this.http.patch(API_URLS.FIELDS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.FIELDS(data.game), formData, options);
        }
    }

    deleteBoardField(data: Field): Observable<any> {
        return this.http.delete(API_URLS.FIELDS(data.game, data.id));
    }

    saveGame(data: Game): Observable<any> {
        return this.http.post(API_URLS.GAMES, data);
    }

    getGames(): Observable<any> {
        return this.http.get(API_URLS.GAMES);
    }

    getGame(id: number): Observable<any> {
        return this.http.get(`${API_URLS.GAMES}${id}`);
    }

    getFields(gameId: number): Observable<any> {
        return this.http.get(API_URLS.FIELDS(gameId));
    }

    getFactions(gameId: number): Observable<any> {
        return this.http.get(API_URLS.FACTIONS(gameId));
    }
}
