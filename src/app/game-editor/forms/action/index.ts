import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import {
    GameAction, ACTION_TYPE as types,
    ACTION_TARGET, ACTION_MODE, ACTION_TARGET_TYPE, COMPUTED_VALUES
} from '@app/game-mechanics';
import {
    composeFromObject, composeEntityOptions, composeBooleanOptions
} from '../helpers';

export const composeActivityForm: FormDefinition = (data: GameAction, ent: ConnectedEntities) => {
    data = data || {};
    const configs = data.configs || [];
    const cost = data.cost || [];
    const restricted = data.restricted || [];
    const allowed = data.allowed || [];
    const condition = data.condition || [];
    const settings = data.settings || [];
    const setups = data.setups || [];

    const template = `
        <Form>
            <TextInput name='name' required='{true}' label='Action name'>{data.name}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

            <ButtonGroup name='setups' label='Setups' options='{setup_options}' multiple='{true}'>{setups}</ButtonGroup>

            <Dropdown name='mode' label='Action mode' options='{modes}'>{data.mode}</Dropdown>

            <NumberInput name='reveal_slots' label='Reveal slots'>{data.reveal_slots}</NumberInput>

            <NumberInput name='reveal_cost' label='Reveal cost'>{data.reveal_cost}</NumberInput>

            <ButtonGroup name='cost' label='Cost' options='{sources}' multiple='{true}'>{cost}</ButtonGroup>

            <ButtonGroup name='restricted' label='Restrict' options='{conditions}' multiple='{true}'>{restricted}</ButtonGroup>

            <ButtonGroup name='allowed' label='Allow' options='{conditions}' multiple='{true}'>{allowed}</ButtonGroup>

            <ButtonGroup name='condition' label='Condition' options='{conditions}' multiple='{true}'>{condition}</ButtonGroup>

            <ButtonGroup name='settings' label='Settings' options='{sources}' multiple='{true}'>{settings}</ButtonGroup>

            <Group name='configs' label='Action configs' children='{configs}' item='@item' addButtonText='Add'>

                <Form>
                    <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                    <Dropdown name='type' label='Type' options='{types}' required='{true}'>{@item.type}</Dropdown>

                    <ButtonGroup name='target' label='Target' options='{targets}' multiple='{true}' asString='{true}'>
                        {@item.target}
                    </ButtonGroup>

                    <ButtonGroup name='target_type' label='Target' options='{target_types}' multiple='{true}' asString='{true}'>
                        {@item.target_type}
                    </ButtonGroup>

                    <Dropdown name='action' label='Action' options='{actions}' showImage='{true}'>{@item.action}</Dropdown>

                    <Dropdown name='condition' label='Condition' options='{conditions}' showImage='{true}'>
                        {@item.condition}
                    </Dropdown>

                    <Dropdown name='faction' label='Faction' options='{factions}' showImage='{true}'>{@item.faction}</Dropdown>

                    <Dropdown name='token' label='Token' options='{tokens}' showImage='{true}'>{@item.token}</Dropdown>

                    <Dropdown name='choice' label='Choice' options='{choices}' showImage='{true}'>{@item.choice}</Dropdown>

                    <TextInput name='keywords' label='Keyword'>{@item.keywords}</TextInput>


                    <TextInput name='value' label='Value'>{@item.value}</TextInput>

                    <Dropdown name='computed_value' label='Computed value' options='{computedValues}'>
                        {@item.computed_value}
                    </Dropdown>

                    <NumberInput name='amount' label='Amount'>{@item.amount}</NumberInput>

                    <ButtonGroup name='random_amount' label='Randomize amount' options='{random}'>
                        {@item.random_amount}
                    </ButtonGroup>

                    <NumberInput name='max_amount' label='Max amount'>{@item.max_amount}</NumberInput>

                    <NumberInput name='min_amount' label='Min amount'>{@item.min_amount}</NumberInput>
                </Form>

            </Group>


        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, configs, cost, restricted, allowed, condition, settings, setups,
            types: composeFromObject(types),
            modes: composeFromObject(ACTION_MODE),
            targets: composeFromObject(ACTION_TARGET),
            target_types: composeFromObject(ACTION_TARGET_TYPE),
            computed_values: composeFromObject(COMPUTED_VALUES),
            sources: composeEntityOptions(ent, 'sources'),
            conditions: composeEntityOptions(ent, 'conditions'),
            choices: composeEntityOptions(ent, 'choices'),
            factions: composeEntityOptions(ent, 'factions'),
            tokens: composeEntityOptions(ent, 'tokens'),
            actions: composeEntityOptions(ent, 'actions'),
            setup_options: composeEntityOptions(ent, 'setups'),
            random: composeBooleanOptions(),
        },
    }, true);

    return result as BaseControl[];
};

