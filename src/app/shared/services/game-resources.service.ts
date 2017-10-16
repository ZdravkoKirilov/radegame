import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class GameResourcesService {

	constructor() { }

	saveGameResource(data): Observable<any> {
		return of({
			id: new Date().getTime(),
			...data
		});
	}
	getGameResources() {

	}
}
