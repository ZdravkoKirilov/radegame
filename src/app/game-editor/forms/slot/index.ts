import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Slot, SlotItem } from "@app/game-mechanics";
import {
    baseTemplate,
    boardTemplate, styleTemplate,
    composeCommonFormContext,
    framesTemplate,
    composeInlineStyleFormContext,
    stateTemplate,
} from "../helpers";

export const composeSlotForm: FormDefinition = (data: Slot, ent?: ConnectedEntities) => {
    data = data || {};
    const handlers = data.handlers || [];
    const transitions = data.transitions || [];
    const frames = data.frames || [];

    const template = `
        <Form>
            ${baseTemplate}

            <NumberInput name='x' label='Left' defaultValue='{100}'>{data.x}</NumberInput>

            <NumberInput name='y' label='Top' defaultValue='{100}'>{data.y}</NumberInput>

            ${boardTemplate}

            <Dropdown name='shape' label='Shape' options='{shape_options}'>
                {data.shape}
            </Dropdown>

            ${framesTemplate}

            ${styleTemplate}

            <Dropdown name='display_text' label='Displayed text' options='{expression_options}'>
                {data.display_text}
            </Dropdown>

            <CodeEditor name='display_text_inline' label='Display text: inline'>
                {data.display_text_inline}
            </CodeEditor>

            <Dropdown name='enabled' label='Enabled if:' options='{expression_options}'>
                {data.enabled}
            </Dropdown>

            <CodeEditor name='enabled_inline' label='Enabled: inline'>{data.enabled_inline}</CodeEditor>

            <EmbeddedData 
                name='item' 
                label='Item'
                connectedEntities='{entities}' 
                childrenDefinition='{composeSlotItemForm}' 
            >
                {data.item}
            </EmbeddedData>

            <Group name='handlers' label='Handlers' children='{handlers}' item='@handlerSlot' addButtonText='Add'>
                <Form>
                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                    <Dropdown name='type' label='Type' options='{types}'>{data.type}</Dropdown>
            
                    <Dropdown name='enabled' label='Enabled' options='{expression_options}'>{data.enabled}</Dropdown>
            
                    <Dropdown name='sound' label='Sound' options='{expression_options}'>{data.sound}</Dropdown>

                    <Dropdown name='effect' label='Effect' options='{expression_options}'>
                        {@handlerSlot.effect}
                    </Dropdown>

                    <CodeEditor name='effect_inline' label='Effect: inline'>
                        {@handlerSlot.effect_inline}
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
            data, handlers, transitions, frames,
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