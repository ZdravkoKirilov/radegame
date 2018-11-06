import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Token } from "@app/game-mechanics";
import { composeStackOptions, composePoolOptions } from "../helpers";

export const composeTokenForm: FormDefinition = (data: Token, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};
    const income = data.income || [];
    const restricted = data.restricted || [];
    const allowed = data.allowed || [];
    const effect_pool = data.effect_pool || [];

    const template = `
    <Form>

        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <ButtonGroup name='income' label='Income' options='{stacks}' multiple='{true}'>{income}</ButtonGroup>

        <ButtonGroup name='restricted' label='Restricted' options='{stacks}' multiple='{true}'>{restricted}</ButtonGroup>

        <ButtonGroup name='allowed' label='Allowed' options='{stacks}' multiple='{true}'>{allowed}</ButtonGroup>

        <ButtonGroup name='effect_pool' label='Effects' options='{pools}' multiple='{true}'>{effect_pool}</ButtonGroup>

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            data, income, effect_pool, restricted, allowed,
            stacks: composeStackOptions(ent),
            pools: composePoolOptions(ent),
        }
    }, true) as BaseControl[];

    return result;
};