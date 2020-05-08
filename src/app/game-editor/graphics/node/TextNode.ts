import { createElement, StatefulComponent } from "@app/render-kit";
import { AppState } from "@app/core";
import { selectExpressionContext } from '../../state';
import {
    BasicTextNodeProps, BasicTextNode, RuntimeWidgetNode, connectToStore, combineStyles, selectNodeTextSync, ExpressionContext,
    selectNodeStyleSync
} from "@app/game-mechanics";

export type EnhancedTextNodeProps = {
    data: RuntimeWidgetNode;
};

type StoreProps = {
    context: ExpressionContext;
};

type Props = EnhancedTextNodeProps & StoreProps;

class EnhancedTextNode extends StatefulComponent<Props> {

    render() {
        const self = this;
        const { data, context } = this.props;

        const text = selectNodeTextSync(data, context, self);
        const nodeStyle = selectNodeStyleSync(data, self);
        const composedStyle = combineStyles(text, nodeStyle);
        return createElement<BasicTextNodeProps>(BasicTextNode, { text: text.computed_value, style: composedStyle });
    }

};

const mapStateToProps = (state: AppState): StoreProps => ({
    context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(EnhancedTextNode);