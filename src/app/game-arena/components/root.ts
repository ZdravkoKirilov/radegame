import { StatefulComponent, Component } from "@app/rendering";

type Props = {

};

type State = {

};

export class Root extends StatefulComponent<Props, State> {
    state = {
        nodes: [
            {
                mapped: {
                    x: 50,
                    y: 50,
                },
                text: {
                    mapped: {
                        x: 45,
                        y: 10,
                    },
                    value: 'Winnie',
                    textStyle: {
                        fontSize: 18
                    }
                },
                sprite: {
                    mapped: {
                        x: 25,
                        y: 30,
                        // width: '20%',
                        // height: '20%'
                        width: 150,
                        height: 150
                    },
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg'
                },
            }, {
                mapped: {
                    x: 50,
                    y: 200,
                },
                text: {
                    mapped: {
                        x: 45,
                        y: 10,
                    },
                    value: 'The Pooh',
                    textStyle: {
                        fontSize: 18
                    }
                },
                sprite: {
                    mapped: {
                        x: 25,
                        y: 30,
                        // width: '30%',
                        // height: '30%'
                        width: 150,
                        height: 150
                    },
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg'
                },
            }, {
                mapped: {
                    x: 50,
                    y: 350,
                },
                text: {
                    mapped: {
                        x: 45,
                        y: 10,
                    },
                    value: 'Baloo',
                    textStyle: {
                        fontSize: 18
                    }
                },
                sprite: {
                    mapped: {
                        x: 25,
                        y: 30,
                        // width: '20%',
                        // height: '20%'
                        width: 250,
                        height: 250
                    },
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg'
                },
            }
        ],
        line: {
            mapped: {
                strokeThickness: 1,
                strokeColor: 0xFF0000,
                alpha: 1,
            },
            points: [
                [130, 130],
                [400, 130],
                [500, 150],
                [400, 170],
                [130, 170],
                [130, 130]
            ]
        }
    };

    render2() {
        return `
        <container>
            <NodesContainer nodes='{state.nodes}'/>
            <line mapped='{state.line.mapped}' points='{state.line.points}'/>
        </container>`;
    }

    render() {
        return `
        <container>
            <Path mapped='{state.line.mapped}' points='{state.line.points}'/>
        </container>`;
    }

    didMount() {
        console.log('mount', this);
    }

    didDrag = (obj: Component) => {
        console.log('Dragged', obj);
    }
};