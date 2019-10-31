import { Shape } from "@app/game-mechanics";
import { StatefulComponent, createElement } from "@app/render-kit";

type Props = {
    shape: Shape;
}

export default class RootComponent extends StatefulComponent<Props> {
    render() {
        return createElement('rectangle', {
            styles: {
                stroke_thickness: 3,
                stroke_color: 0xeb4034,
                x: 10,
                y: 10,
                width: 150,
                height: 150,
                border_radius: 15,
            }
        });
    }
}