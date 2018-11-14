import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { Team } from "@app/game-mechanics";

export const composeTeamForm: FormDefinition = (data: Team, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};
    const income =  [];
    const effect_pool = [];

    const template = `
    <Form>

        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <NumberInput name='min_players' label='Min players'>{data.min_players}</NumberInput>

        <NumberInput name='max_players' label='Max players'>{data.max_players}</NumberInput>

        <ButtonGroup name='income' label='Income' options='{stacks}' multiple='{true}'>{income}</ButtonGroup>

        <ButtonGroup name='effect_pool' label='Effects' options='{pools}' multiple='{true}'>{effect_pool}</ButtonGroup>

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            data, income, effect_pool,
            stacks: [],
            pools: [],
        }
    }, true) as BaseControl[];

    return result;
};