import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Slot } from "@app/game-mechanics";
import {
    baseTemplate,
    boardTemplate, styleTemplate,
    composeCommonFormContext,
    stateTemplate,
    framesTemplate,
    composeInlineStyleFormContext,
} from "../helpers";

export const composeSlotForm: FormDefinition = (data: Slot, ent?: ConnectedEntities) => {
    data = data || {};
    const handlers = data.handlers || [];
    const items = data.items || [];
    const transitions = data.transitions || [];
    const frames = data.frames || [];

    const template = `
        <Form>
            ${baseTemplate}

            <NumberInput name='x' label='Left' defaultValue='{100}'>{data.x}</NumberInput>

            <NumberInput name='y' label='Top' defaultValue='{100}'>{data.y}</NumberInput>

            ${boardTemplate}

            ${styleTemplate}

            ${stateTemplate}

            ${framesTemplate}

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

            <Group name='items' label='Items' children='{items}' item='@item' addButtonText='Add'>
                <Form>
                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>
                    <Dropdown name='entity_type' label='Type' options='{entity_types}' required='{true}'>
                        {@item.entity_type}
                    </Dropdown>

                    <Dropdown name='action' label='Action' options='{action_options}'>
                        {@item.action}
                    </Dropdown>

                    <Dropdown name='condition' label='Condition' options='{condition_options}'>
                        {@item.condition}
                    </Dropdown>

                    <Dropdown name='choice' label='Choice' options='{choice_options}'>
                        {@item.choice}
                    </Dropdown>

                    <Dropdown name='token' label='Token' options='{token_options}'>
                        {@item.token}
                    </Dropdown>

                </Form>
            </Group>

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
            ...composeCommonFormContext(data, ent),
            ...composeInlineStyleFormContext(data, ent),
            data, items, handlers, transitions, frames
        },
    }, true);

    return result as BaseControl[];
};