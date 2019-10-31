import { Shape, Style } from "@app/game-mechanics";
import { StatefulComponent, createElement } from "@app/render-kit";

type Props = {
    shape: Shape;
    style: Style;
}

export default class RootComponent extends StatefulComponent<Props> {
    render() {
        const style = this.props.style || {};

        return createElement('rectangle', {
            styles: {
                stroke_thickness: style.stroke_thickness || 3,
                stroke_color: style.stroke_color || 0xeb4034,
                x: 10,
                y: 10,
                width: Number(style.width) || 150,
                height: Number(style.height) || 150,
                border_radius: style.border_radius || 15,
            }
        });
    }
}