import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
    Faction,
    Game, Round,
    Choice, Stage,
    Token, Animation, ImageAsset, Style,
    Sound, Expression, Setup, Transition, Text, Sonata, Shape,
} from '@app/game-mechanics';

import { API_URLS } from '../../config';
import { toMultipartFormData } from '@app/shared';

@Injectable()
export class GameEditService {

    constructor(private http: HttpClient) {
    }

    saveTransition(data: Transition): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.TRANSITIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.TRANSITIONS(data.game), data);
        }
    }

    deleteTransition(data: Transition): Observable<any> {
        return this.http.delete(API_URLS.TRANSITIONS(data.game, data.id));
    }

    saveFaction(data: Faction): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.FACTIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.FACTIONS(data.game), data);
        }
    }

    deleteFaction(data: Faction): Observable<any> {
        return this.http.delete(API_URLS.FACTIONS(data.game, data.id));
    }

    saveStage(data: Stage): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.STAGES(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.STAGES(data.game), data);
        }
    }

    deleteStage(data: Stage): Observable<any> {
        return this.http.delete(API_URLS.STAGES(data.game, data.id));
    }

    saveText(data: Text): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.TEXTS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.TEXTS(data.game), data);
        }
    }

    deleteText(data: Text): Observable<any> {
        return this.http.delete(API_URLS.TEXTS(data.game, data.id));
    }

    saveSonata(data: Sonata): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.SONATAS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.SONATAS(data.game), data);
        }
    }

    deleteSonata(data: Text): Observable<any> {
        return this.http.delete(API_URLS.TEXTS(data.game, data.id));
    }

    saveRound(data: Round): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.ROUNDS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.ROUNDS(data.game), data);
        }
    }

    deleteRound(data: Round): Observable<any> {
        return this.http.delete(API_URLS.ROUNDS(data.game, data.id));
    }

    saveToken(data: Token): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.TOKENS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.TOKENS(data.game), data);
        }
    }

    deleteToken(data: Token): Observable<any> {
        return this.http.delete(API_URLS.TOKENS(data.game, data.id));
    }

    saveChoice(data: Choice): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.CHOICES(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.CHOICES(data.game), data);
        }
    }

    deleteChoice(data: Choice): Observable<any> {
        return this.http.delete(API_URLS.CHOICES(data.game, data.id));
    }

    saveAnimation(data: Animation): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.ANIMATIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.ANIMATIONS(data.game), data);
        }
    }

    deleteAnimation(data: Animation): Observable<any> {
        return this.http.delete(API_URLS.ANIMATIONS(data.game, data.id));
    }

    saveImage(data: ImageAsset): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.IMAGES(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.IMAGES(data.game), formData, options);
        }
    }

    deleteImage(data: ImageAsset): Observable<any> {
        return this.http.delete(API_URLS.IMAGES(data.game, data.id));
    }

    saveSound(data: Sound): Observable<any> {
        const formData = toMultipartFormData(data);
        const options = { headers: new HttpHeaders({}) };

        if (data.id) {
            return this.http.patch(API_URLS.SOUNDS(data.game, data.id), formData, options);
        } else {
            return this.http.post(API_URLS.SOUNDS(data.game), formData, options);
        }
    }

    saveStyle(data: Style): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.STYLES(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.STYLES(data.game), data);
        }
    }

    deleteStyle(data: Style): Observable<any> {
        return this.http.delete(API_URLS.STYLES(data.game, data.id));
    }

    saveExpression(data: Expression): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.EXPRESSIONS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.EXPRESSIONS(data.game), data);
        }
    }

    deleteExpression(data: Expression): Observable<any> {
        return this.http.delete(API_URLS.EXPRESSIONS(data.game, data.id));
    }

    saveShape(data: Shape): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.SHAPES(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.SHAPES(data.game), data);
        }
    }

    deleteShape(data: Shape): Observable<any> {
        return this.http.delete(API_URLS.SHAPES(data.game, data.id));
    }

    saveSetup(data: Setup): Observable<any> {
        if (data.id) {
            return this.http.patch(API_URLS.SETUPS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.SETUPS(data.game), data);
        }
    }

    deleteSetup(data: Setup): Observable<any> {
        return this.http.delete(API_URLS.SETUPS(data.game, data.id));
    }

    deleteSound(data: Sound): Observable<any> {
        return this.http.delete(API_URLS.SOUNDS(data.game, data.id));
    }

    saveGame(data: Game): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.GAMES(data.id), data);
        } else {
            return this.http.post(API_URLS.GAMES(data.id), data);
        }
    }
}
