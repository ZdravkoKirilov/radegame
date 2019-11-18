import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Slot, SlotItem } from "@app/game-mechanics";
import {
    baseTemplate,
    boardTemplate, styleTemplate,
    composeCommonFormContext,
    stateTemplate,
    framesTemplate,
    composeInlineStyleFormContext,
} from "../helpers";

export const composeSlotForm: FormDefinition = (item: Slot, ent?: ConnectedEntities) => {
    item = item || {};
    const handlers = item.handlers || [];
    const transitions = item.transitions || [];
    const frames = item.frames || [];

    const template = `
        <Form>
            ${baseTemplate}

            <NumberInput name='x' label='Left' defaultValue='{100}'>{item.x}</NumberInput>

            <NumberInput name='y' label='Top' defaultValue='{100}'>{item.y}</NumberInput>

            ${boardTemplate}

            <Dropdown name='shape' label='Shape' options='{shape_options}'>
                {item.shape}
            </Dropdown>

            ${framesTemplate}

            ${styleTemplate}

            ${stateTemplate}

            <Dropdown name='display_text' label='Displayed text' options='{expression_options}'>
                {item.display_text}
            </Dropdown>

            <CodeEditor name='display_text_inline' label='Display text: inline'>
                {item.display_text_inline}
            </CodeEditor>

            <Dropdown name='enabled' label='Enabled if:' options='{expression_options}'>
                {item.enabled}
            </Dropdown>

            <CodeEditor name='enabled_inline' label='Enabled: inline'>{item.enabled_inline}</CodeEditor>

            <Embeddeditem 
                name='item' 
                label='Item'
                connectedEntities='{entities}' 
                childrenDefinition='{composeSlotItemForm}' 
            >
                {item.item}
            </Embeddeditem>

            <Group name='handlers' label='Handlers' children='{handlers}' item='@handlerSlot' addButtonText='Add'>
                <Form>
                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>
                    <Dropdown name='handler' label='Handler' options='{handler_options}' required='{true}'>
                        {@handlerSlot.handler}
                    </Dropdown>
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
            ...composeCommonFormContext(item, ent),
            ...composeInlineStyleFormContext(ent),
            item, handlers, transitions, frames,
            entities: ent, composeSlotItemForm
        },
    }, true);

    return result as BaseControl[];
};

export function composeSlotItemForm(item: SlotItem, ent: ConnectedEntities): BaseControl[] {
    item = item || {};

    const template = `
    <Form>

        <Dropdown name='action' label='Action' options='{action_options}'>
            {item.action}
        </Dropdown>

        <Dropdown name='condition' label='Condition' options='{condition_options}'>
            {item.condition}
        </Dropdown>

        <Dropdown name='choice' label='Choice' options='{choice_options}'>
            {item.choice}
        </Dropdown>

        <Dropdown name='token' label='Token' options='{token_options}'>
            {item.token}
        </Dropdown>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(item as any, ent),
            item,
        }
    }, true) as BaseControl[];

    return result;
}