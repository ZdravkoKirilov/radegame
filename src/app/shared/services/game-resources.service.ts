import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import { Resource } from '../../game-mechanics/models/Resource';

@Injectable()
export class GameResourcesService {

    constructor() {
    }

    saveGameResource(data: Resource): Observable<Resource> {
        return of({
            id: new Date().getTime(),
            ...data
        });
    }

    getGameResources() {

    }
}
