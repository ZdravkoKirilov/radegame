import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import {
    Field,
    Faction,
    Resource,
    Game,
    MapLocation,
    MapPath,
    GameMap,
    GameAction,
    Condition,
    Round,
    Choice,
    Stage,
    Stack,
    Pool,
} from '@app/game-mechanics';
import { toMultipartFormData } from '@app/shared';
import { API_URLS } from '../config';

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
        // const formData = toMultipartFormData(data);
        // const options = { headers: new HttpHeaders({}) };

        // if (data.id) {
        //     return this.http.patch(API_URLS.FACTIONS(data.game, data.id), formData, options);
        // } else {
        //     return this.http.post(API_URLS.FACTIONS(data.game), formData, options);
        // }
        if (data.id) {
            return this.http.patch(API_URLS.FACTIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.FACTIONS(data.game), data);
        }
    }

    deleteFaction(data: Faction): Observable<any> {
        return this.http.delete(API_URLS.FACTIONS(data.game, data.id));
    }

    saveAction(data: GameAction): Observable<any> {
        //const formData = toMultipartFormData(data);
        //const options = { headers: new HttpHeaders({}) };

        // if (data.id) {
        //     return this.http.patch(API_URLS.ACTIVITIES(data.game, data.id), formData, options);
        // } else {
        //     return this.http.post(API_URLS.ACTIVITIES(data.game), formData, options);
        // }
        if (data.id) {
            return this.http.patch(API_URLS.ACTIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.ACTIONS(data.game), data);
        }
    }

    deleteAction(data: GameAction): Observable<any> {
        return this.http.delete(API_URLS.ACTIONS(data.game, data.id));
    }

    getActions(gameId: number): Observable<any> {
        return this.http.get(API_URLS.ACTIONS(gameId));
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

    getConditions(gameId: number): Observable<any> {
        return this.http.get(API_URLS.CONDITIONS(gameId));
    }

    saveCondition(data: Condition): Observable<any> {
        // const formData = toMultipartFormData(data);
        // const options = { headers: new HttpHeaders({}) };

        // if (data.id) {
        //     return this.http.patch(API_URLS.QUESTS(data.game, data.id), formData, options);
        // } else {
        //     return this.http.post(API_URLS.QUESTS(data.game), formData, options);
        // }

        if (data.id) {
            return this.http.patch(API_URLS.CONDITIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.CONDITIONS(data.game), data);
        }
    }

    deleteCondition(data: Condition): Observable<any> {
        return this.http.delete(API_URLS.CONDITIONS(data.game, data.id));
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

    getStacks(gameId: number): Observable<any> {
        return this.http.get(API_URLS.STACKS(gameId));
    }

    saveStack(data: Stack): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.STACKS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.STACKS(data.game), formData, options);
        }
    }

    deleteStack(data: Stack): Observable<any> {
        return this.http.delete(API_URLS.STACKS(data.game, data.id));
    }

    getPools(gameId: number): Observable<any> {
        return this.http.get(API_URLS.POOLS(gameId));
    }

    savePool(data: Pool): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.POOLS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.POOLS(data.game), formData, options);
        }
    }

    deletePool(data: Pool): Observable<any> {
        return this.http.delete(API_URLS.POOLS(data.game, data.id));
    }

    getChoices(gameId: number): Observable<any> {
        return this.http.get(API_URLS.CHOICES(gameId));
    }

    saveChoice(data: Choice): Observable<any> {
        // const formData = objectToFormData(data);
        // const options = { headers: new HttpHeaders({}) };

        // if (data.id) {
        //     return this.http.patch(API_URLS.TRIVIA(data.game, data.id), formData, options);
        // } else {
        //     return this.http.post(API_URLS.TRIVIA(data.game), formData, options);
        // }

        if (data.id) {
            return this.http.patch(API_URLS.CHOICES(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.CHOICES(data.game), data);
        }
    }

    deleteChoice(data: Choice): Observable<any> {
        return this.http.delete(API_URLS.CHOICES(data.game, data.id));
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
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.GAMES(data.id), formData, options);
        } else {
            return this.http.post(API_URLS.GAMES(data.id), formData, options);
        }
    }

    getGames(): Observable<any> {
        return this.http.get<Game[]>(API_URLS.GAMES());
    }

    getGame(id: number): Observable<any> {
        return this.http.get(API_URLS.GAMES(id));
    }

    getFields(gameId: number): Observable<any> {
        return this.http.get(API_URLS.FIELDS(gameId));
    }

    getFactions(gameId: number): Observable<any> {
        return this.http.get(API_URLS.FACTIONS(gameId));
    }
}
