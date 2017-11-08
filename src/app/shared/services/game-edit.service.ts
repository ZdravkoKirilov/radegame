import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';

import {Trivia, BoardField, Character, Resource, Game, MapFieldSettings, MapPath} from '../../game-mechanics/models/index';
import {API_URLS} from '../config/config';

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

    saveBoardField(data: BoardField): Observable<BoardField> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

    deleteBoardField(data: BoardField): Observable<BoardField> {
        return of({
            ...data
        });
    }

    saveMapField(data: MapFieldSettings): Observable<MapFieldSettings> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

    deleteMapField(data: MapFieldSettings): Observable<MapFieldSettings> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

    saveMapPath(data: MapPath): Observable<MapPath> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

    deleteMapPath(data: MapPath): Observable<MapPath> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

    saveGameCharacter(data: Character): Observable<Character> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

    saveGameResource(data: Resource): Observable<Resource> {
        return of({
            id: new Date().getTime(),
            ...data
        });
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
}
