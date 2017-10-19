import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import { Character } from '../../game-mechanics/models/Character';

@Injectable()
export class GameCharactersService {

  constructor() { }

    saveGameCharacter(data: Character): Observable<Character> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

}
