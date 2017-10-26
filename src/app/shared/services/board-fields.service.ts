import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import { BoardField } from '../../game-mechanics/models/BoardField';

@Injectable()
export class BoardFieldsService {

    constructor() { }

    saveBoardField(data: BoardField): Observable<BoardField> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

}
