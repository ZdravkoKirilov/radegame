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
      return this.http.patch<Sandbox>(EDITOR_URLS.SANDBOXES(data.module, data.id), data);
    } else {
      return this.http.post<Sandbox>(EDITOR_URLS.SANDBOXES(data.module), data);
    }
  }

  deleteSandbox(data: Sandbox) {
    return this.http.delete(EDITOR_URLS.SANDBOXES(data.module, data.id));
  }

  saveWidget(data: Widget) {

    if (data.id) {
      return this.http.patch<Widget>(EDITOR_URLS.WIDGETS(data.module, data.id), data);
    } else {
      return this.http.post<Widget>(EDITOR_URLS.WIDGETS(data.module), data);
    }
  }

  deleteWidget(data: Widget) {
    return this.http.delete(EDITOR_URLS.WIDGETS(data.module, data.id));
  }

  saveNode(data: WidgetNode) {

    if (data.id) {
      return this.http.patch<WidgetNode>(EDITOR_URLS.NODES(data.owner, data.id), data);
    } else {
      return this.http.post<WidgetNode>(EDITOR_URLS.NODES(data.owner), data);
    }
  }

  deleteNode(data: WidgetNode) {
    return this.http.delete(EDITOR_URLS.NODES(data.owner, data.id));
  }

  saveText(data: Text) {

    if (data.id) {
      return this.http.patch<Text>(EDITOR_URLS.TEXTS(data.module, data.id), data);
    } else {
      return this.http.post<Text>(EDITOR_URLS.TEXTS(data.module), data);
    }
  }

  deleteText(data: Text) {
    return this.http.delete(EDITOR_URLS.TEXTS(data.module, data.id));
  }

  saveSonata(data: Sonata) {

    if (data.id) {
      return this.http.patch<Sonata>(EDITOR_URLS.SONATAS(data.module, data.id), data);
    } else {
      return this.http.post<Sonata>(EDITOR_URLS.SONATAS(data.module), data);
    }
  }

  deleteSonata(data: Sonata) {
    return this.http.delete(EDITOR_URLS.SONATAS(data.module, data.id));
  }

  saveModule(data: Module) {

    if (data.id) {
      return this.http.patch<Module>(EDITOR_URLS.MODULES(data.version, data.id), data);
    } else {
      return this.http.post<Module>(EDITOR_URLS.MODULES(data.version), data);
    }
  }

  deleteModule(data: Module) {
    return this.http.delete(EDITOR_URLS.MODULES(data.version, data.id));
  }

  saveToken(data: Token) {

    if (data.id) {
      return this.http.patch<Token>(EDITOR_URLS.TOKENS(data.module, data.id), data);
    } else {
      return this.http.post<Token>(EDITOR_URLS.TOKENS(data.module), data);
    }
  }

  deleteToken(data: Token) {
    return this.http.delete(EDITOR_URLS.TOKENS(data.module, data.id));
  }

  saveAnimation(data: Animation) {
    if (data.id) {
      return this.http.patch<Animation>(EDITOR_URLS.ANIMATIONS(data.module, data.id), data);
    } else {
      return this.http.post<Animation>(EDITOR_URLS.ANIMATIONS(data.module), data);
    }
  }

  deleteAnimation(data: Animation) {
    return this.http.delete(EDITOR_URLS.ANIMATIONS(data.module, data.id));
  }

  saveImage(data: ImageAsset) {
    const formData = toMultipartFormData(data);
    const options = { headers: new HttpHeaders({}) };

    if (data.id) {
      if (typeof data.image === 'string') {
        return this.http.patch<ImageAsset>(EDITOR_URLS.IMAGES(data.module, data.id), data);
      } else {
        return this.http.patch<ImageAsset>(EDITOR_URLS.IMAGES(data.module, data.id), formData, options);
      }
    } else {
      return this.http.post<ImageAsset>(EDITOR_URLS.IMAGES(data.module), formData, options);
    }
  }

  deleteImage(data: ImageAsset) {
    return this.http.delete(EDITOR_URLS.IMAGES(data.module, data.id));
  }

  saveSound(data: Sound) {
    const formData = toMultipartFormData(data);
    const options = { headers: new HttpHeaders({}) };

    if (data.id) {
      return this.http.patch<Sound>(EDITOR_URLS.SOUNDS(data.module, data.id), formData, options);
    } else {
      return this.http.post<Sound>(EDITOR_URLS.SOUNDS(data.module), formData, options);
    }
  }

  saveStyle(data: Style) {

    if (data.id) {
      return this.http.patch<Style>(EDITOR_URLS.STYLES(data.module, data.id), data);
    } else {
      return this.http.post<Style>(EDITOR_URLS.STYLES(data.module), data);
    }
  }

  deleteStyle(data: Style) {
    return this.http.delete(EDITOR_URLS.STYLES(data.module, data.id));
  }

  saveExpression(data: Expression) {
    if (data.id) {
      return this.http.patch<Expression>(EDITOR_URLS.EXPRESSIONS(data.module, data.id), data);
    } else {
      return this.http.post<Expression>(EDITOR_URLS.EXPRESSIONS(data.module), data);
    }
  }

  deleteExpression(data: Expression) {
    return this.http.delete(EDITOR_URLS.EXPRESSIONS(data.module, data.id));
  }

  saveShape(data: Shape) {
    if (data.id) {
      return this.http.patch<Shape>(EDITOR_URLS.SHAPES(data.module, data.id), data);
    } else {
      return this.http.post<Shape>(EDITOR_URLS.SHAPES(data.module), data);
    }
  }

  deleteShape(data: Shape) {
    return this.http.delete(EDITOR_URLS.SHAPES(data.module, data.id));
  }

  saveSetup(data: Setup) {
    if (data.id) {
      return this.http.patch<Setup>(EDITOR_URLS.SETUPS(data.version, data.id), data);
    } else {
      return this.http.post<Setup>(EDITOR_URLS.SETUPS(data.version), data);
    }
  }

  deleteSetup(data: Setup) {
    return this.http.delete(EDITOR_URLS.SETUPS(data.version, data.id));
  }

  deleteSound(data: Sound) {
    return this.http.delete(EDITOR_URLS.SOUNDS(data.module, data.id));
  }

  saveGame(data: Game) {

    if (data.id) {
      return this.http.patch<Game>(EDITOR_URLS.GAMES(data.id), data);
    } else {
      return this.http.post<Game>(EDITOR_URLS.GAMES(data.id), data);
    }
  }

  deleteGame(data: Game) {
    return this.http.delete(EDITOR_URLS.GAMES(data.id))
  }
}
