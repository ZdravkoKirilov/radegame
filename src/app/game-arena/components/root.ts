import { StatefulComponent, createElement, PrimitiveContainer, ContextProvider } from "@app/rendering";
import { NodesContainer } from "./NodesContainer";
import { LinesContainer } from "./LinesContainer";

type Props = {

};

type State = {

};

export class Root extends StatefulComponent<Props, State> {
    state = {
        nodes: [
            {
                id: 1,
                styles: {
                    x: 350,
                    y: 80,
                },
                text: {
                    styles: {
                        x: '30%',
                        y: 0,
                    },
                    value: 'Winnie',
                    textStyle: {
                        fontSize: 18,
                    }
                },
                sprite: {
                    styles: {
                        x: 0,
                        y: 20,
                        // width: '20%',
                        // height: '20%'
                        width: 150,
                        height: 150
                    },
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg'
                },
            }, {
                id: 2,
                styles: {
                    x: 50,
                    y: 250,
                },
                text: {
                    styles: {
                        x: '10%',
                        y: 0,
                    },
                    value: 'The Pooh',
                    textStyle: {
                        fontSize: 18,
                        wordWrap: true,
                        align: 'center',
                        wordWrapWidth: '100%',
                        breakWords: true,
                    }
                },
                sprite: {
                    styles: {
                        x: '10%',
                        y: '10%',
                        // width: '30%',
                        // height: '30%'
                        width: '80%',
                        height: '80%'
                    },
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg'
                },
            }, {
                id: 3,
                styles: {
                    x: 50,
                    y: 450,
                },
                text: {
                    styles: {
                        x: 45,
                        y: 10,
                    },
                    value: 'Baloo',
                    textStyle: {
                        fontSize: 18
                    }
                },
                sprite: {
                    styles: {
                        x: 25,
                        y: 30,
                        // width: '20%',
                        // height: '20%'
                        width: 250,
                        height: 250
                    },
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg'
                },
            }
        ],
        line: {
            styles: {
                strokeThickness: 2,
                strokeColor: 0xFF0000,
                alpha: 1,
            },
            points: [
                [130, 130],
                [400, 130],
                [500, 150],
                [400, 170],
                [130, 170],
                [130, 130],
            ]
        },
        lines: [
            {
                id: 1,
                styles: {
                    strokeThickness: 5,
                    strokeColor: 0xFF0000,
                },
                from: 1,
                to: 3,
            },
            {
                id: 2,
                styles: {
                    strokeThickness: 2,
                    strokeColor: 0xFF0000,
                },
                from: 2,
                to: 3,
            }
        ]
    };

    render() {
        const { viaContext } = this;
        const ctxProps = { value: { viaContext }, key: 'callbacks' };

        return createElement(ContextProvider, ctxProps,
            createElement('fragment', {},
                createElement(LinesContainer, { lines: this.state.lines, nodes: this.state.nodes }),
                createElement(NodesContainer, {
                    nodes: this.state.nodes,
                    // render: (strokeThickness) => createElement(Path, {
                    //     styles: { ...this.state.line.styles, strokeThickness },
                    //     points: this.state.line.points
                    // }),
                    styles: {
                        x: 0,
                        y: 0
                    },
                    onDragMove: this.handleDragMove,
                }),
            ),
        );

        // return createElement('fragment', {},
        //     createElement(LinesContainer, { lines: this.state.lines, nodes: this.state.nodes }),
        //     createElement(NodesContainer, {
        //         nodes: this.state.nodes,
        //         // render: (strokeThickness) => createElement(Path, {
        //         //     styles: { ...this.state.line.styles, strokeThickness },
        //         //     points: this.state.line.points
        //         // }),
        //         styles: {
        //             x: 0,
        //             y: 0
        //         },
        //         onDragMove: this.handleDragMove,
        //     }),
        // );
    };

    handleDragMove = (comp: PrimitiveContainer) => {
        const { x, y } = comp.props.styles;
        const { id } = comp.props;
        const index = this.state.nodes.findIndex(elem => elem.id === id);
        const node = this.state.nodes[index];
        const newNodes = [...this.state.nodes];
        newNodes[index] = { ...node, styles: { ...node.styles, x, y } };
        this.setState({ nodes: newNodes });
    }

    viaContext() {

    }
};