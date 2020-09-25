import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  Game, Module, Widget, Token, Animation, ImageAsset, Style,
  Sound, Expression, Setup, Text, Sonata, Shape, WidgetNode, Version, Sandbox,
} from '@app/game-mechanics';
import { toMultipartFormData } from '@app/shared';

import { EDITOR_URLS } from '../../config';

@Injectable()
export class GameEditService {

  constructor(private http: HttpClient) {
  }

  saveVersion(data: Version) {
    if (data.id) {
      return this.http.patch<Version>(EDITOR_URLS.VERSIONS(data.game, data.id), data);
    } else {
      return this.http.post<Version>(EDITOR_URLS.VERSIONS(data.game), data);
    }
  }

  deleteVersion(data: Version) {
    return this.http.delete(EDITOR_URLS.VERSIONS(data.game, data.id));
  }

  saveSandbox(data: Sandbox) {
    if (data.id) {
      return this.http.patch<Sandbox>(EDITOR_URLS.SANDBOXES(data.game, data.id), data);
    } else {
      return this.http.post<Sandbox>(EDITOR_URLS.SANDBOXES(data.game), data);
    }
  }

  deleteSandbox(data: Sandbox) {
    return this.http.delete(EDITOR_URLS.SANDBOXES(data.game, data.id));
  }

  saveWidget(data: Widget) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.WIDGETS(data.game, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.WIDGETS(data.game), data);
    }
  }

  deleteWidget(data: Widget) {
    return this.http.delete(EDITOR_URLS.WIDGETS(data.game, data.id));
  }

  saveNode(data: WidgetNode) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.NODES(data.game, data.owner, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.NODES(data.game, data.owner), data);
    }
  }

  deleteNode(data: WidgetNode) {
    return this.http.delete(EDITOR_URLS.NODES(data.game, data.owner, data.id));
  }

  saveText(data: Text) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.TEXTS(data.game, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.TEXTS(data.game), data);
    }
  }

  deleteText(data: Text) {
    return this.http.delete(EDITOR_URLS.TEXTS(data.game, data.id));
  }

  saveSonata(data: Sonata) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.SONATAS(data.game, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.SONATAS(data.game), data);
    }
  }

  deleteSonata(data: Sonata) {
    return this.http.delete(EDITOR_URLS.SONATAS(data.game, data.id));
  }

  saveModule(data: Module) {

    if (data.id) {
      return this.http.patch<Module>(EDITOR_URLS.MODULES(data.game, data.id), data);
    } else {
      return this.http.post<Module>(EDITOR_URLS.MODULES(data.game), data);
    }
  }

  deleteModule(data: Module) {
    return this.http.delete(EDITOR_URLS.MODULES(data.game, data.id));
  }

  saveToken(data: Token) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.TOKENS(data.game, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.TOKENS(data.game), data);
    }
  }

  deleteToken(data: Token) {
    return this.http.delete(EDITOR_URLS.TOKENS(data.game, data.id));
  }

  saveAnimation(data: Animation) {
    if (data.id) {
      return this.http.patch(EDITOR_URLS.ANIMATIONS(data.game, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.ANIMATIONS(data.game), data);
    }
  }

  deleteAnimation(data: Animation) {
    return this.http.delete(EDITOR_URLS.ANIMATIONS(data.game, data.id));
  }

  saveImage(data: ImageAsset) {
    const formData = toMultipartFormData(data);
    const options = { headers: new HttpHeaders({}) };

    if (data.id) {
      if (typeof data.image === 'string') {
        return this.http.patch(EDITOR_URLS.IMAGES(data.game, data.id), data);
      } else {
        return this.http.patch(EDITOR_URLS.IMAGES(data.game, data.id), formData, options);
      }
    } else {
      return this.http.post(EDITOR_URLS.IMAGES(data.game), formData, options);
    }
  }

  deleteImage(data: ImageAsset) {
    return this.http.delete(EDITOR_URLS.IMAGES(data.game, data.id));
  }

  saveSound(data: Sound) {
    const formData = toMultipartFormData(data);
    const options = { headers: new HttpHeaders({}) };

    if (data.id) {
      return this.http.patch(EDITOR_URLS.SOUNDS(data.game, data.id), formData, options);
    } else {
      return this.http.post(EDITOR_URLS.SOUNDS(data.game), formData, options);
    }
  }

  saveStyle(data: Style) {

    if (data.id) {
      return this.http.patch(EDITOR_URLS.STYLES(data.game, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.STYLES(data.game), data);
    }
  }

  deleteStyle(data: Style) {
    return this.http.delete(EDITOR_URLS.STYLES(data.game, data.id));
  }

  saveExpression(data: Expression) {
    if (data.id) {
      return this.http.patch(EDITOR_URLS.EXPRESSIONS(data.game, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.EXPRESSIONS(data.game), data);
    }
  }

  deleteExpression(data: Expression) {
    return this.http.delete(EDITOR_URLS.EXPRESSIONS(data.game, data.id));
  }

  saveShape(data: Shape) {
    if (data.id) {
      return this.http.patch(EDITOR_URLS.SHAPES(data.game, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.SHAPES(data.game), data);
    }
  }

  deleteShape(data: Shape) {
    return this.http.delete(EDITOR_URLS.SHAPES(data.game, data.id));
  }

  saveSetup(data: Setup) {
    if (data.id) {
      return this.http.patch(EDITOR_URLS.SETUPS(data.game, data.id), data);
    } else {
      return this.http.post(EDITOR_URLS.SETUPS(data.game), data);
    }
  }

  deleteSetup(data: Setup) {
    return this.http.delete(EDITOR_URLS.SETUPS(data.game, data.id));
  }

  deleteSound(data: Sound) {
    return this.http.delete(EDITOR_URLS.SOUNDS(data.game, data.id));
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
