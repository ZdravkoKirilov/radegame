import { StatefulComponent, createElement } from "@app/render-kit";

export class GameArenaRoot extends StatefulComponent {
    render() {
        return createElement('text', {
            value: 'This is the visual root', styles: {
                x: 100,
                y: 125,
            }, textStyle: {
                fontSize: 18,
                stroke: '#141619',
                fill: '#141619'
            }
        });
    }
}