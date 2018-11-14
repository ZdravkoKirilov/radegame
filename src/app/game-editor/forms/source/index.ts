import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Slot } from "@app/game-mechanics";

export const composeSourceForm: FormDefinition = (data: Slot, ent?: ConnectedEntities) => {

    data = data || {};

    const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            
            <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

            <NumberInput name='x' label='Left' defaultValue='{100}'>{data.x}</NumberInput>

            <NumberInput name='y' label='Top' defaultValue='{100}'>{data.y}</NumberInput>

            <NumberInput name='width' label='Width' defaultValue='{100}'>{data.width}</NumberInput>

            <NumberInput name='height' label='Height' defaultValue='{100}'>{data.height}</NumberInput>

            <Dropdown name='field' label='Field' options='{fields}'>{data.field}</Dropdown>

            <ButtonGroup name='tokens' label='Tokens' options='{tokens}' multiple='true'>{data.tokens}</ButtonGroup>

            <ButtonGroup name='restricted' label='Restrict' options='{stacks}' multiple='true'>{data.restricted}</ButtonGroup>

            <ButtonGroup name='allowed' label='Allow' options='{stacks}' multiple='true'>{data.allowed}</ButtonGroup>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data,
            fields: [],
            tokens: [],
            stacks: [],
        },
    }, true);

    return result as BaseControl[];


};