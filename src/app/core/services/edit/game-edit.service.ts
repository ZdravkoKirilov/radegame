import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
    Game, Module, Choice, Widget, Token, Animation, ImageAsset, Style,
    Sound, Expression, Setup, Transition, Text, Sonata, Shape, Slot,
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

    saveWidget(data: Widget): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.WIDGETS(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.WIDGETS(data.game), data);
        }
    }

    deleteWidget(data: Widget): Observable<any> {
        return this.http.delete(API_URLS.WIDGETS(data.game, data.id));
    }

    saveSlot(data: Slot): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.SLOTS(data.game, data.owner, data.id), data);
        } else {
            return this.http.post(API_URLS.SLOTS(data.game, data.owner), data);
        }
    }

    deleteSlot(data: Slot): Observable<any> {
        return this.http.delete(API_URLS.SLOTS(data.game, data.owner, data.id));
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

    saveModule(data: Module): Observable<any> {

        if (data.id) {
            return this.http.patch(API_URLS.MODULES(data.game, data.id), data);
        } else {
            return this.http.post(API_URLS.MODULES(data.game), data);
        }
    }

    deleteModule(data: Module): Observable<any> {
        return this.http.delete(API_URLS.MODULES(data.game, data.id));
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

    deleteGame(data:Game) {
        return this.http.delete(API_URLS.GAMES(data.id))
    }
}
