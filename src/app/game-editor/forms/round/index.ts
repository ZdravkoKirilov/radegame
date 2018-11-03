import { Round } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeBooleanOptions, composeStackOptions, composePoolOptions, composePhaseOptions } from '../helpers';

export function composeRoundForm(data: Round, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>
        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
        
        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

        <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

        <NumberInput name='replay_count' label='Replay count'>{data.replay_count}</NumberInput>

        <NumberInput name='repeat' label='Repeat'>{data.repeat}</NumberInput>

        <ButtonGroup name='phases' label='Phases' options='{phases}' multiple='{true}'>{data.phases}</ButtonGroup>

        <TextInput name='phase_order' label='Phase order'>{data.phase_order}</TextInput>

        <ButtonGroup name='condition' label='Condition' options='{stacks}' multiple='{true}'>{data.condition}</ButtonGroup>

        <ButtonGroup name='penalty' label='Penalty' options='{stacks}' multiple='{true}'>{data.penalty}</ButtonGroup>

        <ButtonGroup name='award' label='Award' options='{stacks}' multiple='{true}'>{data.award}</ButtonGroup>

        <ButtonGroup name='income' label='Income' options='{stacks}' multiple='{true}'>{data.income}</ButtonGroup>

        <ButtonGroup name='effect_pool' label='Effects' options='{pools}' multiple='{true}'>{data.effect_pool}</ButtonGroup>

    </Form>
`;

    const result = parse({
        source: template,
        context: {
            data, bools: composeBooleanOptions(),
            pools: composePoolOptions(ent),
            stacks: composeStackOptions(ent),
            phases: composePhaseOptions(ent),
        },
    }, true);

    return result as BaseControl[];
}
