import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  Game, Module, Widget, Token, Animation, ImageAsset, Style,
  Sound, Expression, Setup, Text, Sonata, Shape, WidgetNode, Version, Sandbox, GameId,
} from '@app/game-mechanics';
import { toMultipartFormData } from '@app/shared';

import { EDITOR_URLS } from '../../config';

@Injectable()
export class GameEditService {

  constructor(private http: HttpClient) {
  }

  saveVersion(data: Version, gameId: GameId) {
    if (data.id) {
      return this.http.patch<Version>(EDITOR_URLS.VERSIONS(gameId, data.id), data);
    } else {
      return this.http.post<Version>(EDITOR_URLS.VERSIONS(gameId), data);
    }
  }

  deleteVersion(data: Version, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.VERSIONS(gameId, data.id));
  }

  saveSandbox(data: Sandbox, gameId: GameId) {
    if (data.id) {
      return this.http.patch<Sandbox>(EDITOR_URLS.SANDBOXES(gameId, data.id), data);
    } else {
      return this.http.post<Sandbox>(EDITOR_URLS.SANDBOXES(gameId), data);
    }
  }

  deleteSandbox(data: Sandbox, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.SANDBOXES(gameId, data.id));
  }

  saveWidget(data: Widget, gameId: GameId) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.WIDGETS(gameId, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.WIDGETS(gameId), data);
    }
  }

  deleteWidget(data: Widget, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.WIDGETS(gameId, data.id));
  }

  saveNode(data: WidgetNode, gameId: GameId) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.NODES(gameId, data.owner, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.NODES(gameId, data.owner), data);
    }
  }

  deleteNode(data: WidgetNode, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.NODES(gameId, data.owner, data.id));
  }

  saveText(data: Text, gameId: GameId) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.TEXTS(gameId, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.TEXTS(gameId), data);
    }
  }

  deleteText(data: Text, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.TEXTS(gameId, data.id));
  }

  saveSonata(data: Sonata, gameId: GameId) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.SONATAS(gameId, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.SONATAS(gameId), data);
    }
  }

  deleteSonata(data: Sonata, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.SONATAS(gameId, data.id));
  }

  saveModule(data: Module, gameId: GameId) {

    if (data.id) {
      return this.http.patch<Module>(EDITOR_URLS.MODULES(gameId, data.id), data);
    } else {
      return this.http.post<Module>(EDITOR_URLS.MODULES(gameId), data);
    }
  }

  deleteModule(data: Module, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.MODULES(gameId, data.id));
  }

  saveToken(data: Token, gameId: GameId) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.TOKENS(gameId, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.TOKENS(gameId), data);
    }
  }

  deleteToken(data: Token, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.TOKENS(gameId, data.id));
  }

  saveAnimation(data: Animation, gameId: GameId) {
    if (data.id) {
      return this.http.patch(EDITOR_URLS.ANIMATIONS(gameId, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.ANIMATIONS(gameId), data);
    }
  }

  deleteAnimation(data: Animation, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.ANIMATIONS(gameId, data.id));
  }

  saveImage(data: ImageAsset, gameId: GameId) {
    const formData = toMultipartFormData(data);
    const options = { headers: new HttpHeaders({}) };

    if (data.id) {
      if (typeof data.image === 'string') {
        return this.http.patch(EDITOR_URLS.IMAGES(gameId, data.id), data);
      } else {
        return this.http.patch(EDITOR_URLS.IMAGES(gameId, data.id), formData, options);
      }
    } else {
      return this.http.post(EDITOR_URLS.IMAGES(gameId), formData, options);
    }
  }

  deleteImage(data: ImageAsset, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.IMAGES(gameId, data.id));
  }

  saveSound(data: Sound, gameId: GameId) {
    const formData = toMultipartFormData(data);
    const options = { headers: new HttpHeaders({}) };

    if (data.id) {
      return this.http.patch(EDITOR_URLS.SOUNDS(gameId, data.id), formData, options);
    } else {
      return this.http.post(EDITOR_URLS.SOUNDS(gameId), formData, options);
    }
  }

  saveStyle(data: Style, gameId: GameId) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.STYLES(gameId, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.STYLES(gameId), data);
    }
  }

  deleteStyle(data: Style, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.STYLES(gameId, data.id));
  }

  saveExpression(data: Expression, gameId: GameId) {
    if (data.id) {
      return this.http.patch(EDITOR_URLS.EXPRESSIONS(gameId, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.EXPRESSIONS(gameId), data);
    }
  }

  deleteExpression(data: Expression, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.EXPRESSIONS(gameId, data.id));
  }

  saveShape(data: Shape, gameId: GameId) {
    if (data.id) {
      return this.http.patch(EDITOR_URLS.SHAPES(gameId, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.SHAPES(gameId), data);
    }
  }

  deleteShape(data: Shape, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.SHAPES(gameId, data.id));
  }

  saveSetup(data: Setup, gameId: GameId) {
    if (data.id) {
      return this.http.patch(EDITOR_URLS.SETUPS(gameId, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.SETUPS(gameId), data);
    }
  }

  deleteSetup(data: Setup, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.SETUPS(gameId, data.id));
  }

  deleteSound(data: Sound, gameId: GameId) {
    return this.http.delete(EDITOR_URLS.SOUNDS(gameId, data.id));
  }

  saveGame(data: Game) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.GAMES(data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.GAMES(data.id), data);
    }
  }

  deleteGame(data: Game) {
    return this.http.delete(EDITOR_URLS.GAMES(data.id))
  }
}
