import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Slot, SlotItem } from "@app/game-mechanics";
import {
    baseTemplate,
    boardTemplate,
    composeCommonFormContext,
    composeInlineStyleFormContext,
    composeFromObject,
    styleTemplate,
} from "../helpers";
import { RzEventTypes } from "@app/render-kit";

export const composeSlotForm: FormDefinition = (data: Slot, ent?: ConnectedEntities) => {
    data = data || {};
    const handlers = data.handlers || [];
    const transitions = data.transitions || [];

    const template = `
        <Form>
            ${baseTemplate}

            <NumberInput name='x' label='Left' defaultValue='{100}'>{data.x}</NumberInput>

            <NumberInput name='y' label='Top' defaultValue='{100}'>{data.y}</NumberInput>

            ${boardTemplate}

            <Dropdown name='shape' label='Shape' options='{shape_options}'>
                {data.shape}
            </Dropdown>

            <EmbeddedData 
                name='item' 
                label='Item'
                connectedEntities='{entities}' 
                childrenDefinition='{composeSlotItemForm}' 
            >
                {data.item}
            </EmbeddedData>

            <Dropdown name='display_text_inline' label='Display text' options='{text_options}'>
                {data.display_text_inline}
            </Dropdown>

            <CodeEditor name='display_text' label='Display text getter'>
                {data.display_text}
            </CodeEditor>

            ${styleTemplate}

            <Group name='handlers' label='Handlers' children='{handlers}' item='@handler' addButtonText='Add'>
                <Form>
                    <NumberInput name='id' hidden='{true}'>{@handler.id}</NumberInput>

                    <Dropdown name='type' label='Type' options='{types}'>{@handler.type}</Dropdown>

                    <CodeEditor name='effect' label='Effect'>
                        {@handler.effect}
                    </CodeEditor>

                    <CodeEditor name='sound' label='Sound'>
                        {@handler.sound}
                    </CodeEditor>
                </Form>
            </Group>
            
            <ButtonGroup name='transitions' label='Transitions' options='{transition_options}' multiple='{true}'>
                {transitions}
            </ButtonGroup>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            ...composeInlineStyleFormContext(ent),
            types: composeFromObject(RzEventTypes),
            data, handlers, transitions,
            entities: ent, composeSlotItemForm
        },
    }, true);

    return result as BaseControl[];
};

export function composeSlotItemForm(data: SlotItem, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>

        <Dropdown name='action' label='Action' options='{action_options}'>
            {data.action}
        </Dropdown>

        <Dropdown name='condition' label='Condition' options='{condition_options}'>
            {data.condition}
        </Dropdown>

        <Dropdown name='choice' label='Choice' options='{choice_options}'>
            {data.choice}
        </Dropdown>

        <Dropdown name='token' label='Token' options='{token_options}'>
            {data.token}
        </Dropdown>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as any, ent),
            data,
        }
    }, true) as BaseControl[];

    return result;
}