import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { WidgetNode, NODE_LIFECYCLES } from "@app/game-mechanics";
import {
    baseTemplate,
    boardTemplate,
    composeCommonFormContext,
    composeInlineStyleFormContext,
    composeFromObject,
    styleTemplate,
} from "../helpers";
import { RzEventTypes } from "@app/render-kit";

export const composeNodeForm: FormDefinition = (data: WidgetNode, ent?: ConnectedEntities) => {
    data = data || {};
    const handlers = data.handlers || [];
    const lifecycles = data.lifecycles || [];

    const template = `
        <Form>
            ${baseTemplate}

            ${boardTemplate}

            <Dropdown name='shape' label='Shape' options='{shape_options}'>
                {data.shape}
            </Dropdown>

            <Dropdown name='module' label='Module' options='{module_options}'>
                {data.module}
            </Dropdown>

            <Dropdown name='token' label='Token' options='{token_options}'>
                {data.token}
            </Dropdown>

            <Dropdown name='display_text_inline' label='Display text' options='{text_options}'>
                {data.display_text_inline}
            </Dropdown>

            <CodeEditor name='display_text' label='Display text getter'>
                {data.display_text}
            </CodeEditor>

            ${styleTemplate}

            <CodeEditor name='provide_context' label='Provide context'>{data.provide_context}</CodeEditor>

            <CodeEditor name='consume_context' label='Consume context'>{data.consume_context}</CodeEditor>

            <CodeEditor name='pass_to_children' label='Pass to children'>{data.pass_to_children}</CodeEditor>

            <Group name='handlers' label='Handlers' children='{handlers}' item='@handler' addButtonText='Add'>
                <Form>
                    <NumberInput name='id' hidden='{true}'>{@handler.id}</NumberInput>

                    <Dropdown name='type' label='Type' options='{handlerTypes}'>{@handler.type}</Dropdown>

                    <CodeEditor name='effect' label='Effect'>
                        {@handler.effect}
                    </CodeEditor>

                    <CodeEditor name='sound' label='Sound'>
                        {@handler.sound}
                    </CodeEditor>

                    <Dropdown name='static_sound' label='Static sound' options='{sonata_options}'>
                        {@handler.static_sound}
                    </Dropdown>
                </Form>
            </Group>

            <Group name='lifecycles' label='Lifecycles' children='{lifecycles}' item='@lifecycle' addButtonText='Add'>
                <Form>
                    <NumberInput name='id' hidden='{true}'>{@lifecycle.id}</NumberInput>

                    <Dropdown name='type' label='Type' options='{lifecycleTypes}'>{@lifecycle.type}</Dropdown>

                    <CodeEditor name='effect' label='Effect'>
                        {@lifecycle.effect}
                    </CodeEditor>

                    <CodeEditor name='sound' label='Sound'>
                        {@lifecycle.sound}
                    </CodeEditor>

                    <Dropdown name='static_sound' label='Static sound' options='{sonata_options}'>
                        {@lifecycle.static_sound}
                    </Dropdown>
                </Form>
            </Group>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(ent),
            ...composeInlineStyleFormContext(ent),
            handlerTypes: composeFromObject(RzEventTypes),
            lifecycleTypes: composeFromObject(NODE_LIFECYCLES),
            data, handlers, lifecycles,
            entities: ent
        },
    }, true);

    return result as BaseControl[];
};
