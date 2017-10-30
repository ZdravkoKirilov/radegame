import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {Trivia, BoardField, Character, Resource, Game} from '../../game-mechanics/models/index';

@Injectable()
export class GameEditService {

    constructor() {
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
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

}
