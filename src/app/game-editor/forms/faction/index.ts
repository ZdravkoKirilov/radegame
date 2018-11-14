import { Faction, FACTION_TYPE } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeFromObject } from '../helpers';

export function composeFactionForm(data: Faction, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const income = [];
    const effect_pool =  [];

    const template = `
    <Form>

        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <Dropdown name='type' label='Type' options='{types}'>{data.type}</Dropdown>

        <ButtonGroup name='income' label='Income' options='{stacks}' multiple='{true}'>{income}</ButtonGroup>

        <ButtonGroup name='effect_pool' label='Effects' options='{pools}' multiple='{true}'>{effect_pool}</ButtonGroup>

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            data, income, effect_pool,
            types: composeFromObject(FACTION_TYPE),
            stacks: [],
            pools: [],
        }
    }, true) as BaseControl[];

    return result;
}