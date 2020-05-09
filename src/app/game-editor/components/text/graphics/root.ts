import get from 'lodash/get';

import { Style, BasicTextNodeProps, BasicTextNode, RuntimeText } from "@app/game-mechanics";
import { StatefulComponent, createElement } from "@app/render-kit";

type Props = {
  text: RuntimeText;
  style: Style;
  translation: number;
}

export default class RootComponent extends StatefulComponent<Props> {
  render() {
    const style = {
      stroke_thickness: 1,
      ...(this.props.style || {}),
      x: 20,
      y: 20,

    } as Style;

    if (this.props.text) {
      let runtimeText = this.props.text;
      const translation = (runtimeText.translations || []).find(elem => elem.id === this.props.translation);
      runtimeText = { ...runtimeText, computed_value: get(translation, 'value', runtimeText.default_value) };

      return createElement<BasicTextNodeProps>(BasicTextNode, { style, text: runtimeText.computed_value });
    }
    return createElement(null);
  }
}