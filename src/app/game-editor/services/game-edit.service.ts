import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Trivia, BoardField, Faction, Resource, Game, MapLocation, MapPath, Map, Activity } from '../../game-mechanics/models/index';
import { API_URLS } from '../../shared/config/api-urls';
import { toMultipartFormData } from '../../shared/utils/ToMultipartFormData';

@Injectable()
export class GameEditService {

    constructor(private http: HttpClient) {
    }

    saveGameTrivia(data: Trivia): Observable<any> {
        return of({
            id: new Date().getTime(),
            ...data
        });
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
        const options = {headers: new HttpHeaders({})};

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
        const options = {headers: new HttpHeaders({})};

        if (data.id) {
            return this.http.patch(API_URLS.ACTIVITIES(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.ACTIVITIES(data.game), formData, options);
        }
    }

    deleteActivity(data: Activity): Observable<any> {
        return this.http.delete(API_URLS.ACTIVITIES(data.game, data.id));
    }

    getResources(gameId: number): Observable<any> {
        return this.http.get(API_URLS.RESOURCES(gameId));
    }

    saveResource(data: Resource): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = {headers: new HttpHeaders({})};

        if (data.id) {
            return this.http.patch(API_URLS.RESOURCES(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.RESOURCES(data.game), formData, options);
        }
    }

    deleteResource(data: Resource): Observable<any> {
        return this.http.delete(API_URLS.RESOURCES(data.game, data.id));
    }

    saveMap(data: Map): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = {headers: new HttpHeaders({})};

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

    saveBoardField(data: BoardField): Observable<any> {
        const formData: any = toMultipartFormData(data);
        const options = {headers: new HttpHeaders({})};
        if (data.id) {
            return this.http.patch(API_URLS.FIELDS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.FIELDS(data.game), formData, options);
        }
    }

    deleteBoardField(data: BoardField): Observable<any> {
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
