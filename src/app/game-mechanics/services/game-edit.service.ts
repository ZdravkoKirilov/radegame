import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Trivia, BoardField, Character, Resource, Game, MapLocation, MapPath, Map} from '../models/index';
import {API_URLS} from '../configs/config';
import {toMultipartFormData} from '../../shared/utils/ToMultipartFormData';

@Injectable()
export class GameEditService {

    constructor(private http: HttpClient) {
    }

    saveGameTrivia(data: Trivia): Observable<Trivia> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

    saveMapPath(data: MapPath): Observable<MapPath> {
        if (data.id) {
            return this.http.patch(API_URLS.PATHS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.PATHS(data.game), data);
        }
    }

    deleteMapPath(data: MapPath): Observable<MapPath> {
        return this.http.delete(API_URLS.PATHS(data.game, data.id));
    }

    getPaths(gameId: number) {
        return this.http.get(API_URLS.PATHS(gameId));
    }

    saveGameCharacter(data: Character): Observable<Character> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

    getResources(gameId: number): Observable<Resource[]> {
        return this.http.get(API_URLS.RESOURCES(gameId));
    }

    saveResource(data: Resource): Observable<Resource> {
        const formData = toMultipartFormData(data);
        const options = {headers: new HttpHeaders({})};

        if (data.id) {
            return this.http.patch(API_URLS.RESOURCES(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.RESOURCES(data.game), formData, options);
        }
    }

    deleteResource(data: Resource) {
        return this.http.delete(API_URLS.RESOURCES(data.game, data.id));
    }

    saveMap(data: Map): Observable<Map> {
        const formData = toMultipartFormData(data);
        const options = {headers: new HttpHeaders({})};

        if (data.id) {
            return this.http.patch(API_URLS.MAPS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.MAPS(data.game), formData, options);
        }
    }

    getMaps(gameId: number): Observable<Map[]> {
        return this.http.get(API_URLS.MAPS(gameId));
    }

    saveMapLocation(data: MapLocation): Observable<MapLocation> {
        if (data.id) {
            return this.http.patch(API_URLS.LOCATIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.LOCATIONS(data.game), data);
        }
    }

    getMapLocations(gameId: number): Observable<MapLocation[]> {
        return this.http.get(API_URLS.LOCATIONS(gameId));
    }

    saveBoardField(data: BoardField): Observable<BoardField> {
        const formData = toMultipartFormData(data);
        const options = {headers: new HttpHeaders({})};
        if (data.id) {
            return this.http.patch(API_URLS.FIELDS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.FIELDS(data.game), formData, options);
        }
    }

    deleteBoardField(data: BoardField) {
        return this.http.delete(API_URLS.FIELDS(data.game, data.id));
    }

    saveGame(data: Game): Observable<Game> {
        return this.http.post(API_URLS.GAMES, data);
    }

    getGames(): Observable<Game[]> {
        return this.http.get(API_URLS.GAMES);
    }

    getGame(id: number): Observable<Game> {
        return this.http.get(`${API_URLS.GAMES}${id}`);
    }

    getFields(gameId: number): Observable<BoardField[]> {
        return this.http.get(API_URLS.FIELDS(gameId));
    }
}
