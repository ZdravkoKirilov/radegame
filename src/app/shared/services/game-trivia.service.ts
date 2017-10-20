import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import { Trivia } from '../../game-mechanics/models/index';

@Injectable()
export class GameTriviaService {

    constructor() {
    }

    saveGameTrivia(data: Trivia): Observable<Trivia> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

    getGameResources() {

    }
}
