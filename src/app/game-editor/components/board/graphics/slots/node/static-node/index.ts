import { values } from 'lodash';

import { RenderFunction, createElement, Memo, composePoints } from "@app/render-kit";
import EmbeddedStage, { Props as EmbeddedStageProps } from "../embedded-stage";
import EmptySlot, { Props as EmptySlotProps } from "../empty-slot";
import { Slot } from '@app/game-mechanics';
import { MainContext } from '../../../context';

export type Props = {
    data: Slot;
    selected?: boolean;
};

const StaticNode: RenderFunction<Props> = ({ data, selected }) => {
    const emptySlot = !data.board && !data.field && !data.draw;

    return createElement(MainContext.Consumer, {
        render: ctx => {
            const stage = data.board && ctx && ctx.entities.stages ? ctx.entities.stages[data.board] : null;
            const style = ctx.entities.styles[data.style];
            const image = data.image ? ctx.entities.images[data.image].image : '';

            return createElement('container', {},
                createElement('rectangle', {
                    button: true,
                    points: composePoints(style.points),
                    styles: {
                        strokeThickness: selected ? 5 : style.strokeThickness,
                        strokeColor: style.strokeColor,
                        x: 0,
                        y: 0,
                        width: style.width + 10,
                        height: style.height + 35,
                        borderRadius: 5,
                        radius: style.width
                    }
                }),
                stage ? createElement('container', {
                    styles: {}
                },
                    createElement<EmbeddedStageProps>(EmbeddedStage, {
                        stage,
                        slots: values(ctx.entities.slots).filter(slot => slot.owner === stage.id),
                        image: ctx.entities.images[stage.image]
                    }),

                ) : null,
                emptySlot ? createElement<EmptySlotProps>(EmptySlot, { style, image, data }) : null,
            );
        }
    });
};

export default Memo(StaticNode);