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
      return createElement<BasicTextNodeProps>(BasicTextNode, { style, text: this.props.text.computed_value });
    }
    return createElement(null);
  }
}