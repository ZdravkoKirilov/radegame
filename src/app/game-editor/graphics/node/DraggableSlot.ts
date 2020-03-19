import { createElement, RenderFunction, RzDraggable, RzDraggableProps, RzPoint, RzElementPrimitiveProps } from "@app/render-kit";
import { RuntimeSlot, Style, connectToStore } from "@app/game-mechanics";

import { AppState } from "@app/core";
import { selectSlotStyle } from "app/game-editor/state";
import NodeFactory, { NodeFactoryProps } from "./Factory";

export type Props = Partial<StoreProps> & {
  data: RuntimeSlot;
  selected: boolean;
  onDragEnd: (id: number, coords: RzPoint) => void;
  onSelect: (item: RuntimeSlot) => void;
};

type StoreProps = {
  style: Style;
}

export const DraggableSlot: RenderFunction<Props> = (props) => {
  const { data, onDragEnd, onSelect, selected, style } = props;
  const _style = style || {} as Style;

  return (
    createElement<RzDraggableProps>(
      RzDraggable,
      {
        onDragEnd: (coords) => {
          onDragEnd(data.id, coords);
        },
        startPosition: { x: data.x, y: data.y },
        render: (coords => {

          return (
            createElement<RzElementPrimitiveProps>(
              'container',
              {
                styles: { x: coords.x, y: coords.y, z_order: _style.z_order },
                id: data.id,
                onPointerDown: () => onSelect(data),
                name: `node_${data.id}`
              },
              createElement<NodeFactoryProps>(
                NodeFactory,
                { data }
              ),
            )
          )
        }),
      },
    )
  )
};

const mapStateToProps = (state: AppState, ownProps: Props): StoreProps => ({
  style: selectSlotStyle(ownProps.data),
});

export default connectToStore(mapStateToProps)(DraggableSlot);