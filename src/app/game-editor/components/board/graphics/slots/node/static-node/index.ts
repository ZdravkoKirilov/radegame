import { values } from 'lodash';

import { RenderFunction, createElement, Memo, composePoints } from "@app/render-kit";
import EmbeddedStage, { Props as EmbeddedStageProps } from "../embedded-stage";
import EmptySlot, { Props as EmptySlotProps } from "../empty-slot";
import { Slot, Style, Stage } from '@app/game-mechanics';
import { MainContext } from '../../../context';

export type Props = {
    data: Slot;
    selected?: boolean;
};

const StaticNode: RenderFunction<Props> = ({ data, selected }) => {
    const emptySlot = !data.board;

    return createElement(MainContext.Consumer, {
        render: ctx => {
            const stage = data.board && ctx && ctx.entities.stages ? ctx.entities.stages[data.board] : null;
            const style = ctx.entities.styles[data.style];
            const image = data.image ? ctx.entities.images[data.image].image : '';

            return createElement('container', {},
                createElement('rectangle', {
                    button: true,
                    styles: {
                        stroke_thickness: selected ? 5 : style.stroke_thickness,
                        stroke_color: style.stroke_color,
                        x: 0,
                        y: 0,
                        width: Number(style.width) + 10,
                        height: Number(style.height) + 35,
                        borderRadius: 5,
                        radius: style.width
                    }
                }),
                stage ? createElement('container', {},
                    createElement('text', {
                        value: stage.name, styles: {
                            x: 0,
                            y: -25,
                        }, textStyle: {
                            fontSize: 18,
                            stroke: '#141619',
                            fill: '#141619'
                        }
                    }),
                    createElement('container', {
                        styles: {
                            rotation: style.rotation,
                            width: style.width,
                            height: style.height,
                        }
                    },
                        createElement('container', {
                            styles: { ...adjustScaling(style, stage), }
                        },
                            createElement<EmbeddedStageProps>(EmbeddedStage, {
                                stage,
                                slots: values(ctx.entities.slots).filter(slot => slot.owner === stage.id),
                                image: ctx.entities.images[stage.image]
                            }),
                        ),
                    ),
                ) : null,
                emptySlot ? createElement<EmptySlotProps>(EmptySlot, { style, image, data }) : null,
            );
        }
    });
};

const adjustScaling = (slotStyle: Style, stage: Stage) => {
    let scaleX = 1;
    let scaleY = 1;
    if (stage.width > slotStyle.width) {
        scaleX = slotStyle.width / stage.width;
    }
    if (stage.height > slotStyle.height) {
        scaleY = slotStyle.height / stage.height;
    }
    const scale = {
        scale: `${scaleX} ${scaleY}`
    };
    return scale;
};

export default Memo(StaticNode);