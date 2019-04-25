import {
    StatefulComponent, createElement,
    Lifecycles, SpriteProps, DynamicSprite, ShadowProps, RecProps, createFadeInAnimation, WithAnimations, createOrchestrator, createAnimationGroup, createBounceAnimation,
    createUpliftAnimation, composeGrid, gridItems, Scrollable, ScrollableProps, LineProps
} from "@app/rendering";

export type Props = {

}

type State = {
    show: string;
    move: boolean;
}

const fadeAnimation = createFadeInAnimation();
const bounceAnimation = createBounceAnimation();
const upliftAnimation = createUpliftAnimation();
@WithAnimations([
    createOrchestrator(
        'parallel',
        [
            createAnimationGroup(
                'sequence',
                'pesho => gosho',
                'state.show',
                [upliftAnimation, bounceAnimation, fadeAnimation]
            ),
        ]
    )
])
export class RootComponent extends StatefulComponent<Props, State> implements Lifecycles {
    state = { show: 'pesho', move: false }
    ref: any;

    // render() {
    //     return createElement<LineProps>('line', {
    //         styles: {
    //             strokeColor: 0xf45342,
    //             strokeThickness: 5,
    //         },
    //         points: [
    //             [100, 100],
    //             [150, 150],
    //             [200, 200],
    //             [250, 250],
    //             [300, 300],
    //             [350, 350],
    //             [400, 400],
    //         ],
    //     });
    // }

    // render() {
    //     const image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg';

    //     return createElement(
    //         'container',
    //         {
    //             styles: {
    //                 x: 200,
    //                 y: 200,
    //                 mask: [null, null, 50]
    //                 // mask: [300, 250, 100, 100]
    //             }
    //         },
    //         createElement<SpriteProps>(
    //             DynamicSprite, {
    //                 image,
    //                 styles: {
    //                     // width: 300,
    //                     // height: 300,
    //                     alpha: 1,
    //                 },
    //             }
    //         ));
    // }

    render() {
        const asGrid = composeGrid(gridItems, 960, '20 20');

        const items = asGrid.map((elem, index) => {
            return createElement<RecProps>('rectangle', {
                styles: { ...elem },
                key: index,
            });
        });

        return createElement<ScrollableProps>(
            Scrollable,
            {
                width: 1100,
                height: 650,
                x: 10,
                y: 10,
                vertical: true,
                horizontal: false,
                borderSize: 1,
                borderColor: 0x161616,
                padding: '20 20'
            },
            createElement('collection', {
                styles: {
                    // mask: [350, 350, 250]
                },
                name: 'rectangles'
            }, items)
        );
    }

    // render() {
    //     const image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg';

    //     return createElement<SpriteProps>(
    //         DynamicSprite, {
    //             image,
    //             styles: {
    //                 // width: 300,
    //                 // height: 300,
    //                 x: 1200,
    //                 y: 300,
    //                 alpha: 1,
    //                 // anchor: 0.5,
    //                 // skew: '0.1 0',
    //                 // rotation: 120 * 0.0174532925
    //             },
    //             ref: this.onRef,
    //             animations: [bounceAnimation, upliftAnimation, fadeAnimation]
    //         }
    //     );
    // }

    // render2() {
    //     const image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg';
    //     const { show } = this.state;

    //     return createElement('container',
    //         {
    //             styles: {
    //                 x: 800,
    //                 y: 200,
    //             },
    //             onPointerOver: this.onShow,
    //             onPointerOut: this.onHide,
    //         },
    //         show ? createElement<ShadowProps>('shadow', {
    //             color: 0x919499,
    //             alpha: 1,
    //             blur: 1,
    //             distance: 10
    //         }) : null,
    //         createElement<SpriteProps>(
    //             DynamicSprite, {
    //                 image,
    //                 styles: {
    //                     // width: 300,
    //                     // height: 300,
    //                     // x: 0,
    //                     // y: 0,
    //                     anchor: 0.5,
    //                     // skew: '0.1 0',
    //                     // rotation: 120 * 0.0174532925
    //                 },
    //                 ref: this.onRef,
    //             }
    //         ),

    //         // createElement<RecProps>(
    //         //     'rectangle',
    //         //     {
    //         //         styles: { width: 300, height: 300, fill: 0x99ff99 },
    //         //         onPointerDown: this.onShow,
    //         //         onPointerUp: this.onHide
    //         //     },
    //         //     show ? createElement<ShadowProps>('shadow', {
    //         //         color: 0xff9999,
    //         //         alpha: 1,
    //         //         blur: 2,
    //         //         distance: 10
    //         //     }) : null
    //         // )
    //     );
    // }

    // onShow = () => {
    //     this.setState({ show: true });
    // }

    // onHide = () => {
    //     this.setState({ show: false });
    // }

    onRef = (elem) => {
        this.ref = elem;
    }

    willReceiveProps(props: Props) {

    }

    didMount() {

        setTimeout(() => {
            // const sprite = this.children[0].children[0].children[0];
            // const fade = createFadeInAnimation('pesho');

            this.setState({ show: 'gosho' });

            // fade.play(sprite);
            // bounce.play(sprite);
            // scale.play(sprite);
        }, 1000);

        setTimeout(() => {
            this.setState({ move: true });
        }, 3000);
    }
}