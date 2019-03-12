import {
    StatefulComponent, createElement,
    Lifecycles, SpriteProps, DynamicSprite
} from "@app/rendering";

export type Props = {

}

type State = {

}

export class RootComponent extends StatefulComponent<Props, State> implements Lifecycles {
    state = {}
    ref: any;

    render() {
        const image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg';

        return createElement('container', {
            styles: {
                x: 800,
                y: 200,
            }
        }, createElement<SpriteProps>(DynamicSprite, {
            image,
            styles: {
                // width: 300,
                // height: 300,
                // x: 0,
                // y: 0,
                anchor: 0.5,
                skew: '0.1 0',
                // rotation: 120 * 0.0174532925
            },
            ref: this.onRef,
        })
        );
    }

    onRef = (elem) => {
        this.ref = elem;
    }

    willReceiveProps(props: Props) {

    }

    didMount() {
        
    }
}