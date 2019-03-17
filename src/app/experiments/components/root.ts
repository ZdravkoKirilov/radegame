import {
    StatefulComponent, createElement,
    Lifecycles, SpriteProps, DynamicSprite, ShadowProps, RecProps, createFadeInAnimation, createBounceAnimation, createScaleAnimation
} from "@app/rendering";

export type Props = {

}

type State = {
    show: boolean;
}

export class RootComponent extends StatefulComponent<Props, State> implements Lifecycles {
    state = { show: false }
    ref: any;

    render() {
        const image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg';

        return createElement<SpriteProps>(
            DynamicSprite, {
                image,
                styles: {
                    // width: 300,
                    // height: 300,
                    x: 1200,
                    y: 100,
                    alpha: 0.8,
                    // anchor: 0.5,
                    // skew: '0.1 0',
                    // rotation: 120 * 0.0174532925
                },
                ref: this.onRef,
            }
        );
    }

    render2() {
        const image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg';
        const { show } = this.state;

        return createElement('container',
            {
                styles: {
                    x: 800,
                    y: 200,
                },
                onPointerOver: this.onShow,
                onPointerOut: this.onHide,
            },
            show ? createElement<ShadowProps>('shadow', {
                color: 0xa1a8b5,
                alpha: 1,
                blur: 1,
                distance: 10
            }) : null,
            createElement<SpriteProps>(
                DynamicSprite, {
                    image,
                    styles: {
                        // width: 300,
                        // height: 300,
                        // x: 0,
                        // y: 0,
                        anchor: 0.5,
                        // skew: '0.1 0',
                        // rotation: 120 * 0.0174532925
                    },
                    ref: this.onRef,
                }
            ),

            // createElement<RecProps>(
            //     'rectangle',
            //     {
            //         styles: { width: 300, height: 300, fill: 0x99ff99 },
            //         onPointerDown: this.onShow,
            //         onPointerUp: this.onHide
            //     },
            //     show ? createElement<ShadowProps>('shadow', {
            //         color: 0xff9999,
            //         alpha: 1,
            //         blur: 2,
            //         distance: 10
            //     }) : null
            // )
        );
    }

    onShow = () => {
        this.setState({ show: true });
    }

    onHide = () => {
        this.setState({ show: false });
    }

    onRef = (elem) => {
        this.ref = elem;
    }

    willReceiveProps(props: Props) {

    }

    didMount() {

        setTimeout(() => {
            const sprite = this.children[0].children[0].children[0];
            const fade = createFadeInAnimation('pesho');
            const bounce = createBounceAnimation('gosho');
            const scale = createScaleAnimation('tosho');

            // fade.play(sprite);
            // bounce.play(sprite);
            // scale.play(sprite);
        }, 1000);
    }
}